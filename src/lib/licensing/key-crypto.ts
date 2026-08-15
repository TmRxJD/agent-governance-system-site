import { createHmac, createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import type { LicenseClaims } from './types';

const PREFIX = 'ags_live_1';

function b64url(buf: Buffer | string): string {
	const b = Buffer.isBuffer(buf) ? buf : Buffer.from(buf, 'utf8');
	return b.toString('base64url');
}

function fromB64url(s: string): Buffer {
	return Buffer.from(s, 'base64url');
}

export function newLicenseId(): string {
	return `lic_${randomBytes(12).toString('hex')}`;
}

export function hashLicenseKey(key: string): string {
	return createHash('sha256').update(key, 'utf8').digest('hex');
}

export function signLicenseKey(claims: LicenseClaims, secret: string): string {
	if (!secret) throw new Error('LICENSE_SIGNING_SECRET is required');
	const payload = b64url(JSON.stringify(claims));
	const sig = createHmac('sha256', secret).update(`${PREFIX}.${payload}`).digest();
	return `${PREFIX}.${payload}.${b64url(sig)}`;
}

export function parseLicenseKey(key: string): { claims: LicenseClaims; sig: Buffer } | null {
	const parts = key.trim().split('.');
	if (parts.length !== 3 || parts[0] !== PREFIX) return null;
	try {
		const claims = JSON.parse(fromB64url(parts[1]).toString('utf8')) as LicenseClaims;
		if (claims.v !== 1 || !claims.tid || !claims.tier) return null;
		return { claims, sig: fromB64url(parts[2]) };
	} catch {
		return null;
	}
}

export function verifyLicenseKey(key: string, secret: string): LicenseClaims | null {
	if (!secret) return null;
	const parsed = parseLicenseKey(key);
	if (!parsed) return null;
	const payload = key.trim().split('.')[1];
	const expected = createHmac('sha256', secret).update(`${PREFIX}.${payload}`).digest();
	if (expected.length !== parsed.sig.length || !timingSafeEqual(expected, parsed.sig)) {
		return null;
	}
	if (parsed.claims.exp != null && Date.now() / 1000 > parsed.claims.exp) {
		return null;
	}
	return parsed.claims;
}

export function issueClaims(input: {
	tid?: string;
	tier: LicenseClaims['tier'];
	seats: number;
	cadence?: LicenseClaims['cadence'];
	planId?: LicenseClaims['planId'];
	ttlSeconds?: number | null;
}): LicenseClaims {
	const iat = Math.floor(Date.now() / 1000);
	const exp =
		input.ttlSeconds == null ? null : iat + Math.max(60, Math.floor(input.ttlSeconds));
	return {
		v: 1,
		tid: input.tid ?? newLicenseId(),
		tier: input.tier,
		seats: input.seats,
		iat,
		exp,
		cadence: input.cadence,
		planId: input.planId
	};
}
