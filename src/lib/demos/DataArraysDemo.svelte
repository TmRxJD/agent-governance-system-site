<script lang="ts">
	const raw = ['staging:docs', 'test:unit', 'staging:docs', 'chore:hooks', 'test:unit'];
	let items = $state([...raw]);
	let phase = $state<'idle' | 'sorting' | 'deduping' | 'done'>('idle');
	let busy = $state(false);

	async function normalize() {
		if (busy) return;
		busy = true;
		phase = 'sorting';
		items = [...items].sort();
		await wait(600);
		phase = 'deduping';
		items = [...new Set(items)];
		await wait(600);
		phase = 'done';
		busy = false;
	}

	function reset() {
		items = [...raw];
		phase = 'idle';
		busy = false;
	}

	function wait(ms: number) {
		return new Promise((r) => setTimeout(r, ms));
	}

	const status = $derived(
		phase === 'idle'
			? `${items.length} entries (unordered, dupes)`
			: phase === 'sorting'
				? 'Sorting lexicographically…'
				: phase === 'deduping'
					? 'Removing duplicates…'
					: `${items.length} canonical entries`
	);
</script>

<div class="space-y-4" data-ags-demo="data-arrays">
	<div class="flex flex-wrap items-center gap-3">
		<button
			type="button"
			class="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/20 disabled:opacity-40"
			disabled={busy}
			onclick={normalize}
		>
			Normalize
		</button>
		<button
			type="button"
			class="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:border-violet-400/40"
			onclick={reset}
		>
			Reset
		</button>
		<span class="text-xs text-violet-200">{status}</span>
	</div>

	<div class="flex min-h-[4rem] flex-wrap gap-2 rounded-xl border border-white/10 bg-black/25 p-4">
		{#each items as item, i (item + i)}
			<span
				class="rounded-full border px-3 py-1 font-mono text-xs transition-all duration-500
          {phase === 'done'
					? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-100'
					: phase !== 'idle'
						? 'border-violet-400/40 bg-violet-500/10 text-violet-100 scale-105'
						: 'border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-100'}"
				style="transition-delay: {i * 40}ms"
			>
				{item}
			</span>
		{/each}
	</div>

	<pre class="overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-[11px] text-slate-400">{JSON.stringify(items, null, 2)}</pre>
</div>
