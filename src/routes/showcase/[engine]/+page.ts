import { ENGINE_SLUGS, getEngine } from '$lib/sim/engine-registry';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => ENGINE_SLUGS.map((engine) => ({ engine }));

export const load: PageLoad = ({ params }) => {
	const engine = getEngine(params.engine);
	if (!engine) error(404, `Unknown engine: ${params.engine}`);
	return { engine };
};
