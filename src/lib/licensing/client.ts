import type {
	AuthorizeRequest,
	AuthorizeResponse,
	CheckoutRequest,
	CheckoutResponse,
	PaymentProviderId
} from './types';

export type LicenseStatusResponse =
	| {
			ok: true;
			keyId: string;
			tier: string;
			seats: number;
			status: string;
			planId: string | null;
			email: string | null;
			features: Record<string, boolean>;
			exp: number | null;
	  }
	| { ok: false; error: string; code?: string };

export type LicenseLookupResponse =
	| {
			ok: true;
			licenses: Array<{
				keyId: string;
				tier: string;
				planId: string;
				status: string;
				seats: number;
				cadence: string;
				provider: string;
				issuedAt?: string;
				periodEnd?: string;
			}>;
	  }
	| { ok: false; error: string };

export type PortalResponse =
	| { ok: true; url: string }
	| { ok: false; error: string; code?: string };

function publicEnv(name: string): string {
	const env = (import.meta as ImportMeta & { env?: Record<string, string> }).env;
	return env?.[name] || '';
}

/** Direct HTTP gateway (custom domain / proxy) — no trailing slash. */
export function commerceBaseUrl(): string {
	return publicEnv('PUBLIC_AGS_COMMERCE_URL').replace(/\/$/, '');
}

/** Appwrite executions transport (guest execute=any on ags-commerce). */
export function commerceAppwriteConfig(): {
	endpoint: string;
	projectId: string;
	functionId: string;
} | null {
	const endpoint = publicEnv('PUBLIC_APPWRITE_ENDPOINT').replace(/\/$/, '');
	const projectId = publicEnv('PUBLIC_APPWRITE_PROJECT_ID');
	const functionId = publicEnv('PUBLIC_AGS_COMMERCE_FUNCTION_ID') || 'ags-commerce';
	if (!endpoint || !projectId) return null;
	return { endpoint, projectId, functionId };
}

export function isCommerceConfigured(): boolean {
	return Boolean(commerceBaseUrl() || commerceAppwriteConfig());
}

async function postViaDirect<T>(path: string, body: unknown): Promise<T> {
	const base = commerceBaseUrl();
	const res = await fetch(`${base}${path}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	return (await res.json()) as T;
}

async function postViaAppwriteExecutions<T>(path: string, body: unknown): Promise<T> {
	const cfg = commerceAppwriteConfig();
	if (!cfg) throw new Error('not_configured');
	const res = await fetch(`${cfg.endpoint}/functions/${cfg.functionId}/executions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Appwrite-Project': cfg.projectId
		},
		body: JSON.stringify({
			method: 'POST',
			path,
			headers: JSON.stringify({ 'content-type': 'application/json' }),
			body: JSON.stringify(body)
		})
	});
	const exec = (await res.json()) as {
		responseBody?: string;
		statusCode?: number;
		errors?: string;
	};
	if (!res.ok) {
		return { ok: false, error: exec.errors || `execution HTTP ${res.status}` } as T;
	}
	try {
		return JSON.parse(exec.responseBody || '{}') as T;
	} catch {
		return { ok: false, error: 'invalid function response' } as T;
	}
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
	if (commerceBaseUrl()) return postViaDirect<T>(path, body);
	if (commerceAppwriteConfig()) return postViaAppwriteExecutions<T>(path, body);
	throw new Error('not_configured');
}

const notConfiguredMsg =
	'Checkout is not connected yet. Set PUBLIC_APPWRITE_ENDPOINT + PUBLIC_APPWRITE_PROJECT_ID (or PUBLIC_AGS_COMMERCE_URL).';

export async function startCheckout(body: CheckoutRequest): Promise<CheckoutResponse> {
	if (!isCommerceConfigured()) {
		return { ok: false, error: notConfiguredMsg, code: 'not_configured' };
	}
	return postJson<CheckoutResponse>('/checkout', body);
}

export async function authorizeLicense(body: AuthorizeRequest): Promise<AuthorizeResponse> {
	if (!isCommerceConfigured()) {
		return { ok: false, error: 'Authorize endpoint not configured', code: 'not_found' };
	}
	return postJson<AuthorizeResponse>('/authorize', body);
}

export async function licenseStatus(licenseKey: string): Promise<LicenseStatusResponse> {
	if (!isCommerceConfigured()) {
		return { ok: false, error: 'Commerce not configured', code: 'not_configured' };
	}
	return postJson<LicenseStatusResponse>('/status', { licenseKey });
}

export async function lookupLicenses(email: string): Promise<LicenseLookupResponse> {
	if (!isCommerceConfigured()) {
		return { ok: false, error: 'Commerce not configured' };
	}
	return postJson<LicenseLookupResponse>('/lookup', { email });
}

export async function openBillingPortal(input: {
	email: string;
	returnUrl: string;
	stripeCustomerId?: string;
}): Promise<PortalResponse> {
	if (!isCommerceConfigured()) {
		return { ok: false, error: 'Commerce not configured', code: 'not_configured' };
	}
	return postJson<PortalResponse>('/portal', input);
}

export type SetupTokenRedeemResponse =
	| {
			ok: true;
			licenseKey: string;
			planId: string;
			email: string;
			keyId: string;
			agentPrompt: string;
			packageName: string;
			envVar: string;
	  }
	| { ok: false; error: string; code?: string };

export async function redeemSetupToken(setupToken: string): Promise<SetupTokenRedeemResponse> {
	if (!isCommerceConfigured()) {
		return { ok: false, error: 'Commerce not configured', code: 'not_configured' };
	}
	return postJson<SetupTokenRedeemResponse>('/setup-token/redeem', { setupToken });
}

export type StudentProofResponse =
	| {
			ok: true;
			studentProof: string;
			email: string;
			method: string;
			expiresInDays: number;
	  }
	| { ok: false; error: string; code?: string };

export async function startStudentGithub(returnUrl?: string) {
	if (!isCommerceConfigured()) {
		return { ok: false as const, error: 'Commerce not configured', code: 'not_configured' };
	}
	return postJson<{
		ok: boolean;
		authUrl?: string;
		state?: string;
		error?: string;
		code?: string;
	}>('/student/github/start', { returnUrl });
}

export async function completeStudentGithub(code: string, state?: string) {
	if (!isCommerceConfigured()) {
		return { ok: false as const, error: 'Commerce not configured', code: 'not_configured' };
	}
	return postJson<StudentProofResponse>('/student/github/complete', { code, state });
}

export async function requestStudentEdu(email: string) {
	if (!isCommerceConfigured()) {
		return { ok: false as const, error: 'Commerce not configured', code: 'not_configured' };
	}
	return postJson<{ ok: boolean; sent?: boolean; email?: string; error?: string; code?: string }>(
		'/student/edu/request',
		{ email }
	);
}

export async function confirmStudentEdu(token: string) {
	if (!isCommerceConfigured()) {
		return { ok: false as const, error: 'Commerce not configured', code: 'not_configured' };
	}
	return postJson<StudentProofResponse>('/student/edu/confirm', { token });
}

export async function checkStudentProof(studentProof: string) {
	if (!isCommerceConfigured()) {
		return { ok: false as const, error: 'Commerce not configured' };
	}
	return postJson<{ ok: boolean; claims?: unknown; error?: string }>('/student/proof/check', {
		studentProof
	});
}

const STUDENT_PROOF_KEY = 'ags_student_proof';

export function loadStudentProof(): string {
	if (typeof localStorage === 'undefined') return '';
	return localStorage.getItem(STUDENT_PROOF_KEY) || '';
}

export function saveStudentProof(proof: string) {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem(STUDENT_PROOF_KEY, proof);
}

export function clearStudentProof() {
	if (typeof localStorage === 'undefined') return;
	localStorage.removeItem(STUDENT_PROOF_KEY);
}

export function preferredProvider(): PaymentProviderId {
	const raw = publicEnv('PUBLIC_AGS_PAYMENT_PROVIDER') || 'stripe';
	if (raw === 'paypal' || raw === 'manual' || raw === 'stripe') return raw;
	return 'stripe';
}
