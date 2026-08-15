import { env } from './env.js';

/**
 * Deliver license key once after issue.
 * Prefer Resend when RESEND_API_KEY is set; otherwise log-only.
 */
export async function sendGenericEmail({ to, subject, text, log }) {
	const from = env('LICENSE_EMAIL_FROM', 'licenses@agentgovernance.dev');
	const resendKey = env('RESEND_API_KEY');
	if (resendKey) {
		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${resendKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ from, to: [to], subject, text })
		});
		if (!res.ok) {
			const body = await res.text();
			throw new Error(`Resend failed: ${res.status} ${body}`);
		}
		log?.(`email sent via Resend to ${to}`);
		return { ok: true, provider: 'resend' };
	}
	log?.(`EMAIL_SKIPPED (set RESEND_API_KEY). Would send "${subject}" to ${to}`);
	return { ok: true, provider: 'log', skipped: true };
}

export async function sendLicenseEmail({
	to,
	licenseKey,
	planId,
	tier,
	setupToken,
	activateUrl,
	log
}) {
	const site = env(
		'PUBLIC_SITE_ORIGIN',
		'https://tmrxjd.github.io/agent-governance-system-site'
	).replace(/\/$/, '');
	const activate =
		activateUrl ||
		(setupToken
			? `${site}/activate/?t=${encodeURIComponent(setupToken)}`
			: `${site}/activate/?k=${encodeURIComponent(licenseKey)}`);

	const agentPrompt = [
		'Activate AGS with this license.',
		'',
		`License: ${licenseKey}`,
		'',
		'1) Ensure install of @tmrxjd/agent-governance-system',
		"2) Write 'AGS_LICENSE_KEY' into the host’s secret store / .env",
		'3) Wire MCP / PluginHost per package docs',
		'4) Run a smoke check and confirm “AGS ready”'
	].join('\n');

	const subject = `Your AGS ${tier} license — activate with your AI`;
	const text = [
		`Thanks for choosing Agent Governance System.`,
		``,
		`Plan: ${planId}`,
		`Tier: ${tier}`,
		``,
		`—— For you (no coding required) ——`,
		`1. Open this activate page:`,
		activate,
		`2. Follow the short human steps.`,
		`3. Copy the activation prompt and paste it into your AI coding agent.`,
		`4. Wait until the agent says: AGS ready`,
		``,
		`—— Activation prompt (paste to your AI) ——`,
		agentPrompt,
		``,
		`—— License key (keep private) ——`,
		licenseKey,
		``,
		`Account lookup: ${site}/account/`,
		`Docs: ${site}/docs/install-commercial/`
	].join('\n');

	return sendGenericEmail({ to, subject, text, log });
}
