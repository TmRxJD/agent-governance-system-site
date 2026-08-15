import { base } from '$app/paths';

/** Join app base path with a route (route must start with `/`). */
export function href(path: string): string {
	const p = path.startsWith('/') ? path : `/${path}`;
	return `${base}${p}`;
}
