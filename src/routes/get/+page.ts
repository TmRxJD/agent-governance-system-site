import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

/** Checkout / access lives on Pricing — this route is retired. */
export function load() {
	throw redirect(308, `${base}/pricing/`);
}
