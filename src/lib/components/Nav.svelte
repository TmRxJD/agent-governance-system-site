<script lang="ts">
	import { page } from '$app/state';
	import { href } from '$lib/paths';

	const links = [
		{ href: '/', label: 'Home', external: false },
		{ href: '/docs/', label: 'Docs', external: false },
		{ href: '/get/', label: 'Get AGS', external: false }
	];

	function isActive(path: string) {
		const cur = page.url.pathname.replace(/\/$/, '') || '/';
		if (path === '/') return cur === '/' || cur.endsWith('agent-governance-system-site');
		return cur.includes(path.replace(/\/$/, ''));
	}
</script>

<header class="sticky top-0 z-50 border-b border-white/[0.06] bg-[#06080f]/70 backdrop-blur-xl">
	<div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
		<a href={href('/')} class="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
			<span
				class="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400/30 to-violet-500/30 text-[10px] text-cyan-100"
				>AGS</span
			>
			<span class="hidden sm:inline">Agent Governance</span>
		</a>
		<nav class="flex items-center gap-1">
			{#each links as link (link.href)}
				<a
					href={href(link.href)}
					class={`rounded-full px-3 py-1.5 text-sm transition ${
						isActive(link.href)
							? 'bg-white/10 text-white'
							: 'text-slate-400 hover:text-white'
					}`}>{link.label}</a
				>
			{/each}
		</nav>
	</div>
</header>
