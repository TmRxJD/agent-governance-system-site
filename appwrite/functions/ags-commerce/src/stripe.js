import { env } from './env.js';
import { stripePriceEnvName } from './catalog.js';

async function getStripe() {
	const secret = env('STRIPE_SECRET_KEY');
	if (!secret) return null;
	const { default: Stripe } = await import('stripe');
	return new Stripe(secret);
}

function priceIdForPlan(planId) {
	return env(stripePriceEnvName(planId)) || env('STRIPE_PRICE_DEFAULT');
}

export async function stripeCheckout({ planId, plan, email, seats, successUrl, cancelUrl, orderId }) {
	const stripe = await getStripe();
	if (!stripe) {
		return { ok: false, error: 'STRIPE_SECRET_KEY not set', code: 'not_configured' };
	}
	const price = priceIdForPlan(planId);
	if (!price) {
		return {
			ok: false,
			error: `Missing Stripe price id env ${stripePriceEnvName(planId)} (or STRIPE_PRICE_DEFAULT)`,
			code: 'not_configured'
		};
	}

	const mode = plan.cadence === 'lifetime' ? 'payment' : 'subscription';
	const quantity = planId.startsWith('enterprise_seat') ? Math.max(1, seats || 1) : 1;

	const session = await stripe.checkout.sessions.create({
		mode,
		customer_email: email,
		line_items: [{ price, quantity }],
		success_url: `${successUrl}${successUrl.includes('?') ? '&' : '?'}session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: cancelUrl,
		client_reference_id: orderId,
		metadata: {
			orderId,
			planId,
			seats: String(quantity),
			ags: '1'
		},
		subscription_data:
			mode === 'subscription'
				? {
						metadata: { orderId, planId, seats: String(quantity), ags: '1' }
					}
				: undefined,
		allow_promotion_codes: true
	});

	return {
		ok: true,
		provider: 'stripe',
		checkoutUrl: session.url,
		providerSessionId: session.id
	};
}

export async function stripeVerifyWebhook(rawBody, signatureHeader) {
	const stripe = await getStripe();
	const secret = env('STRIPE_WEBHOOK_SECRET');
	if (!stripe || !secret) {
		return { ok: false, error: 'Stripe webhook not configured', code: 'not_configured' };
	}
	const event = stripe.webhooks.constructEvent(rawBody, signatureHeader, secret);
	return { ok: true, event };
}

export async function stripeFulfillmentFromEvent(event) {
	if (event.type !== 'checkout.session.completed' && event.type !== 'invoice.paid') {
		return { handled: false };
	}
	const obj = event.data.object;
	const email = (obj.customer_details?.email || obj.customer_email || obj.metadata?.email || '')
		.toLowerCase();
	const planId = obj.metadata?.planId;
	const seats = Number(obj.metadata?.seats || 1);
	const orderId = obj.metadata?.orderId || obj.client_reference_id;
	const checkoutId = obj.id || obj.checkout_session;
	const subscriptionId = typeof obj.subscription === 'string' ? obj.subscription : obj.subscription?.id;
	if (!email || !planId) {
		return { handled: true, skip: true, reason: 'missing email/planId metadata' };
	}
	return {
		handled: true,
		fulfill: {
			email,
			planId,
			seats,
			orderId,
			providerIds: { checkoutId, subscriptionId }
		}
	};
}

export async function stripeBillingPortal({ customerId, returnUrl }) {
	const stripe = await getStripe();
	if (!stripe) {
		return { ok: false, error: 'STRIPE_SECRET_KEY not set', code: 'not_configured' };
	}
	if (!customerId) {
		return { ok: false, error: 'stripeCustomerId required' };
	}
	const session = await stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: returnUrl
	});
	return { ok: true, url: session.url };
}

export async function findStripeCustomerIdByEmail(email) {
	const stripe = await getStripe();
	if (!stripe) return null;
	const list = await stripe.customers.list({ email, limit: 1 });
	return list.data[0]?.id || null;
}
