<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';

	const tree = {
		name: 'release-bundle',
		children: [
			{ name: 'manifest.json', valid: true },
			{ name: 'packages/', children: [{ name: 'sdk.tgz' }, { name: 'gov.tgz' }] },
			{ name: 'signatures/', children: [{ name: 'sha256.txt' }] }
		]
	};

	const playback = createPlayback(['Inspect tree', 'Validate schema', 'Check signatures', 'Artifact OK'], 1);
	onDestroy(() => playback.destroy());

	let frame = $state(0);
	$effect(() => playback.state.subscribe((s) => (frame = s.frame)));
</script>

<div class="space-y-4" data-ags-demo="artifact">
	<PlaybackControls {playback} title="Validation" />

	<div class="grid gap-4 lg:grid-cols-2">
		<pre class="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-[11px] text-slate-300">{JSON.stringify(tree, null, 2)}</pre>

		<ul class="space-y-2 text-xs">
			<li class={frame >= 0 ? 'text-cyan-200' : 'text-slate-600'}>Structure parsed</li>
			<li class={frame >= 1 ? 'text-violet-200' : 'text-slate-600'}>manifest.json schema ✓</li>
			<li class={frame >= 2 ? 'text-violet-200' : 'text-slate-600'}>signatures/sha256.txt ✓</li>
			<li class={frame >= 3 ? 'text-cyan-300 animate-pulse' : 'text-slate-600'}>Artifact integrity verified</li>
		</ul>
	</div>
</div>
