<script lang="ts">
	let scanning = $state(false);
	let loopBlocked = $state(false);

	const ops = [
		{ name: 'explore', tokens: 18200, budget: 25000, waste: 0.22 },
		{ name: 'fix-loop', tokens: 9400, budget: 12000, waste: 0.61 },
		{ name: 'commit-checkpoint', tokens: 4100, budget: 12000, waste: 0.12 }
	];

	const hotspots = [
		{ path: 'src/features/**', hits: 14 },
		{ path: 'packages/*/src/**', hits: 9 },
		{ path: 'docs/**', hits: 3 }
	];

	async function scan() {
		scanning = true;
		loopBlocked = false;
		await new Promise((r) => setTimeout(r, 700));
		loopBlocked = true;
		scanning = false;
	}

	const maxHits = $derived(Math.max(...hotspots.map((h) => h.hits)));
</script>

<div class="space-y-4" data-ags-demo="efficiency">
	<div class="flex flex-wrap items-center gap-3">
		<button
			type="button"
			class="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/20"
			onclick={scan}
		>
			{scanning ? 'Predicting waste…' : 'Run efficiency scan'}
		</button>
		<span class="text-xs text-violet-200">Token budgets + loop prevention</span>
		{#if loopBlocked}
			<span
				class="rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-2 py-0.5 text-xs text-fuchsia-200"
				>Reasoning loop blocked</span
			>
		{/if}
	</div>

	<div class="grid gap-4 lg:grid-cols-2">
		<div class="space-y-3">
			<h3 class="text-sm text-cyan-200">Operation budgets</h3>
			{#each ops as op (op.name)}
				{@const pct = (op.tokens / op.budget) * 100}
				<div>
					<div class="mb-1 flex justify-between text-xs text-slate-400">
						<span class="font-mono">{op.name}</span>
						<span class={op.waste > 0.35 ? 'text-fuchsia-300' : 'text-violet-200'}
							>{op.tokens.toLocaleString()} / {op.budget.toLocaleString()} · waste {(op.waste * 100).toFixed(0)}%</span
						>
					</div>
					<div class="h-2 rounded-full bg-white/5">
						<div
							class="h-full rounded-full transition-all duration-500
                {op.waste > 0.35 ? 'bg-fuchsia-500' : 'bg-gradient-to-r from-cyan-500 to-violet-500'}"
							style="width: {Math.min(pct, 100)}%"
						></div>
					</div>
				</div>
			{/each}
		</div>

		<div class="space-y-2">
			<h3 class="text-sm text-violet-200">Token hotspots</h3>
			{#each hotspots as row (row.path)}
				<div class="flex items-center gap-2 text-xs">
					<span class="w-40 truncate font-mono text-slate-400">{row.path}</span>
					<div class="h-3 flex-1 overflow-hidden rounded bg-white/5">
						<div
							class="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all"
							style="width: {(row.hits / maxHits) * 100}%"
						></div>
					</div>
					<span class="w-10 text-right text-cyan-200">{row.hits}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
