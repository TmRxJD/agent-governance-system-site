import { ENGINES } from '$lib/sim/engine-registry';
import { allDocsPages } from '$lib/docs/nav';
import { tutorials } from '$lib/docs/tutorials/entries';

export const prerender = true;

/** Origin host only (no project base path). */
const SITE_ORIGIN = (process.env.SITE_ORIGIN ?? 'https://tmrxjd.github.io').replace(/\/$/, '');

/** Same default as vite.config.ts production base. */
const BASE_PATH = (process.env.BASE_PATH ?? '/agent-governance-system-site').replace(/\/$/, '');

function loc(path: string): string {
	const p = path.startsWith('/') ? path : `/${path}`;
	return `${SITE_ORIGIN}${BASE_PATH}${p}`;
}

function urlEntry(path: string, changefreq: string, priority: string): string {
	return `  <url>
    <loc>${loc(path)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export function GET() {
	const staticPaths = [
		'/',
		'/pricing/',
		'/licensing/',
		'/privacy/',
		'/terms/',
		'/checkout/',
		'/activate/',
		'/students/',
		'/account/',
		'/docs/',
		'/docs/tutorials/'
	];

	const parts = [
		...staticPaths.map((p) =>
			urlEntry(p, p === '/' ? 'weekly' : 'monthly', p === '/' ? '1.0' : '0.8')
		),
		...allDocsPages().map((p) => urlEntry(p.href, 'monthly', '0.7')),
		...tutorials.map((t) => urlEntry(`/docs/tutorials/${t.slug}/`, 'monthly', '0.6')),
		...ENGINES.map((e) => urlEntry(`/showcase/${e.slug}/`, 'monthly', '0.5'))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${parts.join('\n')}
</urlset>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
}
