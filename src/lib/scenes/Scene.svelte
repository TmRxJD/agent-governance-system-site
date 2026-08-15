<script lang="ts">
	import type { Snippet } from 'svelte';
	import { scrollReveal } from '$lib/animations/scroll-reveal';

	type Props = {
		eyebrow?: string;
		title: string;
		lede?: string;
		anchor?: string;
		children: Snippet;
		aside?: Snippet;
	};

	let { eyebrow, title, lede, anchor, children, aside }: Props = $props();
</script>

<section
	id={anchor}
	class="scroll-mt-24 border-t border-white/5 py-20 sm:py-28"
	use:scrollReveal
	data-ags-scene={anchor ?? title}
>
	<div class="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center lg:gap-16">
		<div>
			{#if eyebrow}
				<p class="mb-3 text-xs font-semibold tracking-[0.22em] text-cyan-300/90 uppercase">{eyebrow}</p>
			{/if}
			<h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
			{#if lede}
				<p class="mt-4 max-w-md text-base leading-relaxed text-slate-400">{lede}</p>
			{/if}
			{#if aside}
				<div class="mt-8">
					{@render aside()}
				</div>
			{/if}
		</div>
		<div class="min-w-0">
			{@render children()}
		</div>
	</div>
</section>
