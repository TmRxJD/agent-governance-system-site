<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';
	import MermaidDiagram from '$lib/diagrams/MermaidDiagram.svelte';

	const playback = createPlayback(
		['Sources aligned', 'Reference edited', 'Drift detected', 'Canonical enforced'],
		1.5
	);
	onDestroy(() => playback.destroy());

	const sources = [
		{ id: 'canonical', label: 'canonical.yml', role: 'canonical' as const, hash: 'a3f9…c2' },
		{ id: 'wiki', label: 'docs/wiki.md', role: 'reference' as const, hash: 'a3f9…c2' },
		{ id: 'sheet', label: 'oracle/sheet', role: 'reference' as const, hash: 'b1e2…9a' },
		{ id: 'code', label: 'sdk/module.ts', role: 'reference' as const, hash: 'a3f9…c2' }
	];

	let frame = $state(0);
	$effect(() => {
		const unsub = playback.state.subscribe((s) => (frame = s.frame));
		return unsub;
	});

	const drifted = $derived(frame >= 1);
	const enforced = $derived(frame >= 3);

	const mermaid = `flowchart LR
  C[canonical.yml] --> W[wiki.md]
  C --> S[sheet oracle]
  C --> K[sdk module]
  W -. drift .-> D{{drift sentinel}}
  S --> D
  K --> D`;
</script>

<div class="space-y-4" data-ags-demo="canonicalization">
	<PlaybackControls {playback} title="Drift timeline" />

	<div class="grid gap-4 lg:grid-cols-2">
		<div class="space-y-2">
			<h3 class="text-sm font-medium text-cyan-200">Source registry</h3>
			<ul class="space-y-2">
				{#each sources as src (src.id)}
					{@const isDrift = drifted && src.id === 'sheet'}
					<li
						class="flex items-center justify-between rounded-lg border px-3 py-2 transition-all duration-500
              {src.role === 'canonical'
							? 'border-cyan-400/50 bg-cyan-400/10'
							: isDrift
								? 'border-fuchsia-400/60 bg-fuchsia-500/15 animate-pulse'
								: 'border-white/10 bg-black/20'}"
					>
						<span class="font-mono text-xs text-slate-200">{src.label}</span>
						<span
							class="text-[10px] uppercase tracking-wide
                {src.role === 'canonical' ? 'text-cyan-300' : isDrift ? 'text-fuchsia-300' : 'text-violet-300'}"
						>
							{src.role === 'canonical' ? 'canonical' : isDrift ? 'drift' : 'reference'}
						</span>
					</li>
				{/each}
			</ul>
			{#if frame === 2}
				<p class="text-xs text-fuchsia-300">⚠ Hash mismatch: sheet oracle ≠ canonical.yml</p>
			{:else if enforced}
				<p class="text-xs text-cyan-300">✓ References reconciled to canonical hash a3f9…c2</p>
			{/if}
		</div>

		<MermaidDiagram definition={mermaid} />
	</div>
</div>
