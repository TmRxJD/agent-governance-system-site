import { base } from '$app/paths';

/** Join app base path with a route (route must start with `/`, optional `#hash`). */
export function href(path: string): string {
	const raw = path.startsWith('/') || path.startsWith('#') ? path : `/${path}`;
	if (raw.startsWith('#')) {
		return `${base}/${raw}`;
	}
	return `${base}${raw}`;
}
