<script lang="ts">
	import EnginePage from '$lib/components/EnginePage.svelte';
	import WatchPanel from '$lib/scenes/WatchPanel.svelte';
	import MermaidDiagram from '$lib/diagrams/MermaidDiagram.svelte';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import { narrativeFor } from '$lib/sim/engine-narratives';
	import { href } from '$lib/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const story = $derived(narrativeFor(data.engine.slug));
</script>

<svelte:head>
	<title>{data.engine.title} · AGS</title>
</svelte:head>

<EnginePage engine={data.engine}>
	{#snippet watch()}
		<WatchPanel steps={story.watch} caption={data.engine.shortTitle} />
	{/snippet}

	{#snippet diagram()}
		<MermaidDiagram definition={story.diagram} />
	{/snippet}

	{#snippet example()}
		<GlassPanel padding="p-4">
			<pre class="overflow-auto font-mono text-sm text-slate-300">{story.example}</pre>
			<a class="mt-3 inline-block text-sm text-cyan-300 hover:underline" href={href(story.docsPath)}
				>Docs →</a
			>
		</GlassPanel>
	{/snippet}
</EnginePage>
