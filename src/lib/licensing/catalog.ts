import type { BillingCadence, LicenseTier, PlanId } from './types';

export type PricingCtaVariant = 'ghost' | 'neon' | 'primary';

export type PlanDefinition = {
	id: PlanId;
	/** Card grouping on the pricing page. */
	pricingCardId: 'free' | 'personal' | 'enterprise';
	showOnPricing: boolean;
	name: string;
	tier: LicenseTier;
	cadence: BillingCadence;
	seats: number | 'unlimited';
	amountCents: number;
	currency: 'usd';
	priceLabel: string;
	priceSecondary: string | null;
	description: string;
	useCase: string;
	image: string;
	ctaLabel: string;
	ctaHref: string;
	ctaVariant: PricingCtaVariant;
	student?: boolean;
};

/** Canonical SKU list — site UI + Appwrite commerce function share this contract. */
export const PLAN_DEFINITIONS: PlanDefinition[] = [
	{
		id: 'free',
		pricingCardId: 'free',
		showOnPricing: true,
		name: 'Free',
		tier: 'free',
		cadence: 'lifetime',
		seats: 1,
		amountCents: 0,
		currency: 'usd',
		priceLabel: '$0',
		priceSecondary: null,
		description: 'Core governance for agents and repos.',
		useCase: 'Exploration and small personal projects.',
		image: '/media/pricing-free.jpg',
		ctaLabel: 'Get Free',
		ctaHref: '/docs/install-commercial/',
		ctaVariant: 'ghost'
	},
	{
		id: 'personal_monthly',
		pricingCardId: 'personal',
		showOnPricing: true,
		name: 'Personal',
		tier: 'personal',
		cadence: 'monthly',
		seats: 1,
		amountCents: 1200,
		currency: 'usd',
		priceLabel: '$12/mo',
		priceSecondary: '$120/year - Students 75% off',
		description: 'Full agent and repo intelligence for individual developers.',
		useCase: 'Solo developers.',
		image: '/media/pricing-personal.jpg',
		ctaLabel: 'Buy Personal',
		ctaHref: '/checkout/?plan=personal_monthly',
		ctaVariant: 'neon'
	},
	{
		id: 'personal_yearly',
		pricingCardId: 'personal',
		showOnPricing: false,
		name: 'Personal (yearly)',
		tier: 'personal',
		cadence: 'yearly',
		seats: 1,
		amountCents: 12000,
		currency: 'usd',
		priceLabel: '$120/year',
		priceSecondary: null,
		description: 'Full agent and repo intelligence for individual developers.',
		useCase: 'Solo developers.',
		image: '/media/pricing-personal.jpg',
		ctaLabel: 'Buy Personal',
		ctaHref: '/checkout/?plan=personal_yearly',
		ctaVariant: 'neon'
	},
	{
		id: 'personal_student_monthly',
		pricingCardId: 'personal',
		showOnPricing: false,
		name: 'Personal (student)',
		tier: 'personal',
		cadence: 'monthly',
		seats: 1,
		amountCents: 300,
		currency: 'usd',
		priceLabel: '$3/mo',
		priceSecondary: 'Student 75% off',
		description: 'Student Personal plan.',
		useCase: 'Verified students.',
		image: '/media/pricing-personal.jpg',
		ctaLabel: 'Buy Student',
		ctaHref: '/checkout/?plan=personal_student_monthly',
		ctaVariant: 'neon',
		student: true
	},
	{
		id: 'personal_student_yearly',
		pricingCardId: 'personal',
		showOnPricing: false,
		name: 'Personal (student yearly)',
		tier: 'personal',
		cadence: 'yearly',
		seats: 1,
		amountCents: 3000,
		currency: 'usd',
		priceLabel: '$30/year',
		priceSecondary: 'Student 75% off',
		description: 'Student Personal plan (yearly).',
		useCase: 'Verified students.',
		image: '/media/pricing-personal.jpg',
		ctaLabel: 'Buy Student',
		ctaHref: '/checkout/?plan=personal_student_yearly',
		ctaVariant: 'neon',
		student: true
	},
	{
		id: 'enterprise_seat_monthly',
		pricingCardId: 'enterprise',
		showOnPricing: true,
		name: 'Enterprise',
		tier: 'enterprise',
		cadence: 'monthly',
		seats: 1,
		amountCents: 4900,
		currency: 'usd',
		priceLabel: '$49/mo per seat',
		priceSecondary: '$499/yr seat - $2,500/yr unlimited',
		description: 'Full governance across agents, repos, and delivery pipelines.',
		useCase: 'Teams and companies.',
		image: '/media/pricing-enterprise.jpg',
		ctaLabel: 'Buy Enterprise',
		ctaHref: '/checkout/?plan=enterprise_seat_monthly',
		ctaVariant: 'primary'
	},
	{
		id: 'enterprise_seat_yearly',
		pricingCardId: 'enterprise',
		showOnPricing: false,
		name: 'Enterprise (yearly seat)',
		tier: 'enterprise',
		cadence: 'yearly',
		seats: 1,
		amountCents: 49900,
		currency: 'usd',
		priceLabel: '$499/yr per seat',
		priceSecondary: null,
		description: 'Full governance across agents, repos, and delivery pipelines.',
		useCase: 'Teams and companies.',
		image: '/media/pricing-enterprise.jpg',
		ctaLabel: 'Buy Enterprise',
		ctaHref: '/checkout/?plan=enterprise_seat_yearly',
		ctaVariant: 'primary'
	},
	{
		id: 'enterprise_unlimited_yearly',
		pricingCardId: 'enterprise',
		showOnPricing: false,
		name: 'Enterprise (unlimited)',
		tier: 'enterprise',
		cadence: 'yearly',
		seats: 'unlimited',
		amountCents: 250000,
		currency: 'usd',
		priceLabel: '$2,500/yr unlimited',
		priceSecondary: null,
		description: 'Unlimited seats for one organization.',
		useCase: 'Larger teams.',
		image: '/media/pricing-enterprise.jpg',
		ctaLabel: 'Buy Unlimited',
		ctaHref: '/checkout/?plan=enterprise_unlimited_yearly',
		ctaVariant: 'primary'
	}
];

/** Pricing page shows one card per pricingCardId (first showOnPricing match). */
export const PLAN_CATALOG = PLAN_DEFINITIONS.filter((p) => p.showOnPricing);

export function getPlan(planId: string): PlanDefinition | undefined {
	return PLAN_DEFINITIONS.find((p) => p.id === planId);
}

export function entitlementsForTier(tier: LicenseTier): Record<string, boolean> {
	const base = {
		agent_core: true,
		repo_core: true,
		token_efficiency_basic: tier !== 'free',
		token_efficiency_full: tier === 'personal' || tier === 'enterprise',
		impact_basic: tier !== 'free',
		impact_full: tier === 'personal' || tier === 'enterprise',
		delivery_governance: tier === 'enterprise',
		security_governance: tier === 'enterprise'
	};
	return base;
}
