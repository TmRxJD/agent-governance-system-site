import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

/** Retired install path — use the standard install docs. */
export function load() {
	throw redirect(308, `${base}/docs/install-commercial/`);
}
