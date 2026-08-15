<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Button from '$lib/ui/Button.svelte';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import { href } from '$lib/paths';

	let activateHref = $state('');

	onMount(() => {
		const t = page.url.searchParams.get('t');
		const k = page.url.searchParams.get('k');
		if (t) activateHref = href(`/activate/?t=${encodeURIComponent(t)}`);
		else if (k) activateHref = href(`/activate/?k=${encodeURIComponent(k)}`);
		else activateHref = href('/activate/');
	});
</script>

<SeoHead
	title="Checkout success · AGS"
	description="Payment received. Open your activate page and paste the prompt into your AI agent."
/>

<section class="mx-auto max-w-xl space-y-6">
	<h1 class="text-3xl font-semibold text-white">Payment received</h1>
	<GlassPanel>
		<p class="text-slate-300">
			Check your email for the activate link and the paste-to-AI prompt. Prefer the activate page —
			you should not need to hunt for env variables.
		</p>
		<div class="mt-6 flex flex-wrap gap-2">
			{#if activateHref}
				<Button href={activateHref} variant="neon">Open activate</Button>
			{/if}
			<Button href={href('/account/')} variant="ghost">Account</Button>
			<Button href={href('/docs/install-commercial/')} variant="ghost">Install docs</Button>
		</div>
	</GlassPanel>
</section>
