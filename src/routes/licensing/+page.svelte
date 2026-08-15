<script lang="ts">
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import Button from '$lib/ui/Button.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { href } from '$lib/paths';
</script>

<SeoHead
	title="Licensing · AGS"
	description="AGS product tiers, proprietary license, and how license keys unlock capabilities."
/>

<section class="mx-auto max-w-3xl space-y-6">
	<h1 class="text-3xl font-semibold text-white">Licensing</h1>

	<GlassPanel>
		<ul class="space-y-4 text-slate-300">
			<li>
				<strong class="text-cyan-200">Product tiers</strong> — Free, Personal, and Enterprise control
				which runtime capabilities a license key unlocks. See
				<a class="text-cyan-300 hover:text-cyan-200" href={href('/pricing/')}>Pricing</a> and
				<a class="text-cyan-300 hover:text-cyan-200" href={href('/checkout/')}>Checkout</a>.
			</li>
			<li>
				<strong class="text-violet-200">Software license</strong> — The
				<code class="text-slate-200">@tmrxjd/agent-governance-system</code> package is proprietary.
				Use follows the LICENSE shipped with the package. No redistribution, public forks, hosting as
				a service, or derivative governance engines without an explicit commercial grant.
			</li>
			<li>
				<strong class="text-emerald-200">Keys & entitlements</strong> — Paid plans issue a signed
				<code class="text-slate-200">AGS_LICENSE_KEY</code>. Online authorize (Appwrite function)
				confirms the key is active; the SDK maps the tier to feature flags.
			</li>
			<li>
				<strong class="text-amber-200">This website</strong> — Showcase use is covered by
				<a class="text-cyan-300 hover:text-cyan-200" href={href('/terms/')}>Terms</a> and
				<a class="text-cyan-300 hover:text-cyan-200" href={href('/privacy/')}>Privacy</a>.
			</li>
		</ul>

		<div class="mt-6 flex flex-wrap gap-2">
			<Button href={href('/pricing/')} variant="neon">Pricing</Button>
			<Button href={href('/checkout/')} variant="primary">Checkout</Button>
			<Button href={href('/account/')} variant="ghost">Account</Button>
			<Button href={href('/docs/licensing/')} variant="ghost">Docs: licensing</Button>
		</div>
	</GlassPanel>
</section>
