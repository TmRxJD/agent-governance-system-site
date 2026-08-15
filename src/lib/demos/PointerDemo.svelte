<script lang="ts">
	type RepoNode = {
		path: string;
		label: string;
		rule: string;
		drift?: boolean;
		children?: RepoNode[];
	};

	let driftMode = $state(false);
	let hoveredPath = $state<string | null>(null);
	let selectedPath = $state<string | null>(null);

	const tree: RepoNode[] = [
		{
			path: 'docs',
			label: 'docs/',
			rule: 'Pointer: canonical protocol docs — must match .ags/pointers.yml',
			children: [
				{
					path: 'docs/AGENT_STAGING_PROTOCOL.md',
					label: 'AGENT_STAGING_PROTOCOL.md',
					rule: 'Staging pointer — Commit-Scope definitions'
				},
				{
					path: 'docs/AGENT_POINTER_PROTOCOL.md',
					label: 'AGENT_POINTER_PROTOCOL.md',
					rule: 'Pointer engine contract — drift detection rules'
				}
			]
		},
		{
			path: 'src/lib',
			label: 'src/lib/',
			rule: 'Pointer: public API surface — demos must not import proprietary engine',
			children: [
				{
					path: 'src/lib/demos',
					label: 'demos/',
					rule: 'Showcase-only simulations — no AGS runtime imports'
				},
				{
					path: 'src/lib/sim',
					label: 'sim/',
					rule: 'Engine registry metadata — read-only catalog'
				}
			]
		},
		{
			path: '.ags',
			label: '.ags/',
			rule: 'Pointer root — YAML rules authoritative for path governance',
			children: [
				{
					path: '.ags/pointers.yml',
					label: 'pointers.yml',
					rule: 'Machine-readable path → rule map'
				}
			]
		}
	];

	const driftPaths = new Set([
		'docs/AGENT_STAGING_PROTOCOL.md',
		'src/lib/demos',
		'.ags/pointers.yml'
	]);

	const activePath = $derived(selectedPath ?? hoveredPath);
	const activeRule = $derived(findRule(tree, activePath));

	function findRule(nodes: RepoNode[], path: string | null): string | null {
		if (!path) return null;
		for (const n of nodes) {
			if (n.path === path) return n.rule;
			if (n.children) {
				const found = findRule(n.children, path);
				if (found) return found;
			}
		}
		return null;
	}

	function isDrift(path: string): boolean {
		return driftMode && driftPaths.has(path);
	}

	function detectDrift() {
		driftMode = true;
		selectedPath = 'docs/AGENT_STAGING_PROTOCOL.md';
	}
</script>

<div class="space-y-4" data-ags-diagram="pointer-map" data-ags-animation="true">
	<div class="flex flex-wrap items-center gap-2">
		<button
			type="button"
			class="rounded-lg border border-violet-400/50 bg-violet-400/15 px-3 py-1.5 text-sm text-violet-100 hover:bg-violet-400/25 {driftMode
				? 'ags-pulse'
				: ''}"
			onclick={detectDrift}
		>
			Detect drift
		</button>
		{#if driftMode}
			<button
				type="button"
				class="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200"
				onclick={() => (driftMode = false)}
			>
				Clear
			</button>
		{/if}
	</div>

	<div class="grid gap-4 lg:grid-cols-[1fr_18rem]">
		<div
			class="rounded-xl border border-white/10 bg-black/25 p-3 font-mono text-sm"
			data-ags-interaction="repo-tree"
		>
			{#snippet renderNode(node: RepoNode, depth: number)}
				<div style="padding-left: {depth * 1}rem" class="py-0.5">
					<button
						type="button"
						class="rounded px-2 py-1 text-left transition {isDrift(node.path)
							? 'ags-pulse border border-fuchsia-400/60 bg-fuchsia-400/15 text-fuchsia-100'
							: selectedPath === node.path
								? 'bg-cyan-400/15 text-cyan-100'
								: hoveredPath === node.path
									? 'bg-violet-400/10 text-violet-100'
									: 'text-slate-300 hover:bg-white/5'}"
						onmouseenter={() => (hoveredPath = node.path)}
						onmouseleave={() => (hoveredPath = null)}
						onclick={() => (selectedPath = node.path)}
					>
						{node.label}
					</button>
					{#if node.children}
						{#each node.children as child (child.path)}
							{@render renderNode(child, depth + 1)}
						{/each}
					{/if}
				</div>
			{/snippet}

			{#each tree as node (node.path)}
				{@render renderNode(node, 0)}
			{/each}
		</div>

		<div
			class="rounded-xl border border-white/10 bg-black/25 p-3"
			data-ags-interaction="pointer-rule"
		>
			<h3 class="text-xs font-medium tracking-wide text-slate-500 uppercase">Pointer rule</h3>
			{#if activePath}
				<code class="mt-2 block text-xs text-cyan-300">{activePath}</code>
				<p class="mt-2 text-sm text-slate-300">{activeRule}</p>
				{#if isDrift(activePath)}
					<p class="mt-2 text-sm text-fuchsia-300">
						Drift: doc hash ≠ pointer manifest — update rule or fix reference.
					</p>
				{/if}
			{:else}
				<p class="mt-2 text-sm text-slate-500">Hover or click a path to reveal its pointer rule.</p>
			{/if}
		</div>
	</div>

	<p class="text-xs text-slate-500">
		Simulated repo map — mismatched paths pulse fuchsia when drift detection runs.
	</p>
</div>
