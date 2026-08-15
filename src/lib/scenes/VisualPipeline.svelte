<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$lib/animations/scroll-reveal';

	const nodes = [
		{ id: 'build', label: 'Build', x: 40 },
		{ id: 'test', label: 'Test', x: 140 },
		{ id: 'stage', label: 'Staging', x: 240 },
		{ id: 'prod', label: 'Production', x: 340 }
	];

	let active = $state(0);
	let playing = $state(false);

	function wait(ms: number) {
		return new Promise((r) => setTimeout(r, ms));
	}

	async function run() {
		if (playing) return;
		playing = true;
		for (let i = 0; i < nodes.length; i++) {
			active = i;
			await wait(prefersReducedMotion() ? 200 : 900);
		}
		playing = false;
	}

	onMount(() => {
		const t = setTimeout(run, 400);
		return () => clearTimeout(t);
	});
</script>

<div
	class="overflow-hidden rounded-2xl border border-white/10 bg-[#070b14] p-5 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
	data-ags-animation="pipeline"
	data-ags-diagram="true"
	data-ags-interaction="replay"
>
	<div class="mb-4 flex items-center justify-between">
		<p class="text-sm text-slate-300">
			A release moves forward only when the current step is green.
		</p>
		<button
			type="button"
			class="rounded-md border border-white/10 px-2.5 py-1 text-xs text-slate-300 hover:border-cyan-400/40"
			onclick={run}
			disabled={playing}>Replay</button
		>
	</div>

	<svg viewBox="0 0 400 120" class="w-full" role="img" aria-label="Release path">
		{#each nodes as node, i}
			{#if i < nodes.length - 1}
				<line
					x1={node.x + 28}
					y1="52"
					x2={nodes[i + 1].x - 28}
					y2="52"
					stroke={active > i ? '#22d3ee' : '#1e293b'}
					stroke-width="3"
					class={active === i ? 'ags-flow' : ''}
				/>
			{/if}
		{/each}
		{#each nodes as node, i}
			{@const on = active >= i}
			{@const now = active === i}
			<g>
				<circle
					cx={node.x}
					cy="52"
					r={now ? 22 : 18}
					fill={on ? 'rgba(34,211,238,0.2)' : '#0f172a'}
					stroke={on ? '#22d3ee' : '#334155'}
					stroke-width="2"
					class={now ? 'ags-pulse' : ''}
				/>
				{#if on}
					<path
						d={`M ${node.x - 6} 52 l 4 4 l 8 -10`}
						fill="none"
						stroke="#a5f3fc"
						stroke-width="2.5"
						stroke-linecap="round"
					/>
				{/if}
				<text
					x={node.x}
					y="92"
					text-anchor="middle"
					fill={on ? '#e2e8f0' : '#64748b'}
					font-size="12">{node.label}</text
				>
			</g>
		{/each}
	</svg>

	<p class="mt-2 text-center text-xs text-slate-500">
		{nodes[Math.min(active, nodes.length - 1)].label}
		{#if active === nodes.length - 1}
			· live
		{/if}
	</p>
</div>
