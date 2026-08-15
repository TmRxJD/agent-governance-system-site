<script lang="ts">
	import Scene from './Scene.svelte';
	import WatchPanel from './WatchPanel.svelte';
	import { href } from '$lib/paths';

	const steps = [
		{ label: 'Diff set', detail: '3 files touched in one agent turn.', tone: 'idle' as const },
		{ label: 'Classify', detail: 'Paths split into Commit-Scopes.', tone: 'idle' as const },
		{
			label: 'single-change',
			detail: 'src/lib/paths.ts — one logical edit.',
			tone: 'ok' as const
		},
		{
			label: 'file-create',
			detail: 'src/lib/scenes/Scene.svelte — new file only.',
			tone: 'ok' as const
		},
		{
			label: 'Reject batch',
			detail: 'Mixed scopes in one commit stay blocked.',
			tone: 'warn' as const
		}
	];
</script>

<Scene
	anchor="staging"
	eyebrow="Staging"
	title="One Commit-Scope per commit."
	lede="Diffs are classified before they ship. Mixed scopes do not batch."
>
	{#snippet aside()}
		<a class="text-sm text-cyan-300 hover:underline" href={href('/showcase/staging/')}>Open Staging →</a>
	{/snippet}
	<WatchPanel caption="Classifier" {steps} loopMs={1500} />
</Scene>
