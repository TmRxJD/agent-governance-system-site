<script lang="ts">
	import { href } from '$lib/paths';
	import Button from '$lib/ui/Button.svelte';
</script>

<!-- Hero unused on home for now; keep minimal export for other pages if needed -->
<section class="px-4 py-16 text-center">
	<h1 class="text-3xl font-semibold text-white">Agent Governance System</h1>
	<div class="mt-6 flex justify-center gap-3">
		<Button href={href('/')} variant="neon">Home</Button>
	</div>
</section>
