<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import '../lib/styles/app.css';

	let { children } = $props();
	const isHome = $derived(
		page.url.pathname === '/' || page.url.pathname.endsWith('/agent-governance-system-site/')
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="description"
		content="AGS turns chaotic AI-assisted development into governed engineering: agent discipline, repo integrity, and safe delivery."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Nav />
	<main class={`mx-auto w-full flex-1 ${isHome ? 'max-w-none' : 'max-w-6xl px-4 py-8'}`}>
		{#key page.url.pathname}
			<div in:fade={{ duration: 160 }}>
				{@render children()}
			</div>
		{/key}
	</main>
	{#if !isHome}
		<footer class="border-t border-white/10 py-8 text-center text-sm text-slate-600">
			AGS · public showcase · dual license
		</footer>
	{/if}
</div>
