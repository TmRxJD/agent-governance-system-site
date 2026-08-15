<script lang="ts">
	import PricingHero from '$lib/panels/pricing/PricingHero.svelte';
	import TierCards from '$lib/panels/pricing/TierCards.svelte';
	import TokenEfficiency from '$lib/panels/pricing/TokenEfficiency.svelte';
	import FeatureComparison from '$lib/panels/pricing/FeatureComparison.svelte';
	import PricingFaq from '$lib/panels/pricing/PricingFaq.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { href } from '$lib/paths';
</script>

<SeoHead
	title="AGS Licensing & Pricing"
	description="AGS pricing for Free, Personal, and Enterprise — keep coding agents useful without wasting your AI budget."
	image="/media/pricing-hero.jpg"
/>

<div>
	<PricingHero />
	<TierCards />
	<TokenEfficiency />
	<FeatureComparison />
	<PricingFaq />

	<footer class="border-t border-white/[0.06] px-4 py-10 sm:px-6 lg:px-8">
		<div class="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-sm text-slate-500">Agent Governance System</p>
			<nav class="flex flex-wrap gap-4 text-sm text-slate-400">
				<a class="hover:text-cyan-300" href={href('/docs/')}>Docs</a>
				<a class="hover:text-cyan-300" href={href('/checkout/')}>Checkout</a>
				<a class="hover:text-cyan-300" href={href('/account/')}>Account</a>
				<a class="hover:text-cyan-300" href={href('/licensing/')}>License</a>
				<a class="hover:text-cyan-300" href={href('/privacy/')}>Privacy</a>
				<a class="hover:text-cyan-300" href={href('/terms/')}>Terms</a>
				<a
					class="hover:text-cyan-300"
					href="https://github.com/TmRxJD/agent-governance-system-site"
					rel="noreferrer"
					target="_blank">GitHub</a
				>
			</nav>
		</div>
	</footer>
</div>
