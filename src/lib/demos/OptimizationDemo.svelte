<script lang="ts">
	let optimizing = $state(false);

	const budgets = [
		{ name: 'Bundle size', used: 412, limit: 500, unit: 'KB' },
		{ name: 'TTFB', used: 180, limit: 200, unit: 'ms' },
		{ name: 'MCP tokens/hr', used: 8420, limit: 10000, unit: '' }
	];

	const mcpCosts = [
		{ tool: 'wiki_page', calls: 120, cost: 2.4 },
		{ tool: 'commit_checkpoint', calls: 45, cost: 0.9 },
		{ tool: 'sdk_graph_mutate', calls: 28, cost: 1.8 },
		{ tool: 'confidence_enforce', calls: 90, cost: 1.1 }
	];

	async function optimize() {
		optimizing = true;
		await new Promise((r) => setTimeout(r, 800));
		optimizing = false;
	}

	const maxCost = $derived(Math.max(...mcpCosts.map((c) => c.cost)));
</script>

<div class="space-y-4" data-ags-demo="optimization">
	<div class="flex items-center gap-3">
		<button
			type="button"
			class="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/20"
			onclick={optimize}
		>
			{optimizing ? 'Analyzing…' : 'Run budget scan'}
		</button>
		<span class="text-xs text-violet-200">Performance + MCP cost dashboard</span>
	</div>

	<div class="grid gap-4 lg:grid-cols-2">
		<div class="space-y-3">
			<h3 class="text-sm text-cyan-200">Budgets</h3>
			{#each budgets as b}
				{@const pct = (b.used / b.limit) * 100}
				<div>
					<div class="mb-1 flex justify-between text-xs text-slate-400">
						<span>{b.name}</span>
						<span class={pct > 85 ? 'text-fuchsia-300' : 'text-violet-200'}>{b.used}{b.unit} / {b.limit}{b.unit}</span>
					</div>
					<div class="h-2 rounded-full bg-white/5">
						<div
							class="h-full rounded-full transition-all duration-500
                {pct > 85 ? 'bg-fuchsia-500' : 'bg-gradient-to-r from-cyan-500 to-violet-500'}"
							style="width: {pct}%"
						></div>
					</div>
				</div>
			{/each}
		</div>

		<div class="space-y-2">
			<h3 class="text-sm text-violet-200">MCP cost bars</h3>
			{#each mcpCosts as row}
				<div class="flex items-center gap-2 text-xs">
					<span class="w-36 truncate font-mono text-slate-400">{row.tool}</span>
					<div class="h-3 flex-1 overflow-hidden rounded bg-white/5">
						<div
							class="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all"
							style="width: {(row.cost / maxCost) * 100}%"
						></div>
					</div>
					<span class="w-12 text-right text-cyan-200">${row.cost.toFixed(1)}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
