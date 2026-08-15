/** Shared commerce / licensing types for the site + Appwrite commerce function. */

export type LicenseTier = 'free' | 'personal' | 'enterprise';

export type BillingCadence = 'monthly' | 'yearly' | 'lifetime';

export type PaymentProviderId = 'stripe' | 'paypal' | 'manual';

export type LicenseStatus = 'active' | 'past_due' | 'canceled' | 'revoked' | 'expired';

export type OrderStatus =
	| 'created'
	| 'awaiting_payment'
	| 'paid'
	| 'fulfilled'
	| 'failed'
	| 'refunded';

export type PlanId =
	| 'free'
	| 'personal_monthly'
	| 'personal_yearly'
	| 'personal_student_monthly'
	| 'personal_student_yearly'
	| 'enterprise_seat_monthly'
	| 'enterprise_seat_yearly'
	| 'enterprise_unlimited_yearly';

export type LicenseClaims = {
	v: 1;
	/** Stable license id (also Appwrite document id when possible). */
	tid: string;
	tier: LicenseTier;
	seats: number;
	iat: number;
	/** Unix seconds; null = no hard expiry in the token (DB may still revoke). */
	exp: number | null;
	cadence?: BillingCadence;
	planId?: PlanId;
};

export type CustomerRecord = {
	$id?: string;
	email: string;
	displayName?: string;
	stripeCustomerId?: string;
	paypalPayerId?: string;
	createdAt: string;
	updatedAt: string;
};

export type LicenseRecord = {
	$id?: string;
	/** Public key id embedded in the token (`tid`). */
	keyId: string;
	/** SHA-256 hex of the full license key — never store the raw key. */
	keyHash: string;
	customerId: string;
	email: string;
	tier: LicenseTier;
	planId: PlanId;
	status: LicenseStatus;
	seats: number;
	cadence: BillingCadence;
	provider: PaymentProviderId;
	providerSubscriptionId?: string;
	providerCheckoutId?: string;
	periodStart?: string;
	periodEnd?: string;
	issuedAt: string;
	revokedAt?: string;
	lastAuthorizedAt?: string;
	metadata?: Record<string, string>;
};

export type OrderRecord = {
	$id?: string;
	customerId?: string;
	email: string;
	planId: PlanId;
	tier: LicenseTier;
	cadence: BillingCadence;
	seats: number;
	amountCents: number;
	currency: string;
	status: OrderStatus;
	provider: PaymentProviderId;
	providerSessionId?: string;
	licenseKeyId?: string;
	createdAt: string;
	updatedAt: string;
	metadata?: Record<string, string>;
};

export type CheckoutRequest = {
	planId: PlanId;
	email: string;
	seats?: number;
	provider?: PaymentProviderId;
	successUrl: string;
	cancelUrl: string;
	/** Signed student proof from /students (required for student SKUs). */
	studentProof?: string;
};

export type CheckoutResponse =
	| {
			ok: true;
			provider: PaymentProviderId;
			checkoutUrl: string;
			orderId: string;
	  }
	| {
			ok: false;
			error: string;
			code?: 'not_configured' | 'invalid_plan' | 'provider_error' | 'student_required';
	  };

export type AuthorizeRequest = {
	licenseKey: string;
	fingerprint?: string;
};

export type AuthorizeResponse = {
	ok: true;
	tier: LicenseTier;
	seats: number;
	status: LicenseStatus;
	features: Record<string, boolean>;
	exp: number | null;
} | {
	ok: false;
	error: string;
	code?: 'invalid' | 'revoked' | 'expired' | 'not_found';
};

export type IssueLicenseRequest = {
	email: string;
	planId: PlanId;
	seats?: number;
	provider: PaymentProviderId;
	providerSubscriptionId?: string;
	providerCheckoutId?: string;
	orderId?: string;
	periodEnd?: string;
};
