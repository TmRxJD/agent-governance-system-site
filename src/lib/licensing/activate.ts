/** Zero-knowledge activation: human steps + paste-to-agent prompt. */

export type HumanStep = {
	id: string;
	title: string;
	/** Short instruction shown to the human. */
	body: string;
	/** Optional snippet the human can copy (e.g. reminder text). */
	copyText?: string;
	copyLabel?: string;
};

export function buildAgentActivationPrompt(licenseKey: string): string {
	return [
		'Activate AGS with this license.',
		'',
		`License: ${licenseKey}`,
		'',
		'1) Ensure install of @tmrxjd/agent-governance-system',
		"2) Write 'AGS_LICENSE_KEY' into the host’s secret store / .env",
		'3) Wire MCP / PluginHost per package docs',
		'4) Run a smoke check and confirm “AGS ready”'
	].join('\n');
}

export function humanActivationSteps(): HumanStep[] {
	return [
		{
			id: 'open-agent',
			title: 'Open your AI coding agent',
			body: 'Open Cursor (or your AI coding tool) on the project folder where you want AGS. You do not need to edit any files yourself.',
			copyText: 'Open my AI coding agent in this project folder. I will paste an AGS activation prompt next.',
			copyLabel: 'Copy reminder'
		},
		{
			id: 'copy-prompt',
			title: 'Copy the activation prompt',
			body: 'Use the big “Activation prompt” box below. Tap Copy so the whole prompt (including your license) is on your clipboard.'
		},
		{
			id: 'paste-send',
			title: 'Paste into the agent chat',
			body: 'Paste into a new chat with your agent and send. Let the agent install and configure everything.',
			copyText: 'Paste the AGS activation prompt I copied and complete every step. When finished, reply only with AGS ready or a plain-English error.',
			copyLabel: 'Copy send hint'
		},
		{
			id: 'confirm',
			title: 'Wait for “AGS ready”',
			body: 'When the agent says AGS ready, you are done. If something fails, forward the agent’s plain-English error to support — you still should not need to touch env files.'
		}
	];
}

export function publicSiteOrigin(): string {
	const env = (import.meta as ImportMeta & { env?: Record<string, string> }).env;
	const fromEnv = env?.PUBLIC_SITE_ORIGIN?.replace(/\/$/, '');
	if (fromEnv) return fromEnv;
	if (typeof window !== 'undefined' && window.location?.origin) {
		const base = (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL || '/';
		const pathBase = base.replace(/\/$/, '');
		return `${window.location.origin}${pathBase === '/' ? '' : pathBase}`;
	}
	return 'https://tmrxjd.github.io/agent-governance-system-site';
}

export function activateUrl(opts: { setupToken?: string; licenseKey?: string }): string {
	const origin = publicSiteOrigin();
	const u = new URL(`${origin}/activate/`);
	if (opts.setupToken) u.searchParams.set('t', opts.setupToken);
	else if (opts.licenseKey) u.searchParams.set('k', opts.licenseKey);
	return u.toString();
}
