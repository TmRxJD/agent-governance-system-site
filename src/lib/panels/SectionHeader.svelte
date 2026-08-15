<script lang="ts">
	type Props = {
		numeral?: string;
		eyebrow?: string;
		title: string;
		subheading?: string;
		tone?: 'cyan' | 'violet' | 'magenta' | 'muted';
	};

	let { numeral, eyebrow, title, subheading, tone = 'cyan' }: Props = $props();

	const tones = {
		cyan: 'text-cyan-300/90',
		violet: 'text-violet-300/90',
		magenta: 'text-fuchsia-300/90',
		muted: 'text-slate-500'
	};

	const label = $derived(eyebrow ?? (numeral ? `${numeral}` : null));
</script>

<header class="mb-10 max-w-2xl">
	{#if label}
		<p class={`text-sm font-medium tracking-[0.18em] uppercase ${tones[tone]}`}>{label}</p>
	{/if}
	<h2 class="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
	{#if subheading}
		<p class="mt-3 text-base leading-snug text-slate-400">{subheading}</p>
	{/if}
	<div class="mt-6 h-px w-16 bg-gradient-to-r from-cyan-400/50 via-violet-400/40 to-transparent"></div>
</header>
