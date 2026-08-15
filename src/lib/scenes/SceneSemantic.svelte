<script lang="ts">
	import Scene from './Scene.svelte';
	import WatchPanel from './WatchPanel.svelte';
	import { href } from '$lib/paths';

	const steps = [
		{ label: 'concept:cap', detail: 'Linked to staging + enforcement.', tone: 'ok' as const },
		{ label: 'concept:done', detail: 'Conflicts with awaiting_user.', tone: 'idle' as const },
		{
			label: 'Contradiction',
			detail: 'status=done + User-approved: no',
			tone: 'warn' as const
		},
		{ label: 'Hold', detail: 'Commit stays blocked until resolved.', tone: 'warn' as const }
	];
</script>

<Scene
	anchor="semantic"
	eyebrow="Semantic"
	title="Contradictions surface before merge."
	lede="Concepts and constraints form a graph. Illegal combinations stop the path."
>
	{#snippet aside()}
		<a class="text-sm text-cyan-300 hover:underline" href={href('/showcase/semantic-graph/')}
			>Open Semantic →</a
		>
	{/snippet}
	<WatchPanel caption="Constraint check" {steps} />
</Scene>
