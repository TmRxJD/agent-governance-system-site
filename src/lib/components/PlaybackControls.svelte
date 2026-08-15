<script lang="ts">
	import type { PlaybackController } from '$lib/animations/playback';
	import { onMount } from 'svelte';

	type Props = {
		playback: PlaybackController;
		title?: string;
	};

	let { playback, title = 'Playback' }: Props = $props();

	let snap = $state({
		playing: false,
		frame: 0,
		totalFrames: 1,
		label: 'Idle'
	});

	onMount(() => {
		const unsub = playback.state.subscribe((v) => {
			snap = v;
		});
		return unsub;
	});
</script>

<div
	class="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2"
	data-ags-animation="playback"
>
	<span class="text-xs font-medium tracking-wide text-slate-400 uppercase">{title}</span>
	<button
		type="button"
		class="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100 hover:bg-cyan-400/20"
		onclick={() => playback.toggle()}
	>
		{snap.playing ? 'Pause' : 'Play'}
	</button>
	<label class="flex min-w-[12rem] flex-1 items-center gap-2 text-sm text-slate-300">
		<span class="sr-only">Scrub</span>
		<input
			class="w-full accent-cyan-400"
			type="range"
			min="0"
			max={Math.max(0, snap.totalFrames - 1)}
			value={snap.frame}
			oninput={(e) => playback.scrub(Number((e.currentTarget as HTMLInputElement).value))}
		/>
	</label>
	<span class="font-mono text-xs text-violet-200">{snap.label}</span>
</div>
