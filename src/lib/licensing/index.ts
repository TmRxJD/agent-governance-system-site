export type * from './types';
export type {
	LicenseStatusResponse,
	LicenseLookupResponse,
	PortalResponse
} from './client';
export {
	PLAN_DEFINITIONS,
	PLAN_CATALOG,
	getPlan,
	entitlementsForTier
} from './catalog';
export {
	commerceBaseUrl,
	commerceAppwriteConfig,
	isCommerceConfigured,
	startCheckout,
	authorizeLicense,
	licenseStatus,
	lookupLicenses,
	openBillingPortal,
	redeemSetupToken,
	startStudentGithub,
	completeStudentGithub,
	requestStudentEdu,
	confirmStudentEdu,
	checkStudentProof,
	loadStudentProof,
	saveStudentProof,
	clearStudentProof,
	preferredProvider
} from './client';
export {
	buildAgentActivationPrompt,
	humanActivationSteps,
	activateUrl,
	publicSiteOrigin
} from './activate';
