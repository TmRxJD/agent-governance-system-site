import { describe, expect, it } from 'vitest';
import {
	hashLicenseKey,
	issueClaims,
	signLicenseKey,
	verifyLicenseKey
} from '$lib/licensing/key-crypto';
import { entitlementsForTier, getPlan } from '$lib/licensing/catalog';

describe('license key crypto', () => {
	const secret = 'test-signing-secret-do-not-use-in-prod';

	it('signs and verifies a personal key', () => {
		const claims = issueClaims({
			tier: 'personal',
			seats: 1,
			cadence: 'monthly',
			planId: 'personal_monthly'
		});
		const key = signLicenseKey(claims, secret);
		expect(key.startsWith('ags_live_1.')).toBe(true);
		const verified = verifyLicenseKey(key, secret);
		expect(verified?.tid).toBe(claims.tid);
		expect(verified?.tier).toBe('personal');
		expect(hashLicenseKey(key)).toMatch(/^[a-f0-9]{64}$/);
	});

	it('rejects tampered keys', () => {
		const claims = issueClaims({ tier: 'enterprise', seats: 3, planId: 'enterprise_seat_monthly' });
		const key = signLicenseKey(claims, secret);
		const bad = key.slice(0, -4) + 'aaaa';
		expect(verifyLicenseKey(bad, secret)).toBeNull();
	});
});

describe('plan catalog', () => {
	it('exposes pricing cards and entitlements', () => {
		expect(getPlan('personal_monthly')?.amountCents).toBe(1200);
		expect(entitlementsForTier('free').delivery_governance).toBe(false);
		expect(entitlementsForTier('enterprise').delivery_governance).toBe(true);
	});
});
