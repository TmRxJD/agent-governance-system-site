<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		padding?: string;
		children: Snippet;
	};

	let { class: className = '', padding = 'p-5', children }: Props = $props();
</script>

<div class={`glass rounded-2xl ${padding} ${className}`}>
	{@render children()}
</div>
