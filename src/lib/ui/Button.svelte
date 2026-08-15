<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		variant?: 'primary' | 'ghost' | 'neon';
		children: Snippet;
		class?: string;
	};

	let { href, variant = 'primary', children, class: className = '' }: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400';

	const variants: Record<NonNullable<Props['variant']>, string> = {
		primary:
			'bg-cyan-400/15 text-cyan-200 border border-cyan-400/40 hover:bg-cyan-400/25 hover:border-cyan-300/60',
		ghost: 'text-slate-200 border border-white/10 hover:border-violet-400/40 hover:bg-white/5',
		neon: 'bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-fuchsia-500/30 text-white border border-fuchsia-400/30 hover:brightness-110'
	};
</script>

<a {href} class={`${base} ${variants[variant]} ${className}`}>
	{@render children()}
</a>
