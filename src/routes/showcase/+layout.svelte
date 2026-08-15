<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ENGINES } from '$lib/sim/engine-registry';
	import { href } from '$lib/paths';
	import { page } from '$app/state';

	let { children }: { children: Snippet } = $props();

	const current = $derived(
		ENGINES.find((e) => page.url.pathname.includes(`/showcase/${e.slug}`))
	);
</script>

<div class="space-y-8">
	<nav class="flex flex-wrap gap-2 text-sm text-slate-500">
		<a class="hover:text-cyan-300" href={href('/#engines')}>Engines</a>
		{#if current}
			<span>/</span>
			<span class="text-slate-300">{current.shortTitle}</span>
		{/if}
	</nav>
	{@render children()}
</div>
