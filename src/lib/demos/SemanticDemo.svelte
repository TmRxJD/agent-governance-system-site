<script lang="ts">
	import ForceGraph, { type GraphNode, type GraphLink } from '$lib/graphs/ForceGraph.svelte';
	import Badge from '$lib/ui/Badge.svelte';

	type Constraint = { id: string; text: string; status: 'ok' | 'warn' | 'idle' };

	let selectedId = $state<string | null>(null);
	let flashMessage = $state<string | null>(null);
	let graphKey = $state(0);

	let nodes = $state<GraphNode[]>([
		{ id: 'commit', label: 'Commit', group: 'ok' },
		{ id: 'scope', label: 'Commit-Scope', group: 'ok' },
		{ id: 'confidence', label: 'Confidence', group: 'ok' },
		{ id: 'staging', label: 'Staging', group: 'ok' },
		{ id: 'pointer', label: 'Pointer', group: 'ok' },
		{ id: 'semantic', label: 'Semantic', group: 'ok' }
	]);

	const links: GraphLink[] = [
		{ source: 'commit', target: 'scope', kind: 'requires' },
		{ source: 'commit', target: 'confidence', kind: 'requires' },
		{ source: 'commit', target: 'staging', kind: 'requires' },
		{ source: 'scope', target: 'semantic', kind: 'defines' },
		{ source: 'pointer', target: 'semantic', kind: 'grounds' },
		{ source: 'confidence', target: 'staging', kind: 'gates' }
	];

	let constraints = $state<Constraint[]>([
		{ id: 'c1', text: 'Every commit declares exactly one Commit-Scope', status: 'ok' },
		{ id: 'c2', text: 'Confidence attestation precedes staging enforce', status: 'ok' },
		{ id: 'c3', text: 'Pointer rules must resolve for touched paths', status: 'idle' },
		{ id: 'c4', text: 'Semantic graph has no contradictory concept edges', status: 'idle' }
	]);

	const selectedNode = $derived(nodes.find((n) => n.id === selectedId) ?? null);

	function injectContradiction() {
		const target = selectedId ?? 'scope';
		nodes = nodes.map((n) =>
			n.id === target || n.id === 'semantic'
				? { ...n, group: 'warn' as const }
				: n.group === 'warn'
					? n
					: { ...n, group: 'ok' as const }
		);
		constraints = constraints.map((c) =>
			c.id === 'c4'
				? { ...c, status: 'warn' as const, text: 'Contradiction: scope ↔ semantic edge conflict' }
				: c.id === 'c1'
					? { ...c, status: 'warn' as const }
					: c
		);
		graphKey += 1;
		flashMessage = `Contradiction injected at "${target}" — semantic conflict flagged`;
		setTimeout(() => (flashMessage = null), 3200);
	}

	function resolveContradiction() {
		nodes = nodes.map((n) => ({ ...n, group: 'ok' as const }));
		constraints = constraints.map((c) => ({
			...c,
			status: c.id === 'c3' ? ('idle' as const) : ('ok' as const),
			text:
				c.id === 'c4'
					? 'Semantic graph has no contradictory concept edges'
					: c.id === 'c1'
						? 'Every commit declares exactly one Commit-Scope'
						: c.text
		}));
		graphKey += 1;
		flashMessage = 'Constraints reconciled — graph normalized';
		setTimeout(() => (flashMessage = null), 2200);
	}
</script>

<div class="space-y-4" data-ags-diagram="semantic" data-ags-animation="true">
	<div class="flex flex-wrap items-center gap-2">
		<button
			type="button"
			class="rounded-lg border border-fuchsia-400/50 bg-fuchsia-400/15 px-3 py-1.5 text-sm text-fuchsia-100 hover:bg-fuchsia-400/25"
			onclick={injectContradiction}
		>
			Inject contradiction
		</button>
		<button
			type="button"
			class="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-slate-300 hover:border-cyan-400/40 hover:text-cyan-100"
			onclick={resolveContradiction}
		>
			Resolve
		</button>
		{#if selectedNode}
			<Badge tone="violet" label={`Selected: ${selectedNode.label}`} />
		{/if}
	</div>

	{#if flashMessage}
		<p
			class="ags-pulse rounded-lg border border-fuchsia-400/40 bg-fuchsia-400/10 px-3 py-2 text-sm text-fuchsia-200"
			data-ags-animation="flash"
			role="status"
		>
			{flashMessage}
		</p>
	{/if}

	<div class="grid gap-4 lg:grid-cols-[1fr_16rem]">
		{#key graphKey}
			<ForceGraph
				{nodes}
				{links}
				height={340}
				selectedId={selectedId}
				onselect={(id) => (selectedId = id)}
			/>
		{/key}

		<div
			class="space-y-2 rounded-xl border border-white/10 bg-black/25 p-3"
			data-ags-interaction="constraints"
		>
			<h3 class="text-xs font-medium tracking-wide text-slate-500 uppercase">Constraints</h3>
			<ul class="space-y-2">
				{#each constraints as c (c.id)}
					<li
						class="rounded-lg border px-2.5 py-2 text-sm transition {c.status === 'warn'
							? 'border-fuchsia-400/50 bg-fuchsia-400/10 text-fuchsia-100'
							: c.status === 'ok'
								? 'border-cyan-400/30 bg-cyan-400/5 text-slate-200'
								: 'border-white/10 text-slate-400'}"
					>
						<span class="mr-2 inline-block h-2 w-2 rounded-full {c.status === 'warn'
							? 'bg-fuchsia-400'
							: c.status === 'ok'
								? 'bg-cyan-400'
								: 'bg-slate-600'}"></span>
						{c.text}
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<p class="text-xs text-slate-500">
		Click a concept node to select it. Cyan = satisfied, fuchsia = contradiction. Simulated semantic
		graph only.
	</p>
</div>
