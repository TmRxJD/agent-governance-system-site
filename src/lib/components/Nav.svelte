<script lang="ts">
	import { page } from '$app/state';
	import { href } from '$lib/paths';

	const links = [
		{ path: '/#commit-gate', label: 'How it works', match: 'home' },
		{ path: '/#engines', label: 'Engines', match: 'engines' },
		{ path: '/docs/', label: 'Docs', match: '/docs' },
		{ path: '/get/', label: 'Get AGS', match: '/get' }
	];

	function active(match: string) {
		const path = page.url.pathname;
		if (match === 'home') return path === '/' || path.endsWith('/agent-governance-system-site/');
		if (match === 'engines') return path.includes('/showcase');
		return path.includes(match);
	}
</script>

<header class="sticky top-0 z-50 border-b border-white/10 bg-[#06080f]/75 backdrop-blur-xl">
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
		<a href={href('/')} class="flex items-center gap-2.5 font-semibold tracking-tight">
			<span
				class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/35 bg-cyan-400/10 text-[10px] font-bold tracking-wider text-cyan-200"
				>AGS</span
			>
			<span class="hidden text-sm text-slate-200 sm:inline">Agent Governance System</span>
		</a>
		<nav class="flex flex-wrap items-center gap-1">
			{#each links as link (link.path)}
				<a
					href={link.path.startsWith('/#') ? link.path : href(link.path)}
					class={`rounded-lg px-3 py-1.5 text-sm transition ${
						active(link.match)
							? 'bg-white/10 text-white'
							: 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
					}`}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</div>
</header>
