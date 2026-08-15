<script lang="ts">
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { href } from '$lib/paths';
</script>

<SeoHead
	title="Privacy · AGS"
	description="How the Agent Governance System public showcase site handles information."
/>

<section class="mx-auto max-w-3xl space-y-6">
	<h1 class="text-3xl font-semibold text-white">Privacy</h1>
	<GlassPanel>
		<div class="space-y-4 text-sm leading-relaxed text-slate-300">
			<p>
				This page covers the <strong class="text-slate-200">public showcase website</strong> (docs,
				simulations, and pricing pages). It does not replace the privacy practices of any separate
				product, registry, or payment provider once those ship.
			</p>
			<p>
				<strong class="text-cyan-200">What this site collects.</strong> The static site itself does not
				require an account. Hosting (for example GitHub Pages) and your browser may generate standard
				access logs (IP, user agent, referrer, requested URL). We do not intentionally collect
				analytics profiles or sell visitor data.
			</p>
			<p>
				<strong class="text-cyan-200">Local product use.</strong> AGS is designed to run on your machine
				against your repositories. Day-to-day governance does not upload your source code to this
				website.
			</p>
			<p>
				<strong class="text-cyan-200">Third parties.</strong> Links to GitHub, package registries, or
				future checkout providers are governed by those services’ policies. Review them before
				authenticating or paying.
			</p>
			<p>
				<strong class="text-cyan-200">Contact.</strong> For privacy questions about this showcase,
				open an issue on the
				<a
					class="text-cyan-300 hover:text-cyan-200"
					href="https://github.com/TmRxJD/agent-governance-system-site"
					rel="noreferrer"
					target="_blank">site repository</a
				>
				or see <a class="text-cyan-300 hover:text-cyan-200" href={href('/terms/')}>Terms</a>.
			</p>
		</div>
	</GlassPanel>
</section>
