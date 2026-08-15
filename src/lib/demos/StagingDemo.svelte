<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';
	import MermaidDiagram from '$lib/diagrams/MermaidDiagram.svelte';
	import Badge from '$lib/ui/Badge.svelte';

	type CommitScope = 'file-create' | 'single-change' | 'module-wire';
	type DiffItem = {
		id: string;
		path: string;
		summary: string;
		scope: CommitScope | null;
	};

	const PIPELINE = [
		'Diff detected',
		'Classify scope',
		'Scope locked',
		'Staging enforce',
		'Commit-ready'
	];

	const SCOPE_META: Record<
		CommitScope,
		{ label: string; tone: 'cyan' | 'violet' | 'magenta'; explanation: string }
	> = {
		'file-create': {
			label: 'file-create',
			tone: 'cyan',
			explanation: 'Brand-new file only — no edits to existing modules in the same commit.'
		},
		'single-change': {
			label: 'single-change',
			tone: 'violet',
			explanation: 'One logical change confined to a single existing file.'
		},
		'module-wire': {
			label: 'module-wire',
			tone: 'magenta',
			explanation: 'Cross-file wiring within one module boundary — imports, exports, registry hooks.'
		}
	};

	const playback = createPlayback(PIPELINE, 1.2);

	let diffs = $state<DiffItem[]>([
		{ id: 'd1', path: 'src/lib/demos/index.ts', summary: 'Add barrel export', scope: null },
		{ id: 'd2', path: 'src/services/staging.ts', summary: 'Wire classify helper', scope: null },
		{ id: 'd3', path: 'docs/AGENT_STAGING_PROTOCOL.md', summary: 'Document scope table', scope: null },
		{ id: 'd4', path: 'src/lib/ui/Badge.svelte', summary: 'Tone variant tweak', scope: null }
	]);

	let draggingId = $state<string | null>(null);
	let activeDiffId = $state<string | null>(null);

	const activeDiff = $derived(diffs.find((d) => d.id === activeDiffId) ?? null);
	const classifiedCount = $derived(diffs.filter((d) => d.scope).length);
	const pipelineState = playback.state;

	const mermaidDef = $derived(`flowchart LR
  A[Diff queue] --> B{Classify}
  B --> C[file-create]
  B --> D[single-change]
  B --> E[module-wire]
  C --> F[Staging enforce]
  D --> F
  E --> F
  F --> G[Commit-ready]
  style F fill:#22d3ee22,stroke:#22d3ee
  style G fill:#a78bfa22,stroke:#a78bfa`);

	function classifyDiff(id: string, scope: CommitScope) {
		diffs = diffs.map((d) => (d.id === id ? { ...d, scope } : d));
		activeDiffId = id;
	}

	function onDragStart(id: string) {
		draggingId = id;
		activeDiffId = id;
	}

	function onDropScope(scope: CommitScope) {
		if (draggingId) classifyDiff(draggingId, scope);
		draggingId = null;
	}

	onDestroy(() => playback.destroy());
</script>

<div class="space-y-4" data-ags-animation="staging" data-ags-diagram="true">
	<p class="text-sm text-slate-400">
		Drag a diff onto a Commit-Scope bucket, or select a diff and click a scope. Simulated staging
		only.
	</p>

	<div class="grid gap-4 lg:grid-cols-[1fr_minmax(12rem,16rem)]">
		<div
			class="space-y-2 rounded-xl border border-white/10 bg-black/25 p-3"
			data-ags-interaction="diff-list"
		>
			<h3 class="text-xs font-medium tracking-wide text-slate-500 uppercase">Pending diffs</h3>
			<ul class="space-y-2">
				{#each diffs as diff (diff.id)}
					<li role="listitem">
						<button
							type="button"
							draggable="true"
							class="w-full cursor-grab rounded-lg border px-3 py-2 text-left transition active:cursor-grabbing {diff.id ===
							activeDiffId
								? 'border-cyan-400/60 bg-cyan-400/10'
								: 'border-white/10 bg-white/5 hover:border-violet-400/40'}"
							ondragstart={() => onDragStart(diff.id)}
							ondragend={() => (draggingId = null)}
							onclick={() => (activeDiffId = diff.id)}
						>
							<div class="flex flex-wrap items-center justify-between gap-2">
								<code class="text-xs text-cyan-200">{diff.path}</code>
								{#if diff.scope}
									<Badge tone={SCOPE_META[diff.scope].tone} label={diff.scope} />
								{/if}
							</div>
							<p class="mt-1 text-sm text-slate-300">{diff.summary}</p>
						</button>
					</li>
				{/each}
			</ul>
		</div>

		<div class="space-y-2" data-ags-interaction="scope-buckets">
			<h3 class="text-xs font-medium tracking-wide text-slate-500 uppercase">Commit-Scopes</h3>
			{#each Object.entries(SCOPE_META) as [scope, meta] (scope)}
				<button
					type="button"
					class="w-full rounded-lg border border-dashed px-3 py-3 text-left transition hover:bg-white/5 {draggingId
						? 'border-fuchsia-400/50 bg-fuchsia-400/5'
						: 'border-white/15'}"
					ondragover={(e) => e.preventDefault()}
					ondrop={() => onDropScope(scope as CommitScope)}
					onclick={() => activeDiffId && classifyDiff(activeDiffId, scope as CommitScope)}
				>
					<span class="font-mono text-sm text-violet-200">{meta.label}</span>
					<p class="mt-1 text-xs text-slate-400">{meta.explanation}</p>
				</button>
			{/each}
		</div>
	</div>

	{#if activeDiff?.scope}
		<div
			class="rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-4 py-3"
			data-ags-interaction="scope-explanation"
		>
			<p class="text-sm text-slate-200">
				<code class="text-cyan-300">{activeDiff.path}</code>
				→
				<span class="font-mono text-violet-200">{activeDiff.scope}</span>
			</p>
			<p class="mt-1 text-sm text-slate-400">{SCOPE_META[activeDiff.scope].explanation}</p>
		</div>
	{/if}

	<div class="space-y-2" data-ags-animation="pipeline">
		<div class="flex flex-wrap gap-2">
			{#each PIPELINE as stage, i (stage)}
				<div
					class="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition {i <=
					$pipelineState.frame
						? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-100'
						: 'border-white/10 text-slate-500'}"
				>
					<span
						class="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold {i <=
						$pipelineState.frame
							? 'bg-violet-500/40 text-white'
							: 'bg-white/10'}"
					>
						{i + 1}
					</span>
					{stage}
				</div>
			{/each}
		</div>
		<p class="text-xs text-slate-500">
			{classifiedCount}/{diffs.length} classified · scrub playback to walk the pipeline
		</p>
		<PlaybackControls {playback} title="Staging pipeline" />
	</div>

	<MermaidDiagram definition={mermaidDef} class="mt-2" />
</div>
