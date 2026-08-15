import { describe, expect, it } from 'vitest';
import { ENGINES } from '$lib/sim/engine-registry';
import { NARRATIVES, narrativeFor } from '$lib/sim/engine-narratives';

describe('engine showcase narratives', () => {
	it('covers every registry engine with usage, tokens, consistency', () => {
		for (const engine of ENGINES) {
			expect(NARRATIVES[engine.slug], `missing narrative: ${engine.slug}`).toBeTruthy();
			const n = narrativeFor(engine.slug);
			expect(n.usage.length).toBeGreaterThan(40);
			expect(n.tokenSavings.length).toBeGreaterThan(40);
			expect(n.consistency.length).toBeGreaterThan(20);
			expect(n.example.length).toBeGreaterThan(20);
			expect(n.watch.length).toBeGreaterThanOrEqual(3);
			expect(n.diagram).toMatch(/flowchart/);
			expect(n.docsPath.startsWith('/')).toBe(true);
		}
	});

	it('has no orphan narratives', () => {
		const slugs = new Set(ENGINES.map((e) => e.slug));
		for (const key of Object.keys(NARRATIVES)) {
			expect(slugs.has(key), `orphan narrative: ${key}`).toBe(true);
		}
	});
});
