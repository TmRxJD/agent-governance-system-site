<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';
	import MermaidDiagram from '$lib/diagrams/MermaidDiagram.svelte';

	const envs = ['dev', 'bench', 'staging', 'prod'] as const;
	const gates = ['unit tests', 'confidence ≥ 0.72', 'health green', 'user approval'];

	const playback = createPlayback(
		['dev ✓', 'bench checks', 'staging gate', 'prod promotion'],
		0.8
	);
	onDestroy(() => playback.destroy());

	let frame = $state(0);
	$effect(() => playback.state.subscribe((s) => (frame = s.frame)));

	const activeEnv = $derived(envs[Math.min(frame, envs.length - 1)]);
	const mermaid = `flowchart LR
  D[dev] --> B[bench]
  B --> S[staging]
  S --> P[prod]
  S -. gate .-> G{{checks}}`;
</script>

<div class="space-y-4" data-ags-demo="promotion">
	<PlaybackControls {playback} title="Promotion" />

	<div class="flex flex-wrap gap-2">
		{#each envs as env, i}
			<div
				class="rounded-xl border px-4 py-3 text-center transition-all duration-500
          {i <= frame
					? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-100 scale-105'
					: 'border-white/10 bg-black/20 text-slate-500'}"
			>
				<div class="text-xs uppercase tracking-wide">{env}</div>
				{#if env === activeEnv && i === frame && i < envs.length - 1}
					<div class="mt-1 animate-pulse text-[10px] text-fuchsia-300">gating…</div>
				{/if}
			</div>
		{/each}
	</div>

	<ul class="grid gap-2 sm:grid-cols-2">
		{#each gates as g, i}
			<li
				class="rounded-lg border px-3 py-2 text-xs transition-colors
          {i <= frame ? 'border-violet-400/40 text-violet-200 bg-violet-500/10' : 'border-white/10 text-slate-500'}"
			>
				{i <= frame ? '✓' : '○'} {g}
			</li>
		{/each}
	</ul>

	<MermaidDiagram definition={mermaid} class="max-h-32" />
</div>
