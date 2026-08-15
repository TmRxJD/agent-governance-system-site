import { env } from './env.js';

async function paypalAccessToken() {
	const id = env('PAYPAL_CLIENT_ID');
	const secret = env('PAYPAL_CLIENT_SECRET');
	if (!id || !secret) return null;
	const base = env('PAYPAL_API_BASE', 'https://api-m.paypal.com');
	const auth = Buffer.from(`${id}:${secret}`).toString('base64');
	const res = await fetch(`${base}/v1/oauth2/token`, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${auth}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: 'grant_type=client_credentials'
	});
	if (!res.ok) throw new Error(`PayPal token failed: ${res.status}`);
	const data = await res.json();
	return { token: data.access_token, base };
}

function planPlanIdEnv(planId) {
	return env(`PAYPAL_PLAN_${String(planId).toUpperCase()}`) || env('PAYPAL_PLAN_DEFAULT');
}

export async function paypalCheckout({ planId, email, seats, successUrl, cancelUrl, orderId }) {
	const auth = await paypalAccessToken();
	if (!auth) {
		return { ok: false, error: 'PayPal credentials not set', code: 'not_configured' };
	}
	const paypalPlanId = planPlanIdEnv(planId);
	if (!paypalPlanId) {
		return {
			ok: false,
			error: `Missing PayPal plan id env PAYPAL_PLAN_${String(planId).toUpperCase()}`,
			code: 'not_configured'
		};
	}

	const quantity = Math.max(1, seats || 1);
	const res = await fetch(`${auth.base}/v1/billing/subscriptions`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${auth.token}`,
			'Content-Type': 'application/json',
			Prefer: 'return=representation'
		},
		body: JSON.stringify({
			plan_id: paypalPlanId,
			custom_id: orderId,
			quantity: String(quantity),
			subscriber: { email_address: email },
			application_context: {
				brand_name: 'Agent Governance System',
				user_action: 'SUBSCRIBE_NOW',
				return_url: `${successUrl}${successUrl.includes('?') ? '&' : '?'}orderId=${orderId}`,
				cancel_url: cancelUrl
			}
		})
	});
	if (!res.ok) {
		const body = await res.text();
		return { ok: false, error: `PayPal create failed: ${res.status} ${body}`, code: 'provider_error' };
	}
	const data = await res.json();
	const approve = (data.links || []).find((l) => l.rel === 'approve');
	if (!approve?.href) {
		return { ok: false, error: 'PayPal response missing approve link', code: 'provider_error' };
	}
	return {
		ok: true,
		provider: 'paypal',
		checkoutUrl: approve.href,
		providerSessionId: data.id
	};
}

/**
 * PayPal webhook verification (transmission headers).
 * @see https://developer.paypal.com/docs/api/webhooks/v1/#verify-webhook-signature
 */
export async function paypalVerifyWebhook({ headers, body }) {
	const auth = await paypalAccessToken();
	const webhookId = env('PAYPAL_WEBHOOK_ID');
	if (!auth || !webhookId) {
		return { ok: false, error: 'PayPal webhook not configured', code: 'not_configured' };
	}
	const res = await fetch(`${auth.base}/v1/notifications/verify-webhook-signature`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${auth.token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			auth_algo: headers['paypal-auth-algo'],
			cert_url: headers['paypal-cert-url'],
			transmission_id: headers['paypal-transmission-id'],
			transmission_sig: headers['paypal-transmission-sig'],
			transmission_time: headers['paypal-transmission-time'],
			webhook_id: webhookId,
			webhook_event: typeof body === 'string' ? JSON.parse(body) : body
		})
	});
	if (!res.ok) {
		return { ok: false, error: `PayPal verify HTTP ${res.status}` };
	}
	const data = await res.json();
	if (data.verification_status !== 'SUCCESS') {
		return { ok: false, error: `PayPal verify ${data.verification_status}` };
	}
	return { ok: true, event: typeof body === 'string' ? JSON.parse(body) : body };
}

export function paypalFulfillmentFromEvent(event) {
	const type = event.event_type || event.eventType;
	if (type !== 'BILLING.SUBSCRIPTION.ACTIVATED' && type !== 'CHECKOUT.ORDER.APPROVED' && type !== 'PAYMENT.SALE.COMPLETED') {
		return { handled: false };
	}
	const resource = event.resource || {};
	const email = (
		resource.subscriber?.email_address ||
		resource.payer?.email_address ||
		''
	).toLowerCase();
	const custom = resource.custom_id || resource.custom || '';
	// Prefer custom_id = orderId; planId must be looked up from order row in main handler.
	return {
		handled: true,
		fulfill: {
			email,
			orderId: custom,
			subscriptionId: resource.id,
			checkoutId: resource.id
		}
	};
}
