import { describe, expect, it } from 'vitest';
import { ENGINES, ENGINE_SLUGS, getEngine } from '$lib/sim/engine-registry';
import { createPlayback } from '$lib/animations/playback';
import { MOVIE_LABELS } from '$lib/animations/movie';
import { get } from 'svelte/store';

describe('engine-registry', () => {
	it('lists 24 engines with required features', () => {
		expect(ENGINES).toHaveLength(24);
		expect(ENGINE_SLUGS).toHaveLength(24);
		for (const e of ENGINES) {
			expect(e.features).toEqual(expect.arrayContaining(['animation', 'diagram', 'interaction']));
			expect(getEngine(e.slug)?.title).toBe(e.title);
		}
	});
});

describe('playback', () => {
	it('advances frames and toggles play state', () => {
		const p = createPlayback(['A', 'B', 'C'], 50);
		expect(get(p.state).frame).toBe(0);
		p.setFrame(2);
		expect(get(p.state).label).toBe('C');
		p.scrub(1);
		expect(get(p.state).playing).toBe(false);
		expect(get(p.state).frame).toBe(1);
		p.destroy();
	});
});

describe('movie labels', () => {
	it('defines four movie modes', () => {
		expect(Object.keys(MOVIE_LABELS)).toEqual(
			expect.arrayContaining(['pipeline', 'reflex', 'deployment', 'versioning'])
		);
	});
});
