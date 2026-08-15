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

<header class="mb-10 max-w-2xl">
	<p class={`text-sm font-medium ${tones[tone]}`}>{label}</p>
	{#if numeral && subheading}
		<h2 class="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{subheading}</h2>
	{:else}
		<h2 class="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
		{#if subheading}
			<p class="mt-2 text-base text-slate-400">{subheading}</p>
		{/if}
	{/if}
	<div class="mt-6 h-px w-12 bg-gradient-to-r from-white/30 to-transparent"></div>
</header>
