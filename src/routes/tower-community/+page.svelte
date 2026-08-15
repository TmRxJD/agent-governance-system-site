<script lang="ts">
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { href } from '$lib/paths';
</script>

<section class="space-y-6">
	<h1 class="text-3xl font-semibold">Tower Community</h1>
	<GlassPanel>
		<p class="text-slate-300">
			Tower Community licensing is free for non-commercial use within the Tower ecosystem. It does not permit
			redistribution or derivative governance engines.
		</p>
		<div class="mt-6 flex flex-wrap gap-2">
			<Button href={href('/docs/install-tower/')} variant="primary">Install guide</Button>
			<Button href={href('/licensing/')} variant="ghost">Licensing</Button>
		</div>
	</GlassPanel>
</section>
