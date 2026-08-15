<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { EngineMeta } from '$lib/sim/engine-registry';
	import type { EngineNarrative } from '$lib/sim/engine-narratives';
	import { href } from '$lib/paths';
	import Badge from '$lib/ui/Badge.svelte';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';

	type Props = {
		engine: EngineMeta;
		story: EngineNarrative;
		watch: Snippet;
		diagram?: Snippet;
		demo?: Snippet;
		example?: Snippet;
		children?: Snippet;
	};

	let { engine, story, watch, diagram, demo, example, children }: Props = $props();
</script>

<article
	class="space-y-14"
	data-ags-demo={engine.slug}
	data-ags-diagram="true"
	data-ags-animation="true"
>
	<header class="max-w-3xl">
		<div class="mb-3 flex flex-wrap gap-2">
			<Badge tone="cyan" label={engine.shortTitle} />
			<Badge tone="muted" label="Simulated" />
			{#if story.mcpTools?.length}
				<Badge tone="violet" label={`${story.mcpTools.length} MCP tools`} />
			{/if}
		</div>
		<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{engine.title}</h1>
		<p class="mt-3 text-lg text-slate-400">{engine.blurb}</p>
	</header>

	<section class="grid gap-4 md:grid-cols-3">
		<GlassPanel padding="p-4">
			<p class="text-xs font-semibold tracking-[0.2em] text-cyan-300/90 uppercase">How you use it</p>
			<p class="mt-2 text-sm leading-relaxed text-slate-300">{story.usage}</p>
		</GlassPanel>
		<GlassPanel padding="p-4">
			<p class="text-xs font-semibold tracking-[0.2em] text-emerald-300/90 uppercase">Token savings</p>
			<p class="mt-2 text-sm leading-relaxed text-slate-300">{story.tokenSavings}</p>
		</GlassPanel>
		<GlassPanel padding="p-4">
			<p class="text-xs font-semibold tracking-[0.2em] text-violet-300/90 uppercase">Consistency</p>
			<p class="mt-2 text-sm leading-relaxed text-slate-300">{story.consistency}</p>
		</GlassPanel>
	</section>

	<section>
		<p class="mb-3 text-xs font-semibold tracking-[0.2em] text-cyan-300/90 uppercase">In action</p>
		{@render watch()}
	</section>

	{#if demo}
		<section>
			<p class="mb-3 text-xs font-semibold tracking-[0.2em] text-fuchsia-300/90 uppercase">
				Interactive demo
			</p>
			{@render demo()}
			<p class="mt-2 text-xs text-slate-500">
				Simulated behavior only — does not execute proprietary AGS engine code.
			</p>
		</section>
	{/if}

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
			<p class="mb-3 text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
				Example usage
			</p>
			{@render example()}
			{#if story.mcpTools?.length}
				<ul class="mt-3 flex flex-wrap gap-2">
					{#each story.mcpTools as tool (tool)}
						<li
							class="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-slate-400"
						>
							{tool}
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	{/if}

	<footer class="flex flex-wrap gap-4 border-t border-white/10 pt-8 text-sm">
		<a class="text-cyan-300 hover:underline" href={href(story.docsPath)}>Engine docs</a>
		<a class="text-cyan-300 hover:underline" href={href('/docs/')}>All docs</a>
		<a class="text-cyan-300 hover:underline" href={href('/#engines')}>All engines</a>
		<a class="text-cyan-300 hover:underline" href={href('/pricing/')}>Pricing</a>
	</footer>
</article>
