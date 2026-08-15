import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

/** Retired route — pricing is the only public plan surface. */
export function load() {
	throw redirect(308, `${base}/pricing/`);
}
