<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';

	const playback = createPlayback(['Draft artifacts', 'Tag v2.4.0', 'Generate notes', 'Publish release'], 1);
	onDestroy(() => playback.destroy());

	let frame = $state(0);
	$effect(() => playback.state.subscribe((s) => (frame = s.frame)));

	const artifacts = [
		{ name: '@ags/governance-engine.tgz', size: '142 KB' },
		{ name: 'tower-mcp-bundle.zip', size: '890 KB' },
		{ name: 'checksums.sha256', size: '1.2 KB' }
	];

	const notes = $derived(
		frame >= 2
			? `## v2.4.0\n- MCP slim catalog enforcement\n- Confidence engine thresholds\n- Staging single-category gate`
			: 'Release notes pending…'
	);
</script>

<div class="space-y-4" data-ags-demo="release">
	<PlaybackControls {playback} title="Release pipeline" />

	<div class="grid gap-4 lg:grid-cols-2">
		<div class="space-y-2">
			<h3 class="text-sm font-medium text-cyan-200">Artifacts</h3>
			<ul class="space-y-2">
				{#each artifacts as a}
					<li class="flex justify-between rounded-lg border border-white/10 bg-black/25 px-3 py-2 font-mono text-xs text-slate-300">
						<span>{a.name}</span>
						<span class="text-violet-300">{a.size}</span>
					</li>
				{/each}
			</ul>
			{#if frame >= 1}
				<span
					class="inline-flex animate-pulse rounded-full border border-fuchsia-400/50 bg-fuchsia-500/15 px-3 py-1 font-mono text-xs text-fuchsia-200"
				>
					tag: v2.4.0
				</span>
			{/if}
		</div>

		<div class="rounded-xl border border-violet-400/30 bg-black/30 p-4">
			<h3 class="mb-2 text-sm font-medium text-violet-200">Generated notes</h3>
			<pre class="whitespace-pre-wrap text-xs text-slate-300">{notes}</pre>
			{#if frame >= 3}
				<p class="mt-3 text-xs text-cyan-300">✓ Published to registry (simulated)</p>
			{/if}
		</div>
	</div>
</div>
