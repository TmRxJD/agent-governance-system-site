<script lang="ts">
	import ForceGraph, { type GraphLink, type GraphNode } from '$lib/graphs/ForceGraph.svelte';

	const nodes: GraphNode[] = [
		{ id: 'agent', label: 'cursor-agent', group: 'ok' },
		{ id: 'user', label: 'jdion', group: 'ok' },
		{ id: 'env', label: 'prod-ags', group: 'ok' },
		{ id: 'role', label: 'maintainer', group: 'ok' },
		{ id: 'token', label: 'mcp-token', group: 'warn' }
	];

	const links: GraphLink[] = [
		{ source: 'user', target: 'agent' },
		{ source: 'agent', target: 'env' },
		{ source: 'user', target: 'role' },
		{ source: 'role', target: 'env' },
		{ source: 'agent', target: 'token' },
		{ source: 'token', target: 'env' }
	];

	let selected = $state<string | null>(null);
</script>

<div class="space-y-4" data-ags-demo="identity">
	<p class="text-xs text-slate-400">Click a node to inspect identity bindings (simulated).</p>

	<ForceGraph {nodes} {links} height={300} selectedId={selected} onselect={(id) => (selected = id)} />

	{#if selected}
		<div class="rounded-lg border border-cyan-400/30 bg-cyan-400/5 px-3 py-2 text-xs text-cyan-100">
			Selected: <span class="font-mono">{selected}</span>
			{#if selected === 'token'}
				— scoped to MCP · expires 24h
			{:else if selected === 'agent'}
				— bound to user jdion · env prod-ags
			{/if}
		</div>
	{/if}
</div>
