<script lang="ts">
	import EnginePage from '$lib/components/EnginePage.svelte';
	import EngineDemoHost from '$lib/components/EngineDemoHost.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import WatchPanel from '$lib/scenes/WatchPanel.svelte';
	import MermaidDiagram from '$lib/diagrams/MermaidDiagram.svelte';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import { narrativeFor } from '$lib/sim/engine-narratives';
	import { href } from '$lib/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const story = $derived(narrativeFor(data.engine.slug));
</script>

<SeoHead
	title={`${data.engine.title} · AGS`}
	description={`${data.engine.blurb} ${story.tokenSavings.slice(0, 120)}`}
/>

<EnginePage engine={data.engine} {story}>
	{#snippet watch()}
		<WatchPanel steps={story.watch} caption={data.engine.shortTitle} />
	{/snippet}

	{#snippet demo()}
		<EngineDemoHost slug={data.engine.slug} />
	{/snippet}

	{#snippet diagram()}
		<MermaidDiagram definition={story.diagram} />
	{/snippet}

	{#snippet example()}
		<GlassPanel padding="p-4">
			<pre class="overflow-auto font-mono text-sm whitespace-pre-wrap text-slate-300">{story.example}</pre>
			<a class="mt-3 inline-block text-sm text-cyan-300 hover:underline" href={href(story.docsPath)}
				>Docs →</a
			>
		</GlassPanel>
	{/snippet}
</EnginePage>
