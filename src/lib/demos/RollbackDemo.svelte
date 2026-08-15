<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';

	const versions = ['v2.3.2', 'v2.4.0', 'v2.4.1-rc1'];

	const playback = createPlayback(['Incident detected', 'Select target', 'Rollback deploy', 'Health restored'], 0.9);
	onDestroy(() => playback.destroy());

	let frame = $state(0);
	let target = $state('v2.3.2');
	$effect(() => playback.state.subscribe((s) => (frame = s.frame)));
</script>

<div class="space-y-4" data-ags-demo="rollback">
	<PlaybackControls {playback} title="Rollback flow" />

	<div class="flex flex-wrap items-center gap-4">
		{#each versions as v, i}
			<button
				type="button"
				class="rounded-lg border px-4 py-2 font-mono text-xs transition-all
          {target === v ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-100' : 'border-white/10 text-slate-400'}"
				onclick={() => (target = v)}
			>
				{v}
				{#if i === 0 && frame >= 2}
					<span class="ml-2 text-fuchsia-300">← active</span>
				{/if}
			</button>
		{/each}
	</div>

	<ol class="space-y-2 text-xs text-slate-300">
		<li class:line-through={frame >= 2} class:text-slate-600={frame >= 2}>Current: v2.4.1-rc1 (failing)</li>
		<li class={frame >= 1 ? 'text-violet-200' : 'text-slate-600'}>Target: {target}</li>
		<li class={frame >= 2 ? 'text-cyan-200 animate-pulse' : 'text-slate-600'}>Deploying previous artifact…</li>
		<li class={frame >= 3 ? 'text-cyan-300' : 'text-slate-600'}>✓ Traffic shifted · error rate 0.01%</li>
	</ol>
</div>
