<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		definition: string;
		class?: string;
	};

	let { definition, class: className = '' }: Props = $props();
	let el: HTMLDivElement | undefined = $state();
	let error = $state<string | null>(null);

	onMount(() => {
		let cancelled = false;
		(async () => {
			try {
				const mermaid = (await import('mermaid')).default;
				mermaid.initialize({
					startOnLoad: false,
					theme: 'dark',
					securityLevel: 'loose',
					fontFamily: 'Segoe UI, sans-serif'
				});
				const id = `mmd-${Math.random().toString(36).slice(2)}`;
				const { svg } = await mermaid.render(id, definition);
				if (!cancelled && el) el.innerHTML = svg;
			} catch (e) {
				error = e instanceof Error ? e.message : 'Mermaid render failed';
			}
		})();
		return () => {
			cancelled = true;
		};
	});
</script>

<div
	class={`overflow-x-auto rounded-xl border border-white/10 bg-black/25 p-3 ${className}`}
	data-ags-diagram="mermaid"
	bind:this={el}
>
	{#if error}
		<p class="text-sm text-fuchsia-300">{error}</p>
		<pre class="mt-2 overflow-auto text-xs text-slate-400">{definition}</pre>
	{/if}
</div>
