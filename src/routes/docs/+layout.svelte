<script lang="ts">
	import type { Snippet } from 'svelte';
	import { href } from '$lib/paths';

	let { children }: { children: Snippet } = $props();
</script>

<article class="prose prose-ags prose-invert max-w-3xl">
	<p class="not-prose mb-6 text-sm">
		<a class="text-cyan-300 hover:underline" href={href('/docs/')}>← Docs</a>
	</p>
	{@render children()}
</article>
