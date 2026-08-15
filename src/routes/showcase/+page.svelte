<script lang="ts">
	import { ENGINES } from '$lib/sim/engine-registry';
	import { href } from '$lib/paths';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
</script>

<section>
	<a class="text-sm text-cyan-300 hover:underline" href={href('/#engines')}>← Story</a>
	<h1 class="mt-4 text-3xl font-semibold tracking-tight">Engines</h1>
	<p class="mt-2 max-w-xl text-slate-400">Deep pages for each engine. Start from the story on the home page.</p>
	<div class="mt-8 grid gap-3 sm:grid-cols-2">
		{#each ENGINES as engine (engine.slug)}
			<a href={href(`/showcase/${engine.slug}/`)}>
				<GlassPanel class="transition hover:border-cyan-400/35" padding="p-4">
					<p class="text-xs text-cyan-300 uppercase">{engine.shortTitle}</p>
					<p class="mt-1 font-medium">{engine.title}</p>
				</GlassPanel>
			</a>
		{/each}
	</div>
</section>
