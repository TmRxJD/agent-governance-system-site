/**
 * Appwrite Function: ags-commerce
 * Routes: /checkout, /webhook/stripe, /webhook/paypal, /authorize, /issue, /status, /portal, /lookup
 */
import { randomBytes } from 'node:crypto';
import { env } from './env.js';
import { PLANS, entitlementsForTier } from './catalog.js';
import { hashLicenseKey, issueClaims, signLicenseKey, verifyLicenseKey } from './keys.js';
import {
	createOrder,
	getLicense,
	listLicensesByEmail,
	updateOrder,
	upsertCustomer,
	upsertLicense
} from './db.js';
import { sendLicenseEmail } from './email.js';
import {
	findStripeCustomerIdByEmail,
	stripeBillingPortal,
	stripeCheckout,
	stripeFulfillmentFromEvent,
	stripeVerifyWebhook
} from './stripe.js';
import { paypalCheckout, paypalFulfillmentFromEvent, paypalVerifyWebhook } from './paypal.js';
import { issueSetupToken, redeemSetupToken } from './setup-tokens.js';
import {
	checkStudentProof,
	completeGithubOAuth,
	confirmEduMagicLink,
	requireStudentProofForPlan,
	requestEduMagicLink,
	siteOrigin,
	startGithubOAuth
} from './student.js';

function json(res, status, body) {
	return res.send(body, status, { 'content-type': 'application/json' });
}

function header(req, name) {
	const h = req.headers || {};
	return h[name] || h[name.toLowerCase()] || h[name.toUpperCase()];
}

async function getDatabases(log) {
	const endpoint = env('APPWRITE_ENDPOINT');
	const project = env('APPWRITE_PROJECT_ID');
	const apiKey = env('APPWRITE_API_KEY');
	if (!endpoint || !project || !apiKey) return null;
	try {
		const { Client, Databases } = await import('node-appwrite');
		const client = new Client().setEndpoint(endpoint).setProject(project).setKey(apiKey);
		return new Databases(client);
	} catch (e) {
		log?.(`node-appwrite not available: ${e}`);
		return null;
	}
}

async function issueFromPaidOrder({
	databases,
	dbId,
	email,
	planId,
	seats,
	provider,
	providerIds,
	orderId,
	log
}) {
	const plan = PLANS[planId];
	if (!plan) throw new Error('invalid plan');
	const secret = env('LICENSE_SIGNING_SECRET');
	if (!secret) throw new Error('LICENSE_SIGNING_SECRET not set');

	const claims = issueClaims({
		tier: plan.tier,
		seats: seats || plan.seats,
		cadence: plan.cadence,
		planId
	});
	const licenseKey = signLicenseKey(claims, secret);
	const now = new Date().toISOString();

	let setupToken = null;
	let activateUrl = null;

	if (databases) {
		await upsertCustomer(databases, dbId, email);
		await upsertLicense(databases, dbId, {
			keyId: claims.tid,
			keyHash: hashLicenseKey(licenseKey),
			customerId: email,
			email,
			tier: plan.tier,
			planId,
			status: 'active',
			seats: claims.seats,
			cadence: plan.cadence,
			provider,
			providerSubscriptionId: providerIds?.subscriptionId || '',
			providerCheckoutId: providerIds?.checkoutId || '',
			issuedAt: now
		});
		if (orderId) {
			try {
				await updateOrder(databases, dbId, orderId, {
					status: 'fulfilled',
					licenseKeyId: claims.tid,
					providerSessionId: providerIds?.checkoutId || ''
				});
			} catch {
				/* order row may be missing in soft setups */
			}
		}
		try {
			const issued = await issueSetupToken(databases, dbId, {
				licenseKey,
				email,
				planId,
				keyId: claims.tid,
				log
			});
			setupToken = issued.setupToken;
			activateUrl = `${siteOrigin()}/activate/?t=${encodeURIComponent(setupToken)}`;
		} catch (e) {
			log?.(`setup token issue failed: ${e}`);
			activateUrl = `${siteOrigin()}/activate/?k=${encodeURIComponent(licenseKey)}`;
		}
	} else {
		activateUrl = `${siteOrigin()}/activate/?k=${encodeURIComponent(licenseKey)}`;
	}

	try {
		await sendLicenseEmail({
			to: email,
			licenseKey,
			planId,
			tier: plan.tier,
			setupToken,
			activateUrl,
			log
		});
	} catch (e) {
		log?.(`email failed (key still issued): ${e}`);
	}

	return { licenseKey, keyId: claims.tid, claims, setupToken, activateUrl };
}

export default async ({ req, res, log, error }) => {
	const method = (req.method || 'GET').toUpperCase();
	const dbId = env('APPWRITE_DATABASE_ID', 'ags_commerce');
	const databases = await getDatabases(log);

	const rawBody = typeof req.bodyRaw === 'string' ? req.bodyRaw : typeof req.body === 'string' ? req.body : '';
	let body = {};
	try {
		body =
			typeof req.body === 'string'
				? JSON.parse(req.body || '{}')
				: req.body && typeof req.body === 'object'
					? req.body
					: rawBody
						? JSON.parse(rawBody)
						: {};
	} catch {
		body = {};
	}

	// Prefer HTTP path; allow execution-API wrappers via body._path / x-ags-path.
	const pathRaw =
		req.path ||
		header(req, 'x-ags-path') ||
		(typeof body._path === 'string' ? body._path : '') ||
		'/';
	const path = String(pathRaw).replace(/\/+$/, '') || '/';

	if (method === 'GET' && (path === '/' || path === '')) {
		return json(res, 200, {
			ok: true,
			service: 'ags-commerce',
			routes: [
				'/checkout',
				'/webhook/stripe',
				'/webhook/paypal',
				'/authorize',
				'/issue',
				'/status',
				'/portal',
				'/lookup',
				'/setup-token/redeem',
				'/student/github/start',
				'/student/github/complete',
				'/student/edu/request',
				'/student/edu/confirm',
				'/student/proof/check'
			]
		});
	}

	if (method === 'POST' && path.endsWith('/checkout')) {
		const planId = body.planId;
		const plan = PLANS[planId];
		if (!plan) return json(res, 400, { ok: false, error: 'invalid plan', code: 'invalid_plan' });
		const email = String(body.email || '').toLowerCase();
		if (!email.includes('@')) return json(res, 400, { ok: false, error: 'email required' });

		if (requireStudentProofForPlan(planId)) {
			const proof = checkStudentProof(body.studentProof);
			if (!proof.ok) {
				return json(res, 403, {
					ok: false,
					error: 'Student verification required. Complete /students/ first.',
					code: 'student_required',
					detail: proof.error
				});
			}
		}

		const provider = body.provider || env('DEFAULT_PAYMENT_PROVIDER', 'stripe');
		const seats = Number(body.seats || plan.seats) || plan.seats;
		let orderId = `ord_${randomBytes(8).toString('hex')}`;

		if (databases) {
			try {
				orderId = await createOrder(databases, dbId, {
					email,
					planId,
					tier: plan.tier,
					cadence: plan.cadence,
					seats,
					amountCents: plan.amountCents * (planId.startsWith('enterprise_seat') ? seats : 1),
					currency: 'usd',
					status: 'awaiting_payment',
					provider,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString()
				});
				await upsertCustomer(databases, dbId, email);
			} catch (e) {
				error(`order create failed: ${e}`);
			}
		}

		const args = {
			planId,
			plan,
			email,
			seats,
			successUrl: body.successUrl,
			cancelUrl: body.cancelUrl,
			orderId
		};
		const result = provider === 'paypal' ? await paypalCheckout(args) : await stripeCheckout(args);
		if (!result.ok) return json(res, 503, result);
		return json(res, 200, {
			ok: true,
			provider: result.provider,
			checkoutUrl: result.checkoutUrl,
			orderId,
			providerSessionId: result.providerSessionId
		});
	}

	if (method === 'POST' && path.endsWith('/webhook/stripe')) {
		const sig = header(req, 'stripe-signature');
		const verified = await stripeVerifyWebhook(rawBody || JSON.stringify(body), sig);
		if (!verified.ok) {
			// Dev escape hatch
			if (env('COMMERCE_ADMIN_TOKEN') && header(req, 'x-ags-admin-token') === env('COMMERCE_ADMIN_TOKEN')) {
				log('stripe webhook admin bypass');
			} else {
				return json(res, 400, verified);
			}
		}
		const event = verified.event || body;
		const parsed = await stripeFulfillmentFromEvent(event);
		if (!parsed.handled || parsed.skip) return json(res, 200, { ok: true, ignored: true, ...parsed });
		if (!databases) return json(res, 503, { ok: false, error: 'Appwrite DB not configured' });
		try {
			const issued = await issueFromPaidOrder({
				databases,
				dbId,
				...parsed.fulfill,
				provider: 'stripe',
				log
			});
			const customerId = await findStripeCustomerIdByEmail(parsed.fulfill.email);
			if (customerId) {
				await upsertCustomer(databases, dbId, parsed.fulfill.email, {
					stripeCustomerId: customerId
				});
			}
			return json(res, 200, { ok: true, keyId: issued.keyId });
		} catch (e) {
			error(String(e));
			return json(res, 500, { ok: false, error: String(e) });
		}
	}

	if (method === 'POST' && path.endsWith('/webhook/paypal')) {
		const verified = await paypalVerifyWebhook({ headers: req.headers || {}, body: body });
		if (!verified.ok) {
			if (env('COMMERCE_ADMIN_TOKEN') && header(req, 'x-ags-admin-token') === env('COMMERCE_ADMIN_TOKEN')) {
				log('paypal webhook admin bypass');
			} else {
				return json(res, 400, verified);
			}
		}
		const event = verified.event || body;
		const parsed = paypalFulfillmentFromEvent(event);
		if (!parsed.handled) return json(res, 200, { ok: true, ignored: true });
		if (!databases) return json(res, 503, { ok: false, error: 'Appwrite DB not configured' });
		// Resolve planId from order row when only orderId is present
		let planId = body.planId;
		let email = parsed.fulfill.email;
		let seats = body.seats || 1;
		const orderId = parsed.fulfill.orderId;
		if (orderId && !planId) {
			try {
				const { ordersCol } = await import('./db.js');
				const ord = await databases.getDocument(dbId, ordersCol(), orderId);
				planId = ord.planId;
				email = email || ord.email;
				seats = ord.seats || 1;
			} catch (e) {
				return json(res, 400, { ok: false, error: `order lookup failed: ${e}` });
			}
		}
		if (!email || !planId) return json(res, 400, { ok: false, error: 'missing email/planId' });
		try {
			const issued = await issueFromPaidOrder({
				databases,
				dbId,
				email,
				planId,
				seats,
				provider: 'paypal',
				providerIds: {
					checkoutId: parsed.fulfill.checkoutId,
					subscriptionId: parsed.fulfill.subscriptionId
				},
				orderId,
				log
			});
			return json(res, 200, { ok: true, keyId: issued.keyId });
		} catch (e) {
			error(String(e));
			return json(res, 500, { ok: false, error: String(e) });
		}
	}

	if (method === 'POST' && path.endsWith('/authorize')) {
		const secret = env('LICENSE_SIGNING_SECRET');
		const claims = verifyLicenseKey(body.licenseKey, secret);
		if (!claims) return json(res, 401, { ok: false, error: 'invalid key', code: 'invalid' });
		let status = 'active';
		if (databases) {
			try {
				const doc = await getLicense(databases, dbId, claims.tid);
				status = doc.status || 'active';
				if (status === 'revoked' || status === 'canceled' || status === 'expired') {
					return json(res, 403, {
						ok: false,
						error: status,
						code: status === 'revoked' ? 'revoked' : 'expired'
					});
				}
				const { licensesCol } = await import('./db.js');
				await databases.updateDocument(dbId, licensesCol(), claims.tid, {
					lastAuthorizedAt: new Date().toISOString()
				});
			} catch {
				if (env('AUTHORIZE_REQUIRE_DB') === '1') {
					return json(res, 404, { ok: false, error: 'license not found', code: 'not_found' });
				}
			}
		}
		return json(res, 200, {
			ok: true,
			tier: claims.tier,
			seats: claims.seats,
			status,
			features: entitlementsForTier(claims.tier),
			exp: claims.exp,
			keyId: claims.tid
		});
	}

	if (method === 'POST' && path.endsWith('/status')) {
		const secret = env('LICENSE_SIGNING_SECRET');
		const claims = verifyLicenseKey(body.licenseKey, secret);
		if (!claims) return json(res, 401, { ok: false, error: 'invalid key', code: 'invalid' });
		let status = 'active';
		let email = null;
		let planId = claims.planId || null;
		if (databases) {
			try {
				const doc = await getLicense(databases, dbId, claims.tid);
				status = doc.status || 'active';
				email = doc.email;
				planId = doc.planId || planId;
			} catch {
				/* soft */
			}
		}
		return json(res, 200, {
			ok: true,
			keyId: claims.tid,
			tier: claims.tier,
			seats: claims.seats,
			status,
			planId,
			email,
			features: entitlementsForTier(claims.tier),
			exp: claims.exp
		});
	}

	if (method === 'POST' && path.endsWith('/lookup')) {
		const email = String(body.email || '').toLowerCase();
		if (!email.includes('@') || !databases) {
			return json(res, 400, { ok: false, error: 'email + DB required' });
		}
		const docs = await listLicensesByEmail(databases, dbId, email);
		return json(res, 200, {
			ok: true,
			licenses: docs.map((d) => ({
				keyId: d.keyId || d.$id,
				tier: d.tier,
				planId: d.planId,
				status: d.status,
				seats: d.seats,
				cadence: d.cadence,
				provider: d.provider,
				issuedAt: d.issuedAt,
				periodEnd: d.periodEnd
			}))
		});
	}

	if (method === 'POST' && path.endsWith('/portal')) {
		const email = String(body.email || '').toLowerCase();
		const returnUrl = body.returnUrl;
		if (!email.includes('@') || !returnUrl) {
			return json(res, 400, { ok: false, error: 'email and returnUrl required' });
		}
		let customerId = body.stripeCustomerId;
		if (!customerId && databases) {
			try {
				const { customersCol } = await import('./db.js');
				const id = email.replace(/[^a-z0-9]/g, '_').slice(0, 36);
				const doc = await databases.getDocument(dbId, customersCol(), id);
				customerId = doc.stripeCustomerId;
			} catch {
				/* */
			}
		}
		if (!customerId) {
			customerId = await findStripeCustomerIdByEmail(email);
		}
		const portal = await stripeBillingPortal({ customerId, returnUrl });
		if (!portal.ok) return json(res, 503, portal);
		return json(res, 200, { ok: true, url: portal.url });
	}

	if (method === 'POST' && path.endsWith('/setup-token/redeem')) {
		const raw = body.setupToken || body.token;
		const redeemed = await redeemSetupToken(databases, dbId, raw);
		if (!redeemed.ok) return json(res, 400, redeemed);
		const agentPrompt = [
			'Activate AGS with this license.',
			'',
			`License: ${redeemed.licenseKey}`,
			'',
			'1) Ensure install of @tmrxjd/agent-governance-system',
			"2) Write 'AGS_LICENSE_KEY' into the host’s secret store / .env",
			'3) Wire MCP / PluginHost per package docs',
			'4) Run a smoke check and confirm “AGS ready”'
		].join('\n');
		return json(res, 200, {
			ok: true,
			licenseKey: redeemed.licenseKey,
			planId: redeemed.planId,
			email: redeemed.email,
			keyId: redeemed.keyId,
			agentPrompt,
			packageName: '@tmrxjd/agent-governance-system',
			envVar: 'AGS_LICENSE_KEY'
		});
	}

	if (method === 'POST' && path.endsWith('/student/github/start')) {
		const started = await startGithubOAuth({ returnUrl: body.returnUrl });
		return json(res, started.ok ? 200 : 503, started);
	}

	if (method === 'POST' && path.endsWith('/student/github/complete')) {
		const done = await completeGithubOAuth({ code: body.code, state: body.state, log });
		return json(res, done.ok ? 200 : 400, done);
	}

	if (method === 'POST' && path.endsWith('/student/edu/request')) {
		const reqd = await requestEduMagicLink(databases, dbId, { email: body.email, log });
		return json(res, reqd.ok ? 200 : 400, reqd);
	}

	if (method === 'POST' && path.endsWith('/student/edu/confirm')) {
		const conf = await confirmEduMagicLink(databases, dbId, body.token || body.eduToken);
		return json(res, conf.ok ? 200 : 400, conf);
	}

	if (method === 'POST' && path.endsWith('/student/proof/check')) {
		const proof = checkStudentProof(body.studentProof);
		return json(res, proof.ok ? 200 : 400, proof);
	}

	if (method === 'POST' && path.endsWith('/revoke')) {
		const admin = env('COMMERCE_ADMIN_TOKEN');
		if (!admin || header(req, 'x-ags-admin-token') !== admin) {
			return json(res, 401, { ok: false, error: 'unauthorized' });
		}
		if (!databases) return json(res, 503, { ok: false, error: 'Appwrite DB not configured' });
		const keyId = body.keyId;
		if (!keyId) return json(res, 400, { ok: false, error: 'keyId required' });
		const { licensesCol } = await import('./db.js');
		await databases.updateDocument(dbId, licensesCol(), keyId, {
			status: 'revoked',
			revokedAt: new Date().toISOString()
		});
		return json(res, 200, { ok: true, keyId, status: 'revoked' });
	}

	if (method === 'POST' && path.endsWith('/issue')) {
		const admin = env('COMMERCE_ADMIN_TOKEN');
		if (!admin || (header(req, 'x-ags-admin-token') || body.adminToken) !== admin) {
			return json(res, 401, { ok: false, error: 'unauthorized' });
		}
		if (!databases) return json(res, 503, { ok: false, error: 'Appwrite DB not configured' });
		const issued = await issueFromPaidOrder({
			databases,
			dbId,
			email: body.email,
			planId: body.planId,
			seats: body.seats,
			provider: body.provider || 'manual',
			providerIds: {},
			orderId: body.orderId,
			log
		});
		return json(res, 200, {
			ok: true,
			keyId: issued.keyId,
			licenseKey: issued.licenseKey,
			claims: issued.claims
		});
	}

	return json(res, 404, { ok: false, error: `no route ${method} ${path}` });
};
