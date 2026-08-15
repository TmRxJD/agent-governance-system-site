import { createHmac, createHash, randomBytes, timingSafeEqual } from 'node:crypto';

const PREFIX = 'ags_live_1';

function b64url(buf) {
	return Buffer.from(buf).toString('base64url');
}

export function newLicenseId() {
	return `lic_${randomBytes(12).toString('hex')}`;
}

export function hashLicenseKey(key) {
	return createHash('sha256').update(key, 'utf8').digest('hex');
}

export function signLicenseKey(claims, secret) {
	if (!secret) throw new Error('LICENSE_SIGNING_SECRET is required');
	const payload = b64url(JSON.stringify(claims));
	const sig = createHmac('sha256', secret).update(`${PREFIX}.${payload}`).digest();
	return `${PREFIX}.${payload}.${b64url(sig)}`;
}

export function verifyLicenseKey(key, secret) {
	if (!secret) return null;
	const parts = String(key || '').trim().split('.');
	if (parts.length !== 3 || parts[0] !== PREFIX) return null;
	let claims;
	try {
		claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
	} catch {
		return null;
	}
	const expected = createHmac('sha256', secret).update(`${PREFIX}.${parts[1]}`).digest();
	const sig = Buffer.from(parts[2], 'base64url');
	if (expected.length !== sig.length || !timingSafeEqual(expected, sig)) return null;
	if (claims.exp != null && Date.now() / 1000 > claims.exp) return null;
	return claims;
}

export function issueClaims({ tid, tier, seats, cadence, planId, ttlSeconds = null }) {
	const iat = Math.floor(Date.now() / 1000);
	return {
		v: 1,
		tid: tid || newLicenseId(),
		tier,
		seats,
		iat,
		exp: ttlSeconds == null ? null : iat + Math.max(60, ttlSeconds),
		cadence,
		planId
	};
}
