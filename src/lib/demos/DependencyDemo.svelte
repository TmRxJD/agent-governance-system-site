<script lang="ts">
	import ForceGraph, { type GraphLink, type GraphNode } from '$lib/graphs/ForceGraph.svelte';

	const baseNodes: GraphNode[] = [
		{ id: 'sdk', label: '@ags/sdk', group: 'ok' },
		{ id: 'gov', label: 'governance-engine', group: 'ok' },
		{ id: 'mcp', label: 'tower-mcp', group: 'ok' },
		{ id: 'site', label: 'ags-site', group: 'ok' },
		{ id: 'lint', label: 'eslint-plugin', group: 'ok' }
	];

	const baseLinks: GraphLink[] = [
		{ source: 'site', target: 'sdk' },
		{ source: 'site', target: 'gov' },
		{ source: 'mcp', target: 'sdk' },
		{ source: 'mcp', target: 'gov' },
		{ source: 'lint', target: 'sdk' }
	];

	const cycleLinks: GraphLink[] = [
		...baseLinks,
		{ source: 'sdk', target: 'lint', kind: 'cycle' }
	];

	let scanning = $state(false);
	let cycleFound = $state(false);
	let graphKey = $state(0);

	async function detectCycle() {
		if (scanning) return;
		scanning = true;
		cycleFound = false;
		await new Promise((r) => setTimeout(r, 900));
		cycleFound = true;
		graphKey++;
		scanning = false;
	}

	const nodes = $derived(
		cycleFound
			? baseNodes.map((n) => (n.id === 'sdk' || n.id === 'lint' ? { ...n, group: 'warn' as const } : n))
			: baseNodes
	);
	const links = $derived(cycleFound ? cycleLinks : baseLinks);
</script>

<div class="space-y-4" data-ags-demo="dependency">
	<div class="flex flex-wrap items-center gap-3">
		<button
			type="button"
			class="rounded-lg border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100 hover:bg-fuchsia-500/20 disabled:opacity-40"
			disabled={scanning}
			onclick={detectCycle}
		>
			{scanning ? 'Scanning…' : 'Detect cycles'}
		</button>
		{#if cycleFound}
			<span class="animate-pulse text-xs text-fuchsia-300">Cycle: sdk → lint → sdk</span>
		{:else}
			<span class="text-xs text-slate-400">Acyclic dependency graph</span>
		{/if}
	</div>

	{#key graphKey}
		<ForceGraph {nodes} {links} height={280} selectedId={cycleFound ? 'lint' : null} />
	{/key}
</div>
