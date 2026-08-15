<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import { href } from '$lib/paths';
	import { base } from '$app/paths';
	import '../lib/styles/app.css';

	let { children } = $props();

	const isWide = $derived(
		page.url.pathname === '/' ||
			page.url.pathname.endsWith('/agent-governance-system-site/') ||
			page.url.pathname.includes('/pricing') ||
			page.url.pathname.includes('/checkout') ||
			page.url.pathname.includes('/account') ||
			page.url.pathname.includes('/docs')
	);
	const isDocs = $derived(page.url.pathname.includes('/docs'));
</script>

<svelte:head>
	<link rel="icon" href={`${base}/media/ags-logo.png`} type="image/png" />
	<link rel="alternate icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Nav />
	<main class={`mx-auto w-full flex-1 ${isWide ? 'max-w-none' : 'max-w-6xl px-4 py-8'}`}>
		{#key page.url.pathname}
			<div in:fade={{ duration: 160 }}>
				{@render children()}
			</div>
		{/key}
	</main>
	{#if !isWide}
		<footer class="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-600">
			<a class="hover:text-slate-400" href={href('/licensing/')}>Licensing</a>
			<span class="mx-2">·</span>
			<a class="hover:text-slate-400" href={href('/privacy/')}>Privacy</a>
			<span class="mx-2">·</span>
			<a class="hover:text-slate-400" href={href('/terms/')}>Terms</a>
		</footer>
	{:else if isDocs}
		<footer class="border-t border-white/[0.06] px-4 py-8 text-center text-sm text-slate-600">
			AGS documentation
		</footer>
	{/if}
</div>
