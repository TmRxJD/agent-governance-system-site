<script lang="ts">
	let running = $state(false);
	let smarter = $state(18);
	let verdict = $state<'growth' | 'optimal_plateau' | 'regression' | 'stagnation'>('growth');
	let noOps = $state(2);

	const families = [
		{ name: 'dependency map', value: 42 },
		{ name: 'builder reuse', value: 19 },
		{ name: 'semantic maturity', value: 31 },
		{ name: 'context quality', value: 24 },
		{ name: 'guardrails', value: 16 }
	];

	async function run() {
		running = true;
		await new Promise((r) => setTimeout(r, 700));
		smarter = 61;
		verdict = 'optimal_plateau';
		noOps = 0;
		running = false;
	}
</script>

<div class="space-y-4" data-ags-demo="impact">
	<div class="flex flex-wrap items-center gap-3">
		<button
			type="button"
			class="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/20"
			onclick={run}
		>
			{running ? 'Auditing growth…' : 'Run growth audit'}
		</button>
		<span class="text-xs text-violet-200">learning verifier · curve-aware</span>
		<span class="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-100"
			>smarter {smarter}</span
		>
		<span
			class="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-200"
			>{verdict}</span
		>
		{#if noOps > 0}
			<span
				class="rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-2 py-0.5 text-xs text-fuchsia-200"
				>{noOps} no-ops</span
			>
		{/if}
	</div>

	<div class="space-y-2">
		<h3 class="text-sm text-cyan-200">Growth families</h3>
		{#each families as row (row.name)}
			<div class="flex items-center gap-2 text-xs">
				<span class="w-36 font-mono text-slate-400">{row.name}</span>
				<div class="h-1.5 flex-1 rounded bg-slate-800">
					<div
						class="h-1.5 rounded bg-cyan-400/70"
						style={`width: ${Math.min(100, row.value * 2)}%`}
					></div>
				</div>
				<span class="w-8 text-right text-cyan-200">{row.value}</span>
			</div>
		{/each}
	</div>

	<p class="text-sm font-medium text-cyan-200/90">
		AGS doesn’t just govern — it proves the agent is getting smarter.
	</p>
</div>
