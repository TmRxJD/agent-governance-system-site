<script lang="ts">
	import PricingHero from '$lib/panels/pricing/PricingHero.svelte';
	import TierCards from '$lib/panels/pricing/TierCards.svelte';
	import FeatureComparison from '$lib/panels/pricing/FeatureComparison.svelte';
	import WhoItsFor from '$lib/panels/pricing/WhoItsFor.svelte';
	import PricingFaq from '$lib/panels/pricing/PricingFaq.svelte';
	import { href } from '$lib/paths';
</script>

<svelte:head>
	<title>AGS Licensing & Pricing</title>
	<meta
		name="description"
		content="AGS pricing: Free, Personal, and Enterprise tiers for agent, repo, and delivery governance."
	/>
</svelte:head>

<div>
	<PricingHero />
	<TierCards />
	<FeatureComparison />
	<WhoItsFor />
	<PricingFaq />

	<footer class="border-t border-white/[0.06] px-4 py-10 sm:px-6 lg:px-8">
		<div class="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-sm text-slate-500">Agent Governance System</p>
			<nav class="flex flex-wrap gap-4 text-sm text-slate-400">
				<a class="hover:text-cyan-300" href={href('/docs/')}>Docs</a>
				<a
					class="hover:text-cyan-300"
					href="https://github.com/TmRxJD/agent-governance-system-site"
					rel="noreferrer"
					target="_blank">GitHub</a
				>
				<a class="hover:text-cyan-300" href={href('/get/')}>Contact</a>
				<a class="hover:text-cyan-300" href={href('/licensing/')}>License</a>
			</nav>
		</div>
	</footer>
</div>
