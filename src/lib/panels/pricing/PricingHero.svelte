<script lang="ts">
	import Button from '$lib/ui/Button.svelte';
	import { href } from '$lib/paths';
</script>

<section class="relative overflow-hidden border-b border-white/[0.06]">
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_-10%,rgba(34,211,238,0.12),transparent_55%),radial-gradient(700px_400px_at_90%_0%,rgba(167,139,250,0.1),transparent_50%)]"
	></div>
	<div class="relative mx-auto max-w-3xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
		<h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
			AGS Licensing & Pricing
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-lg text-slate-400">
			Choose the level of governance that fits your work.
		</p>
		<div class="mt-10 flex flex-wrap justify-center gap-3">
			<Button href="#tiers" variant="neon">Get Started</Button>
			<Button href={href('/get/')} variant="ghost">Contact Sales</Button>
		</div>
	</div>
</section>
