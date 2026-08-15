<script lang="ts">
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { href } from '$lib/paths';
</script>

<section class="space-y-6">
	<h1 class="text-3xl font-semibold">Licensing</h1>
	<GlassPanel>
		<ul class="space-y-3 text-slate-300">
			<li>
				<strong class="text-cyan-200">Product tiers</strong> — Free, Personal, and Enterprise. See
				pricing for features and cost.
			</li>
			<li>
				<strong class="text-violet-200">Legal terms</strong> — Proprietary commercial license; separate
				community terms apply where offered.
			</li>
			<li>No redistribution, forks, hosting, or derivative engines without a commercial grant.</li>
		</ul>
		<div class="mt-6 flex flex-wrap gap-2">
			<Button href={href('/pricing/')} variant="neon">Pricing</Button>
			<Button href={href('/get/')} variant="ghost">Get AGS</Button>
		</div>
	</GlassPanel>
</section>
