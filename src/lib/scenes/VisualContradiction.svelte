<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { prefersReducedMotion } from '$lib/animations/scroll-reveal';

	let clash = $state(false);
	let playing = $state(false);

	async function run() {
		if (playing) return;
		playing = true;
		clash = false;
		await wait(prefersReducedMotion() ? 150 : 700);
		clash = true;
		await wait(prefersReducedMotion() ? 400 : 1800);
		playing = false;
	}

	function wait(ms: number) {
		return new Promise((r) => setTimeout(r, ms));
	}

	onMount(() => {
		const t = setTimeout(run, 450);
		return () => clearTimeout(t);
	});
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070b14] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
	data-ags-animation="contradiction"
	data-ags-diagram="true"
	data-ags-interaction="replay"
>
	<div class="mb-6 flex items-center justify-between">
		<p class="text-sm text-slate-300">Two claims the agent made in the same change.</p>
		<button
			type="button"
			class="rounded-md border border-white/10 px-2.5 py-1 text-xs text-slate-300 hover:border-fuchsia-400/40"
			onclick={run}
			disabled={playing}>Replay</button
		>
	</div>

	<div class="grid gap-4 sm:grid-cols-2">
		<div
			class={`rounded-xl border p-4 transition duration-500 ${
				clash ? 'border-fuchsia-400/50 bg-fuchsia-500/10' : 'border-white/10 bg-white/[0.03]'
			}`}
		>
			<p class="text-xs tracking-wide text-slate-500 uppercase">Claim A</p>
			<p class="mt-2 text-lg font-medium text-white">“This feature is done.”</p>
		</div>
		<div
			class={`rounded-xl border p-4 transition duration-500 ${
				clash ? 'border-fuchsia-400/50 bg-fuchsia-500/10' : 'border-white/10 bg-white/[0.03]'
			}`}
		>
			<p class="text-xs tracking-wide text-slate-500 uppercase">Claim B</p>
			<p class="mt-2 text-lg font-medium text-white">“No human approval yet.”</p>
		</div>
	</div>

	{#if clash}
		<div
			class="mt-5 flex items-center justify-center"
			transition:scale={{ duration: 280, start: 0.9 }}
		>
			<div
				class="rounded-full border border-fuchsia-400/50 bg-fuchsia-500/20 px-4 py-2 text-sm font-medium text-fuchsia-100 ags-pulse"
			>
				Conflict — change held
			</div>
		</div>
	{/if}
</div>
