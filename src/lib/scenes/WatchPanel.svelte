<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$lib/animations/scroll-reveal';

	type Step = { label: string; detail: string; tone?: 'ok' | 'warn' | 'idle' };

	type Props = {
		steps: Step[];
		loopMs?: number;
		caption?: string;
	};

	let { steps, loopMs = 1600, caption }: Props = $props();
	let active = $state(0);

	onMount(() => {
		if (prefersReducedMotion() || steps.length < 2) return;
		const id = setInterval(() => {
			active = (active + 1) % steps.length;
		}, loopMs);
		return () => clearInterval(id);
	});
</script>

<div
	class="overflow-hidden rounded-2xl border border-white/10 bg-[#080d18]/90 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
	data-ags-animation="watch"
	data-ags-diagram="true"
>
	{#if caption}
		<div class="border-b border-white/10 px-4 py-2 text-xs tracking-wide text-slate-500 uppercase">
			{caption}
		</div>
	{/if}
	<div class="space-y-0 p-2">
		{#each steps as step, i (step.label)}
			{@const on = i === active}
			{@const tone =
				step.tone === 'ok'
					? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-100'
					: step.tone === 'warn'
						? 'border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-100'
						: 'border-transparent text-slate-400'}
			<div
				class={`rounded-xl border px-4 py-3 transition duration-500 ${on ? tone : 'opacity-45'}`}
				data-ags-interaction="step"
			>
				<div class="flex items-center justify-between gap-3">
					<span class="font-mono text-sm">{step.label}</span>
					{#if on}
						<span class="h-1.5 w-1.5 rounded-full bg-current ags-pulse"></span>
					{/if}
				</div>
				{#if on}
					<p class="mt-1 text-sm text-slate-300">{step.detail}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>
