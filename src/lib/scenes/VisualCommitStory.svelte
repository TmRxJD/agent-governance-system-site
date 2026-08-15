<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { prefersReducedMotion } from '$lib/animations/scroll-reveal';

	type Phase = 'idle' | 'typing' | 'blocked' | 'fixing' | 'ok';

	let phase = $state<Phase>('idle');
	let typed = $state('');
	let running = $state(false);

	const badCmd = 'git commit -m "fix stuff"';
	const goodCmd = 'ags checkpoint --scope single-change -m "fix paths helper"';

	function sleep(ms: number) {
		return new Promise((r) => setTimeout(r, ms));
	}

	async function typeText(text: string, speed = 28) {
		typed = '';
		for (const ch of text) {
			typed += ch;
			await sleep(prefersReducedMotion() ? 0 : speed);
		}
	}

	async function play() {
		if (running) return;
		running = true;
		phase = 'typing';
		await typeText(badCmd);
		phase = 'blocked';
		await sleep(prefersReducedMotion() ? 400 : 1600);
		phase = 'fixing';
		await typeText(goodCmd, 22);
		phase = 'ok';
		running = false;
	}

	onMount(() => {
		const t = setTimeout(() => play(), prefersReducedMotion() ? 200 : 700);
		return () => clearTimeout(t);
	});
</script>

<div
	class="overflow-hidden rounded-2xl border border-white/10 bg-[#05070e] shadow-[0_40px_100px_rgba(0,0,0,0.55)]"
	data-ags-animation="commit-story"
	data-ags-diagram="true"
	data-ags-interaction="replay"
>
	<div class="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
		<div class="flex items-center gap-2">
			<span class="h-2.5 w-2.5 rounded-full bg-fuchsia-500/80"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-violet-400/80"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-cyan-400/80"></span>
			<span class="ml-2 text-xs text-slate-500">agent · your-repo</span>
		</div>
		<button
			type="button"
			class="rounded-md border border-white/10 px-2.5 py-1 text-xs text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
			onclick={() => play()}
			disabled={running}
		>
			{running ? 'Running…' : 'Replay'}
		</button>
	</div>

	<div class="min-h-[15rem] space-y-3 p-5 font-mono text-sm">
		<p class="text-violet-200">
			<span class="text-slate-600 select-none">$ </span>{typed}<span
				class="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyan-300/90"
				class:ags-pulse={phase === 'typing' || phase === 'fixing'}
			></span>
		</p>

		{#if phase === 'blocked'}
			<div
				class="rounded-xl border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-3 text-fuchsia-100"
				in:fly={{ y: 8, duration: 280 }}
			>
				<p class="font-sans text-sm font-medium">Commit blocked</p>
				<p class="mt-1 font-sans text-xs text-fuchsia-200/80">
					Missing scope. Incomplete message. Nothing written to history.
				</p>
			</div>
		{/if}

		{#if phase === 'ok'}
			<div
				class="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-3 text-cyan-50"
				in:fly={{ y: 8, duration: 280 }}
			>
				<p class="font-sans text-sm font-medium">Checkpoint accepted</p>
				<p class="mt-1 font-sans text-xs text-cyan-100/80">
					One scope. Clear status. Ready for review.
				</p>
			</div>
		{/if}
	</div>

	{#if phase === 'blocked' || phase === 'ok'}
		<div class="border-t border-white/10 px-5 py-3" transition:fade={{ duration: 200 }}>
			<div class="flex items-center gap-3">
				<div class="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
					<div
						class={`h-full rounded-full transition-all duration-700 ${
							phase === 'ok' ? 'w-full bg-cyan-400' : 'w-1/3 bg-fuchsia-400'
						}`}
					></div>
				</div>
				<span class="text-xs text-slate-500">{phase === 'ok' ? 'Allowed' : 'Stopped'}</span>
			</div>
		</div>
	{/if}
</div>
