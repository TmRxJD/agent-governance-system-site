import { describe, expect, it, vi } from 'vitest';

vi.mock('$app/paths', () => ({
	base: '/agent-governance-system-site'
}));

describe('site-meta', async () => {
	const { absoluteUrl, absoluteFromPathname, SITE_HOST } = await import('$lib/site-meta');

	it('builds asset URLs with base', () => {
		expect(absoluteUrl('/media/hero.jpg')).toBe(
			`${SITE_HOST}/agent-governance-system-site/media/hero.jpg`
		);
	});

	it('does not double-prefix pathname that already includes base', () => {
		expect(absoluteFromPathname('/agent-governance-system-site/pricing')).toBe(
			`${SITE_HOST}/agent-governance-system-site/pricing/`
		);
	});
});

describe('href paths', async () => {
	const { href } = await import('$lib/paths');

	it('prefixes hash home links with base', () => {
		expect(href('/#discipline')).toBe('/agent-governance-system-site/#discipline');
	});
});
