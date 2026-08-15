import { describe, expect, it } from 'vitest';
import { polishMcpCode, polishTutorialParagraph } from '$lib/docs/tutorials/polish';
import type { Tutorial } from '$lib/docs/tutorials/types';

const sample: Tutorial = {
	slug: 'pointer',
	title: 'Pointer Engine',
	summary: 'x',
	trackId: 'structure',
	prerequisites: [],
	goals: [],
	mcpTools: ['pointer_scan', 'pointer_enforce'],
	config: ['.ags/pointers.yml'],
	sections: []
};

describe('tutorial polish', () => {
	it('rewrites formulaic config blurb', () => {
		const out = polishTutorialParagraph('Apply the following configuration in your repo.', sample);
		expect(out).toContain('.ags/pointers.yml');
		expect(out).not.toBe('Apply the following configuration in your repo.');
	});

	it('fills empty MCP JSON examples', () => {
		const out = polishMcpCode('MCP: pointer_enforce', '{}', sample);
		expect(out).toContain('pointer_');
		expect(out).toContain('"tool"');
	});
});
