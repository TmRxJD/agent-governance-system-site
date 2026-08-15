<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';

	const packages = [
		{ name: '@ags/governance-engine', version: '2.4.0' },
		{ name: '@ags/eslint-plugin', version: '1.2.1' },
		{ name: '@ags/tower-mcp', version: '0.9.8' }
	];

	const playback = createPlayback(['Pack tarball', 'Auth token', 'Upload', 'Indexed in registry'], 1);
	onDestroy(() => playback.destroy());

	let frame = $state(0);
	let publishing = $state('@ags/governance-engine@2.4.1-rc');
	$effect(() => playback.state.subscribe((s) => (frame = s.frame)));

	const published = $derived(frame >= 3 ? [...packages, { name: publishing.split('@')[0] ?? publishing, version: '2.4.1-rc' }] : packages);
</script>

<div class="space-y-4" data-ags-demo="registry">
	<PlaybackControls {playback} title="Publish flow" />

	<div class="rounded-xl border border-violet-400/30 bg-black/30 p-4 font-mono text-xs text-violet-200">
		registry.ags.local — {frame >= 1 ? 'authenticated' : 'awaiting token'}
	</div>

	<p class="text-xs text-slate-400">Publishing: <span class="text-cyan-200">{publishing}</span></p>

	<ul class="space-y-2">
		{#each published as pkg (pkg.name + pkg.version)}
			<li
				class="flex justify-between rounded-lg border px-3 py-2 font-mono text-xs transition-all
          {pkg.version === '2.4.1-rc' ? 'border-fuchsia-400/50 bg-fuchsia-500/10 text-fuchsia-100 animate-pulse' : 'border-white/10 text-slate-300'}"
			>
				<span>{pkg.name}</span>
				<span>{pkg.version}</span>
			</li>
		{/each}
	</ul>
</div>
