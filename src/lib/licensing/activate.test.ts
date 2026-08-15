import { describe, expect, it } from 'vitest';
import { buildAgentActivationPrompt, humanActivationSteps } from './activate';

describe('activation prompt', () => {
	it('matches the paste-to-agent contract', () => {
		const p = buildAgentActivationPrompt('ags_live_1.testkey');
		expect(p).toBe(
			[
				'Activate AGS with this license.',
				'',
				'License: ags_live_1.testkey',
				'',
				'1) Ensure install of @tmrxjd/agent-governance-system',
				"2) Write 'AGS_LICENSE_KEY' into the host’s secret store / .env",
				'3) Wire MCP / PluginHost per package docs',
				'4) Run a smoke check and confirm “AGS ready”'
			].join('\n')
		);
	});

	it('exposes human steps with copy segments', () => {
		const steps = humanActivationSteps();
		expect(steps.length).toBeGreaterThanOrEqual(4);
		expect(steps.some((s) => s.copyText)).toBe(true);
		expect(steps[0].title.toLowerCase()).toMatch(/open/);
	});
});
