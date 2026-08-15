/** Keep in sync with site `src/lib/licensing/catalog.ts`. */
export const PLANS = {
	personal_monthly: { tier: 'personal', cadence: 'monthly', seats: 1, amountCents: 1200 },
	personal_yearly: { tier: 'personal', cadence: 'yearly', seats: 1, amountCents: 12000 },
	personal_student_monthly: { tier: 'personal', cadence: 'monthly', seats: 1, amountCents: 300 },
	personal_student_yearly: { tier: 'personal', cadence: 'yearly', seats: 1, amountCents: 3000 },
	enterprise_seat_monthly: { tier: 'enterprise', cadence: 'monthly', seats: 1, amountCents: 4900 },
	enterprise_seat_yearly: { tier: 'enterprise', cadence: 'yearly', seats: 1, amountCents: 49900 },
	enterprise_unlimited_yearly: {
		tier: 'enterprise',
		cadence: 'yearly',
		seats: 9999,
		amountCents: 250000
	}
};

/** Map planId → Stripe Price id env var name. */
export function stripePriceEnvName(planId) {
	return `STRIPE_PRICE_${String(planId).toUpperCase()}`;
}

export function entitlementsForTier(tier) {
	return {
		agent_core: true,
		repo_core: true,
		token_efficiency_basic: tier !== 'free',
		token_efficiency_full: tier === 'personal' || tier === 'enterprise',
		impact_basic: tier !== 'free',
		impact_full: tier === 'personal' || tier === 'enterprise',
		delivery_governance: tier === 'enterprise',
		security_governance: tier === 'enterprise'
	};
}
