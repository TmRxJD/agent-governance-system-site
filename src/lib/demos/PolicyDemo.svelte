<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';

	const yaml = `# .ags/policy.yml (simulated)
version: 1
commit:
  require_enforcement: true
  allowed_status:
    - checkpoint
    - awaiting-user
staging:
  single_category: true
confidence:
  min_score: 0.72
blocks:
  - raw_git_commit
  - skip_hooks`;

	const playback = createPlayback(['Policy loaded', 'Evaluating diff', 'Violation found', 'Enforced block'], 1.2);
	onDestroy(() => playback.destroy());

	let frame = $state(0);
	$effect(() => playback.state.subscribe((s) => (frame = s.frame)));

	const violations = $derived(frame >= 2 ? ['raw_git_commit attempted', 'confidence 0.58 < 0.72'] : []);
</script>

<div class="space-y-4" data-ags-demo="policy">
	<PlaybackControls {playback} title="Enforcement" />

	<div class="grid gap-4 lg:grid-cols-2">
		<pre
			class="overflow-x-auto rounded-xl border border-violet-400/30 bg-black/40 p-4 font-mono text-[11px] leading-relaxed text-slate-300"
		>{yaml}</pre>

		<div class="space-y-3">
			<h3 class="text-sm font-medium text-violet-200">Live evaluation</h3>
			<ul class="space-y-2 text-xs">
				<li class="rounded-lg border border-white/10 px-3 py-2 text-slate-300">
					Agent action: <code class="text-cyan-200">git commit -m "fix"</code>
				</li>
				{#each violations as v}
					<li class="animate-pulse rounded-lg border border-fuchsia-400/50 bg-fuchsia-500/10 px-3 py-2 text-fuchsia-200">
						Blocked — {v}
					</li>
				{/each}
				{#if frame >= 3}
					<li class="rounded-lg border border-cyan-400/50 bg-cyan-400/10 px-3 py-2 text-cyan-200">
						✓ Routed to tower-gov commit_checkpoint
					</li>
				{/if}
			</ul>
		</div>
	</div>
</div>
