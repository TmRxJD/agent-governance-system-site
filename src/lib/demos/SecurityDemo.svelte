<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';
	import MermaidDiagram from '$lib/diagrams/MermaidDiagram.svelte';

	const snippets = [
		{ file: 'src/config.ts', line: 'API_KEY = "sk-live-***"', hit: true },
		{ file: 'README.md', line: 'no secrets', hit: false },
		{ file: '.env.example', line: 'PLACEHOLDER only', hit: false }
	];

	const playback = createPlayback(['Scan repo', 'Secret found', 'Block deploy', 'Secure redeploy'], 1);
	onDestroy(() => playback.destroy());

	let frame = $state(0);
	$effect(() => playback.state.subscribe((s) => (frame = s.frame)));

	const mermaid = `flowchart LR
  S[secret scan] --> H{hits?}
  H -->|yes| B[block deploy]
  H -->|no| D[deploy]
  B --> R[rotate + redeploy]`;
</script>

<div class="space-y-4" data-ags-demo="security">
	<PlaybackControls {playback} title="Security scan" />

	<div class="grid gap-4 lg:grid-cols-2">
		<ul class="space-y-2">
			{#each snippets as s}
				<li
					class="rounded-lg border px-3 py-2 font-mono text-[11px]
            {s.hit && frame >= 1 ? 'border-fuchsia-400/60 bg-fuchsia-500/10 text-fuchsia-200 animate-pulse' : 'border-white/10 text-slate-400'}"
				>
					{s.file}: {s.line}
				</li>
			{/each}
		</ul>

		<div class="space-y-3">
			<MermaidDiagram definition={mermaid} class="max-h-36" />
			{#if frame >= 2}
				<p class="text-xs text-fuchsia-300">Deploy blocked — rotate credentials before prod</p>
			{:else if frame >= 3}
				<p class="text-xs text-cyan-300">✓ Secrets rotated · secure deploy path enabled</p>
			{/if}
		</div>
	</div>
</div>
