<script lang="ts">
	import Scene from './Scene.svelte';
	import WatchPanel from './WatchPanel.svelte';
	import { href } from '$lib/paths';

	const steps = [
		{ label: 'Pain', detail: 'pain:commit:raw_git', tone: 'warn' as const },
		{ label: 'Arc', detail: 'Violation → reflex.license / gate.', tone: 'idle' as const },
		{ label: 'Reflex', detail: 'Hook deny. Agent redirected to MCP.', tone: 'ok' as const },
		{ label: 'Clear', detail: 'Only after a legal checkpoint.', tone: 'ok' as const }
	];
</script>

<Scene
	anchor="sentinel"
	eyebrow="Sentinel"
	title="Violations fire reflexes."
	lede="Pain signals trigger fixed arcs. The response is deterministic — block, redirect, or remediate."
>
	{#snippet aside()}
		<a class="text-sm text-cyan-300 hover:underline" href={href('/showcase/reflex-arcs/')}
			>Open Sentinel →</a
		>
	{/snippet}
	<WatchPanel caption="Reflex arc" {steps} loopMs={1400} />
</Scene>
