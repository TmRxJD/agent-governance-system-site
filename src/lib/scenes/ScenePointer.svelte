<script lang="ts">
	import Scene from './Scene.svelte';
	import WatchPanel from './WatchPanel.svelte';
	import { href } from '$lib/paths';

	const steps = [
		{ label: 'docs/AGENT_*.md', detail: 'Mapped under rule:gov-docs.', tone: 'ok' as const },
		{ label: 'packages/*/src', detail: 'Engine paths stay private.', tone: 'ok' as const },
		{
			label: 'Drift',
			detail: 'Protocol file moved — pointer miss.',
			tone: 'warn' as const
		},
		{ label: 'Signal', detail: 'Sentinel pain:pointer_drift.', tone: 'warn' as const }
	];
</script>

<Scene
	anchor="pointer"
	eyebrow="Pointer"
	title="Paths map to rules. Drift is visible."
	lede="Each important path has a home. When the map and the tree disagree, the system reports it."
>
	{#snippet aside()}
		<a class="text-sm text-cyan-300 hover:underline" href={href('/showcase/pointer-map/')}
			>Open Pointer →</a
		>
	{/snippet}
	<WatchPanel caption="Repo map" {steps} loopMs={1700} />
</Scene>
