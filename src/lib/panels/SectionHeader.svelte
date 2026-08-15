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

	const label = $derived(eyebrow ?? (numeral ? `${numeral} · ${title}` : title));
</script>

<header class="mb-8 max-w-3xl">
	<p class={`text-sm font-medium ${tones[tone]}`}>{label}</p>
	{#if numeral}
		<h2 class="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{subheading}</h2>
	{:else}
		<h2 class="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
		{#if subheading}
			<p class="mt-2 text-base text-slate-400">{subheading}</p>
		{/if}
	{/if}
	<div class="mt-5 h-px w-16 bg-white/15"></div>
</header>
