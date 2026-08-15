<script lang="ts">
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { href } from '$lib/paths';
</script>

<section class="space-y-6">
	<h1 class="text-3xl font-semibold">How to buy</h1>
	<GlassPanel>
		<ol class="list-decimal space-y-2 pl-5 text-slate-300">
			<li>Contact for commercial licensing (payment onboarding placeholders — Stripe/Lemon — in the private repo).</li>
			<li>Receive GitHub access + Packages token.</li>
			<li>Install <code class="text-cyan-200">@tmrxjd/agent-governance-system</code>.</li>
		</ol>
		<div class="mt-6">
			<Button href={href('/docs/install-commercial/')} variant="primary">Commercial install docs</Button>
		</div>
	</GlassPanel>
</section>
