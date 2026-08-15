import { base } from '$app/paths';

/** Public host for absolute meta URLs (no project base path). */
export const SITE_HOST = 'https://tmrxjd.github.io';

/** Default social image under `static/media`. */
export const DEFAULT_OG_IMAGE_PATH = '/media/ags-logo.png';

/** Absolute URL for an app route path (adds `base`; path must start with `/`). */
export function absoluteUrl(path = '/'): string {
	const p = path.startsWith('/') ? path : `/${path}`;
	return `${SITE_HOST}${base}${p}`;
}

/**
 * Absolute URL from `page.url.pathname` (already includes `base` when configured).
 */
export function absoluteFromPathname(pathname: string): string {
	const withSlash =
		pathname.endsWith('/') || pathname.split('/').pop()?.includes('.')
			? pathname
			: `${pathname}/`;
	return `${SITE_HOST}${withSlash}`;
}
