<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { EngineMeta } from '$lib/sim/engine-registry';
	import { href } from '$lib/paths';
	import Badge from '$lib/ui/Badge.svelte';

	type Props = {
		engine: EngineMeta;
		watch: Snippet;
		diagram?: Snippet;
		example?: Snippet;
		children?: Snippet;
	};

	let { engine, watch, diagram, example, children }: Props = $props();
</script>

<article
	class="space-y-14"
	data-ags-demo={engine.slug}
	data-ags-diagram="true"
	data-ags-animation="true"
>
	<header class="max-w-2xl">
		<div class="mb-3 flex flex-wrap gap-2">
			<Badge tone="cyan" label={engine.shortTitle} />
			<Badge tone="muted" label="Simulated" />
		</div>
		<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{engine.title}</h1>
		<p class="mt-3 text-lg text-slate-400">{engine.blurb}</p>
	</header>

	<section>
		<p class="mb-3 text-xs font-semibold tracking-[0.2em] text-cyan-300/90 uppercase">Watch it work</p>
		{@render watch()}
	</section>

	{#if diagram}
		<section>
			<p class="mb-3 text-xs font-semibold tracking-[0.2em] text-violet-300/90 uppercase">Diagram</p>
			{@render diagram()}
		</section>
	{/if}

	{#if children}
		<section>
			<p class="mb-3 text-xs font-semibold tracking-[0.2em] text-fuchsia-300/90 uppercase">Try it</p>
			{@render children()}
		</section>
	{/if}

	{#if example}
		<section>
			<p class="mb-3 text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">Example</p>
			{@render example()}
		</section>
	{/if}

	<footer class="flex flex-wrap gap-4 border-t border-white/10 pt-8 text-sm">
		<a class="text-cyan-300 hover:underline" href={href('/docs/')}>Docs</a>
		<a class="text-cyan-300 hover:underline" href={href('/#engines')}>All engines</a>
		<a class="text-cyan-300 hover:underline" href={href('/get/')}>Get AGS</a>
	</footer>
</article>
