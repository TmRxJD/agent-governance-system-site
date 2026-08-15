<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import { page } from '$app/state';
	import { fade, fly } from 'svelte/transition';
	import '../lib/styles/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="description"
		content="Deterministic governance for agents, MCP, and repos. Staging, Semantic, Pointer, Sentinel, Versioning, Deployment."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Nav />
	<main class="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
		{#key page.url.pathname}
			<div in:fly={{ y: 8, duration: 320 }} out:fade={{ duration: 100 }}>
				{@render children()}
			</div>
		{/key}
	</main>
	<footer class="border-t border-white/10 py-10 text-center text-sm text-slate-600">
		AGS · public showcase · dual license · no engine source here
	</footer>
</div>
