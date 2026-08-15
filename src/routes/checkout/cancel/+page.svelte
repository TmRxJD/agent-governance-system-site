<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Button from '$lib/ui/Button.svelte';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import { href } from '$lib/paths';
</script>

<SeoHead title="Checkout canceled · AGS" description="Checkout was canceled. No charge was made." />

<section class="mx-auto max-w-xl space-y-6">
	<h1 class="text-3xl font-semibold text-white">Checkout canceled</h1>
	<GlassPanel>
		<p class="text-slate-300">No payment was completed. You can return to pricing anytime.</p>
		<div class="mt-6 flex flex-wrap gap-2">
			<Button href={href('/checkout/')} variant="neon">Try again</Button>
			<Button href={href('/pricing/')} variant="ghost">Pricing</Button>
		</div>
	</GlassPanel>
</section>
