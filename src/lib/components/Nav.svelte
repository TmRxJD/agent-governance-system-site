<script lang="ts">
	import { page } from '$app/state';
	import { href } from '$lib/paths';

	const links = [
		{ href: '/#discipline', label: 'Product', hash: true },
		{ href: '/pricing/', label: 'Pricing', hash: false },
		{ href: '/docs/', label: 'Docs', hash: false },
		{ href: '/get/', label: 'Get AGS', hash: false }
	];

	function active(path: string, hash: boolean) {
		if (hash)
			return page.url.pathname === '/' || page.url.pathname.endsWith('agent-governance-system-site/');
		return page.url.pathname.includes(path.replace(/\/$/, ''));
	}
</script>

<header class="sticky top-0 z-50 border-b border-white/[0.06] bg-[#06080f]/75 backdrop-blur-xl">
	<div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<a href={href('/')} class="flex items-center gap-2 text-sm font-semibold text-white">
			<span
				class="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400/25 to-violet-500/25 text-[10px] text-cyan-100"
				>AGS</span
			>
			<span class="hidden sm:inline">Agent Governance</span>
		</a>
		<nav class="flex items-center gap-1">
			{#each links as link (link.href)}
				<a
					href={link.hash ? link.href : href(link.href)}
					class={`rounded-full px-3 py-1.5 text-sm transition ${
						active(link.href, link.hash)
							? 'bg-white/10 text-white'
							: 'text-slate-400 hover:text-white'
					}`}>{link.label}</a
				>
			{/each}
		</nav>
	</div>
</header>
