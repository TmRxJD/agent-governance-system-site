<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import DocsSidebar from '$lib/components/DocsSidebar.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { findDocsPage } from '$lib/docs/nav';
	import { getTutorial } from '$lib/docs/tutorials/entries';
	import { href } from '$lib/paths';

	let { children }: { children: Snippet } = $props();

	const pathNorm = $derived(page.url.pathname.replace(/\/$/, '') || '/');
	const isDocsIndex = $derived(pathNorm === '/docs' || pathNorm.endsWith('/docs'));
	const onTutorials = $derived(pathNorm.includes('/docs/tutorials'));
	const tutorialSlug = $derived(pathNorm.match(/\/docs\/tutorials\/([^/]+)$/)?.[1]);
	const tutorial = $derived(tutorialSlug ? getTutorial(tutorialSlug) : undefined);
	const current = $derived(findDocsPage(page.url.pathname));
	const showBreadcrumb = $derived(!isDocsIndex && (Boolean(current) || onTutorials));

	const headTitle = $derived(
		tutorial
			? `${tutorial.title} · AGS Tutorials`
			: current
				? `${current.title} · AGS Docs`
				: isDocsIndex
					? 'Documentation · AGS'
					: onTutorials
						? 'Tutorials · AGS'
						: 'AGS Docs'
	);
	const headDescription = $derived(
		tutorial?.summary ??
			current?.summary ??
			'Install AGS, configure governance policies, and learn every SDK surface.'
	);
</script>

<SeoHead title={headTitle} description={headDescription} />

<div
	class="docs-wiki mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-10 lg:px-8 lg:py-10"
>
	<details class="rounded-xl border border-white/10 bg-white/[0.02] p-4 lg:hidden">
		<summary class="cursor-pointer text-sm font-medium text-slate-200">Docs menu</summary>
		<div class="mt-4 docs-sidebar-mobile">
			<DocsSidebar />
		</div>
	</details>

	<div class="hidden lg:block">
		<div class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8">
			<DocsSidebar />
		</div>
	</div>

	<div class="min-w-0 flex-1">
		{#if showBreadcrumb}
			<nav class="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
				<a class="hover:text-cyan-300" href={href('/docs/')}>Docs</a>
				{#if onTutorials}
					<span class="mx-2 text-slate-600">/</span>
					<a class="hover:text-cyan-300" href={href('/docs/tutorials/')}>Tutorials</a>
					{#if tutorial}
						<span class="mx-2 text-slate-600">/</span>
						<span class="text-slate-300">{tutorial.title}</span>
					{/if}
				{:else if current}
					<span class="mx-2 text-slate-600">/</span>
					<span class="text-slate-300">{current.title}</span>
				{/if}
			</nav>
		{/if}

		<article class="prose prose-ags prose-invert max-w-3xl">
			{@render children()}
		</article>
	</div>
</div>
