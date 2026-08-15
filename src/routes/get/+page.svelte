<script lang="ts">
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { href } from '$lib/paths';
</script>

<section class="space-y-8 py-10">
	<div class="max-w-xl">
		<h1 class="text-3xl font-semibold tracking-tight">Get AGS</h1>
		<p class="mt-3 text-slate-400">
			Choose a tier, then install the private package from GitHub Packages.
		</p>
	</div>
	<div class="grid gap-4 md:grid-cols-2">
		<GlassPanel>
			<h2 class="text-lg font-semibold text-cyan-200">Pricing</h2>
			<p class="mt-2 text-sm text-slate-400">Free, Personal, and Enterprise — features and cost.</p>
			<div class="mt-5 flex flex-wrap gap-2">
				<Button href={href('/pricing/')} variant="neon">View pricing</Button>
				<Button href={href('/docs/install-commercial/')} variant="ghost">Install</Button>
			</div>
		</GlassPanel>
		<GlassPanel>
			<h2 class="text-lg font-semibold text-violet-200">Sales & access</h2>
			<p class="mt-2 text-sm text-slate-400">Invoicing, seats, and package access.</p>
			<div class="mt-5 flex flex-wrap gap-2">
				<Button href={href('/docs/')} variant="primary">Docs</Button>
				<Button href={href('/licensing/')} variant="ghost">License terms</Button>
			</div>
		</GlassPanel>
	</div>
</section>
