<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$lib/animations/scroll-reveal';

	type Line = { text: string; kind?: 'cmd' | 'out' | 'err' | 'ok' };

	type Props = {
		frames: Line[][];
		title?: string;
		loopMs?: number;
	};

	let { frames, title = 'terminal', loopMs = 2200 }: Props = $props();
	let frame = $state(0);
	const lines = $derived(frames[frame] ?? []);

	onMount(() => {
		if (prefersReducedMotion() || frames.length < 2) return;
		const id = setInterval(() => {
			frame = (frame + 1) % frames.length;
		}, loopMs);
		return () => clearInterval(id);
	});

	const color = (kind?: Line['kind']) =>
		kind === 'err'
			? 'text-fuchsia-300'
			: kind === 'ok'
				? 'text-cyan-300'
				: kind === 'cmd'
					? 'text-violet-200'
					: 'text-slate-400';
</script>

<div
	class="overflow-hidden rounded-2xl border border-white/10 bg-black/70 font-mono text-sm shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
	data-ags-animation="terminal"
	data-ags-diagram="true"
	data-ags-interaction="terminal"
>
	<div class="flex items-center gap-2 border-b border-white/10 px-4 py-2">
		<span class="h-2.5 w-2.5 rounded-full bg-fuchsia-500/70"></span>
		<span class="h-2.5 w-2.5 rounded-full bg-violet-400/70"></span>
		<span class="h-2.5 w-2.5 rounded-full bg-cyan-400/70"></span>
		<span class="ml-2 text-xs text-slate-500">{title}</span>
	</div>
	<div class="min-h-[11rem] space-y-1.5 p-4">
		{#each lines as line, i (i + line.text)}
			<p class={color(line.kind)}>
				{#if line.kind === 'cmd'}<span class="text-slate-600 select-none">$ </span>{/if}{line.text}
			</p>
		{/each}
		<span class="inline-block h-4 w-2 translate-y-0.5 bg-cyan-300/80 ags-pulse"></span>
	</div>
</div>
