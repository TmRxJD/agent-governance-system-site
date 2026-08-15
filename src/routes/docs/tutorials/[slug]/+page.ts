import { error } from '@sveltejs/kit';
import { getTutorial, tutorials } from '$lib/docs/tutorials/entries';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => tutorials.map((t) => ({ slug: t.slug }));

export const prerender = true;

export const load: PageLoad = ({ params }) => {
	const tutorial = getTutorial(params.slug);
	if (!tutorial) throw error(404, 'Tutorial not found');
	const index = tutorials.findIndex((t) => t.slug === params.slug);
	return {
		tutorial,
		prev: index > 0 ? tutorials[index - 1] : undefined,
		next: index >= 0 && index < tutorials.length - 1 ? tutorials[index + 1] : undefined
	};
};
