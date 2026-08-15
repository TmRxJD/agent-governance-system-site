<script lang="ts">
	type Props = {
		tone?: 'cyan' | 'violet' | 'magenta' | 'muted';
		children?: import('svelte').Snippet;
		label?: string;
	};

	let { tone = 'cyan', children, label }: Props = $props();

	const tones = {
		cyan: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200',
		violet: 'border-violet-400/40 bg-violet-400/10 text-violet-200',
		magenta: 'border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-200',
		muted: 'border-white/15 bg-white/5 text-slate-300'
	};
</script>

<span
	class={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide ${tones[tone]}`}
>
	{#if children}
		{@render children()}
	{:else}
		{label}
	{/if}
</span>
