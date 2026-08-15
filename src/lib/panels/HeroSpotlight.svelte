<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import {
		HERO_SPOTLIGHT_INTERVAL_MS,
		HERO_SPOTLIGHT_SLIDES
	} from '$lib/panels/spotlight-slides';

	type Props = {
		/** Rendered between the cycling copy and the prev/next controls (e.g. CTAs). */
		children?: Snippet;
	};

	let { children }: Props = $props();

	const slides = HERO_SPOTLIGHT_SLIDES;
	const n = slides.length;

	let index = $state(0);
	let dir = $state(1);
	let paused = $state(false);

	const current = $derived(slides[index] ?? slides[0]);

	function go(delta: number) {
		dir = delta >= 0 ? 1 : -1;
		index = (index + delta + n) % n;
	}

	function goTo(i: number) {
		if (i === index) return;
		dir = i > index ? 1 : -1;
		index = i;
	}

	onMount(() => {
		if (n < 2) return;

		const id = setInterval(() => {
			if (paused) return;
			if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
			go(1);
		}, HERO_SPOTLIGHT_INTERVAL_MS);

		return () => clearInterval(id);
	});
</script>

<div
	class="mx-auto flex w-full max-w-3xl flex-1 flex-col"
	role="region"
	aria-roledescription="carousel"
	aria-label="AGS highlights"
>
	<div class="relative min-h-[11.5rem] overflow-hidden sm:min-h-[12.5rem]" aria-live="polite">
		{#key current.id}
			<div
				class="hero-spotlight-slide"
				style={`--spotlight-dir: ${dir}`}
				data-ags-animation="hero-spotlight"
			>
				<h1
					class="text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.08]"
				>
					{current.title}
				</h1>
				<p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-200">
					{current.body}
				</p>
			</div>
		{/key}
	</div>

	{#if children}
		{@render children()}
	{/if}

	<div
		class="mt-auto flex items-center justify-center gap-3 pt-16 sm:pt-20"
		role="group"
		aria-label="Spotlight navigation"
		onmouseenter={() => (paused = true)}
		onmouseleave={() => (paused = false)}
		onfocusin={() => (paused = true)}
		onfocusout={() => (paused = false)}
	>
		<button
			type="button"
			class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white/90 backdrop-blur-sm transition hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
			aria-label="Previous highlight"
			onclick={() => go(-1)}
		>
			<span aria-hidden="true" class="text-lg leading-none">‹</span>
		</button>

		<div class="flex items-center gap-2" role="tablist" aria-label="Hero highlights">
			{#each slides as slide, i (slide.id)}
				<button
					type="button"
					role="tab"
					aria-selected={i === index}
					aria-label={`Show highlight ${i + 1}: ${slide.title}`}
					class={`h-2 rounded-full transition-all ${
						i === index
							? 'w-6 bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.55)]'
							: 'w-2 bg-white/35 hover:bg-white/55'
					}`}
					onclick={() => goTo(i)}
				></button>
			{/each}
		</div>

		<button
			type="button"
			class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white/90 backdrop-blur-sm transition hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
			aria-label="Next highlight"
			onclick={() => go(1)}
		>
			<span aria-hidden="true" class="text-lg leading-none">›</span>
		</button>
	</div>
</div>

<style>
	.hero-spotlight-slide {
		animation: hero-spotlight-in 480ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	@keyframes hero-spotlight-in {
		from {
			opacity: 0;
			transform: translateX(calc(var(--spotlight-dir, 1) * 1.5rem));
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-spotlight-slide {
			animation: none;
		}
	}
</style>
