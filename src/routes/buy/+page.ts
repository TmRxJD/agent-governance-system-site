import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

/** Buy flow lands on the product pricing page. */
export function load() {
	throw redirect(308, `${base}/pricing/`);
}
