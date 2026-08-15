<script lang="ts">
	import Scene from './Scene.svelte';
	import WatchPanel from './WatchPanel.svelte';
	import { href } from '$lib/paths';

	const steps = [
		{ label: 'v0.1.0', detail: 'Checkpoint release tagged.', tone: 'ok' as const },
		{ label: 'dev', detail: 'Build + unit green.', tone: 'ok' as const },
		{ label: 'staging', detail: 'Health + inventory gates.', tone: 'idle' as const },
		{ label: 'prod', detail: 'Promotion after gates clear.', tone: 'ok' as const }
	];
</script>

<Scene
	anchor="ship"
	eyebrow="Versioning · Deployment"
	title="Versions move through environments on purpose."
	lede="Bumps produce tags and notes. Promotion follows health and policy gates — not a manual hop."
>
	{#snippet aside()}
		<a class="text-sm text-cyan-300 hover:underline" href={href('/showcase/versioning/')}>Versioning →</a>
		<span class="mx-2 text-slate-600">·</span>
		<a class="text-sm text-cyan-300 hover:underline" href={href('/showcase/deployment/')}>Deployment →</a>
	{/snippet}
	<WatchPanel caption="Promote" {steps} loopMs={1800} />
</Scene>
