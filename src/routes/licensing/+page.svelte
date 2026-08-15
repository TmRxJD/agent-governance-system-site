<script lang="ts">
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import { href } from '$lib/paths';
	import Button from '$lib/ui/Button.svelte';
</script>

<section class="space-y-6">
	<h1 class="text-3xl font-semibold">Licensing</h1>
	<GlassPanel>
		<ul class="space-y-3 text-slate-300">
			<li><strong class="text-cyan-200">Commercial</strong> — proprietary paid license for production use.</li>
			<li>
				<strong class="text-violet-200">Tower Community</strong> — free for non-commercial Tower ecosystem use
				only.
			</li>
			<li>No redistribution, forks, hosting, or derivative engines.</li>
			<li>Tower SDK freedom does not grant rights to redistribute AGS.</li>
		</ul>
		<div class="mt-6 flex flex-wrap gap-2">
			<Button href={href('/buy/')} variant="neon">Buy commercial</Button>
			<Button href={href('/get/')} variant="ghost">Get AGS</Button>
		</div>
	</GlassPanel>
</section>
