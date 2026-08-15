<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';

	const logs = [
		'14:02:01 commit_checkpoint ok scope=sdk',
		'14:02:03 confidence_evaluate score=0.81',
		'14:02:05 mcp_call latency=142ms',
		'14:02:08 anomaly: latency spike 890ms',
		'14:02:09 sentinel reflex triggered'
	];

	const metrics = [
		{ label: 'MCP calls/min', value: 42, anomaly: false },
		{ label: 'Avg latency', value: 890, anomaly: true },
		{ label: 'Error rate', value: 0.2, anomaly: false }
	];

	const playback = createPlayback(['Baseline', 'Metric drift', 'Anomaly flagged', 'Reflex alert'], 1);
	onDestroy(() => playback.destroy());

	let frame = $state(0);
	$effect(() => playback.state.subscribe((s) => (frame = s.frame)));
</script>

<div class="space-y-4" data-ags-demo="observability">
	<PlaybackControls {playback} title="Telemetry" />

	<div class="grid gap-4 lg:grid-cols-2">
		<div class="max-h-40 overflow-y-auto rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-[10px] text-slate-400">
			{#each logs as line, i}
				<div
					class="py-0.5 {i >= 3 && frame >= 2 ? 'text-fuchsia-300 animate-pulse' : i >= 4 && frame >= 3 ? 'text-cyan-300' : ''}"
				>
					{line}
				</div>
			{/each}
		</div>

		<div class="space-y-3">
			{#each metrics as m}
				<div class="space-y-1">
					<div class="flex justify-between text-xs text-slate-400">
						<span>{m.label}</span>
						<span class={m.anomaly && frame >= 2 ? 'text-fuchsia-300' : 'text-violet-200'}>
							{m.value}{m.label.includes('rate') ? '%' : m.label.includes('latency') ? 'ms' : ''}
						</span>
					</div>
					<div class="h-2 overflow-hidden rounded-full bg-white/5">
						<div
							class="h-full transition-all duration-700
                {m.anomaly && frame >= 2 ? 'bg-gradient-to-r from-fuchsia-500 to-violet-500' : 'bg-gradient-to-r from-cyan-500 to-violet-500'}"
							style="width: {Math.min(100, m.value / (m.label.includes('latency') ? 10 : 1))}%"
						></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
