export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Svelte action: adds `data-inview` when element enters viewport. */
export function scrollReveal(node: HTMLElement, rootMargin = '0px 0px -10% 0px') {
	if (typeof IntersectionObserver === 'undefined') {
		node.dataset.inview = 'true';
		return {};
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.dataset.inview = 'true';
					io.unobserve(node);
				}
			}
		},
		{ rootMargin, threshold: 0.12 }
	);

	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
}
