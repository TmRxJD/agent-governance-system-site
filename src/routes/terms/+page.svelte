<script lang="ts">
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { href } from '$lib/paths';
</script>

<SeoHead
	title="Terms · AGS"
	description="Terms of use for the Agent Governance System public showcase website."
/>

<section class="mx-auto max-w-3xl space-y-6">
	<h1 class="text-3xl font-semibold text-white">Terms of use</h1>
	<GlassPanel>
		<div class="space-y-4 text-sm leading-relaxed text-slate-300">
			<p>
				These terms apply to the <strong class="text-slate-200">public showcase website</strong> only —
				marketing pages, documentation, and interactive simulations. Package rights for
				<code class="text-slate-200">@tmrxjd/agent-governance-system</code> are governed by the
				license files shipped with that package and summarized on
				<a class="text-cyan-300 hover:text-cyan-200" href={href('/licensing/')}>Licensing</a>.
			</p>
			<p>
				<strong class="text-cyan-200">Permitted use.</strong> You may browse the site, share links, and
				use the public docs and simulations to evaluate AGS. Simulations are illustrative; they are not
				a substitute for running the product in your own environment.
			</p>
			<p>
				<strong class="text-cyan-200">Prohibited use.</strong> Do not scrape the site to reconstruct
				proprietary engine source, misrepresent affiliation, or use site content to claim rights you do
				not have under the package licenses.
			</p>
			<p>
				<strong class="text-cyan-200">No warranty.</strong> The showcase is provided as-is, without
				warranties of accuracy, uptime, or fitness for a particular purpose. Pricing and plan details
				may change before checkout launches.
			</p>
			<p>
				<strong class="text-cyan-200">Related.</strong>
				<a class="text-cyan-300 hover:text-cyan-200" href={href('/privacy/')}>Privacy</a>
				·
				<a class="text-cyan-300 hover:text-cyan-200" href={href('/licensing/')}>Licensing</a>
				·
				<a class="text-cyan-300 hover:text-cyan-200" href={href('/pricing/')}>Pricing</a>
			</p>
		</div>
	</GlassPanel>
</section>
