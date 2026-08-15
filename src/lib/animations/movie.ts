import { prefersReducedMotion } from '$lib/animations/scroll-reveal';

type MovieController = {
	play: () => void;
	pause: () => void;
	progress: (n: number) => void;
	kill: () => void;
};

/**
 * Optional GSAP timeline for “movie” modes.
 * Returns a controller; no-ops when reduced motion or GSAP fails to load.
 */
export async function createMovieTimeline(
	build: (gsapApi: typeof import('gsap'), tl: { to: Function; play: Function; pause: Function; progress: Function; kill: Function }) => void
): Promise<MovieController> {
	if (typeof window === 'undefined' || prefersReducedMotion()) {
		return {
			play: () => {},
			pause: () => {},
			progress: (_n: number) => {},
			kill: () => {}
		};
	}

	const gsapMod = await import('gsap');
	const gsap = gsapMod.gsap ?? gsapMod.default;
	const tl = gsap.timeline({ paused: true });
	build(gsapMod, tl);

	return {
		play: () => tl.play(),
		pause: () => tl.pause(),
		progress: (n: number) => tl.progress(n),
		kill: () => tl.kill()
	};
}

export const MOVIE_LABELS = {
	pipeline: ['Schema', 'Pointer', 'Staging', 'Semantic', 'CAP', 'Ship'],
	reflex: ['Pain', 'Arc', 'Reflex', 'Block', 'Clear'],
	deployment: ['Dev', 'Bench', 'Staging', 'Prod', 'Healthy'],
	versioning: ['v0.1.0', 'v0.1.1', 'v0.2.0', 'v1.0.0', 'Changelog']
} as const;
