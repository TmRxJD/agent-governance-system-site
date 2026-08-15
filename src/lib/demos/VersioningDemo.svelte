<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';
	import ForceGraph, { type GraphNode, type GraphLink } from '$lib/graphs/ForceGraph.svelte';
	import Badge from '$lib/ui/Badge.svelte';
	import { createMovieTimeline } from '$lib/animations/movie';

	type VersionNode = {
		version: string;
		kind: 'patch' | 'minor' | 'major';
		note: string;
	};

	let current = $state<VersionNode>({
		version: '2.4.1',
		kind: 'patch',
		note: 'Baseline release'
	});

	let history = $state<VersionNode[]>([
		{ version: '2.4.1', kind: 'patch', note: 'Baseline release' }
	]);

	const TIMELINE = ['2.3.0', '2.4.0', '2.4.1', '2.5.0', '3.0.0'];
	const playback = createPlayback(TIMELINE, 1);

	let graphKey = $state(0);
	let changelogVisible = $state(1);

	function parseVersion(v: string): [number, number, number] {
		const [a, b, c] = v.split('.').map(Number);
		return [a, b, c];
	}

	function bump(kind: 'patch' | 'minor' | 'major') {
		const [maj, min, pat] = parseVersion(current.version);
		let next: VersionNode;
		if (kind === 'patch') {
			next = {
				version: `${maj}.${min}.${pat + 1}`,
				kind,
				note: `Patch: fix + docs (${kind})`
			};
		} else if (kind === 'minor') {
			next = {
				version: `${maj}.${min + 1}.0`,
				kind,
				note: `Minor: additive API (${kind})`
			};
		} else {
			next = {
				version: `${maj + 1}.0.0`,
				kind,
				note: `Major: breaking governance schema (${kind})`
			};
		}
		current = next;
		history = [...history, next];
		changelogVisible = history.length;
		graphKey += 1;
		const timelineIdx = TIMELINE.findIndex((t) => next.version.startsWith(t.slice(0, 3)));
		if (timelineIdx >= 0) playback.setFrame(timelineIdx);
	}

	const graphNodes = $derived.by((): GraphNode[] =>
		history.map((h, i) => ({
			id: h.version,
			label: h.version,
			group: i === history.length - 1 ? 'ok' : undefined
		}))
	);

	const graphLinks = $derived.by((): GraphLink[] =>
		history.slice(1).map((h, i) => ({
			source: history[i].version,
			target: h.version,
			kind: h.kind
		}))
	);

	const semverExamples = [
		{ rule: 'patch', example: '2.4.1 → 2.4.2', desc: 'Bugfix, docs, test-only' },
		{ rule: 'minor', example: '2.4.2 → 2.5.0', desc: 'New engine showcase, backward compatible' },
		{ rule: 'major', example: '2.5.0 → 3.0.0', desc: 'Breaking .ags schema or commit trailer' }
	];

	onMount(() => {
		let movie: Awaited<ReturnType<typeof createMovieTimeline>> | undefined;
		(async () => {
			movie = await createMovieTimeline((_g, tl) => {
				tl.to({}, { duration: 0.25 });
			});
			movie.play();
		})();
		return () => movie?.kill();
	});

	onDestroy(() => playback.destroy());
</script>

<div class="space-y-4" data-ags-animation="versioning" data-ags-diagram="true">
	<div class="flex flex-wrap items-center gap-3">
		<span class="font-mono text-2xl text-cyan-200">{current.version}</span>
		<Badge tone="violet" label={current.kind} />
		<div class="flex flex-wrap gap-2">
			{#each ['patch', 'minor', 'major'] as kind (kind)}
				<button
					type="button"
					class="rounded-lg border px-3 py-1.5 text-sm capitalize transition {kind === 'patch'
						? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/20'
						: kind === 'minor'
							? 'border-violet-400/40 bg-violet-400/10 text-violet-100 hover:bg-violet-400/20'
							: 'border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-100 hover:bg-fuchsia-400/20'}"
					onclick={() => bump(kind as 'patch' | 'minor' | 'major')}
				>
					Bump {kind}
				</button>
			{/each}
		</div>
	</div>

	<div class="grid gap-4 lg:grid-cols-2">
		<div class="space-y-2" data-ags-interaction="changelog">
			<h3 class="text-xs font-medium tracking-wide text-slate-500 uppercase">Changelog</h3>
			<ul class="space-y-2">
				{#each history.slice().reverse() as entry, i (entry.version + i)}
					{#if i < changelogVisible}
						<li
							class="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm transition"
							data-inview="true"
							style="animation-delay: {i * 80}ms"
						>
							<span class="font-mono text-violet-200">{entry.version}</span>
							<span class="text-slate-400"> — {entry.note}</span>
						</li>
					{/if}
				{/each}
			</ul>
		</div>

		<div class="space-y-2">
			<h3 class="text-xs font-medium tracking-wide text-slate-500 uppercase">Semver rules</h3>
			{#each semverExamples as ex (ex.rule)}
				<div class="rounded-lg border border-white/10 px-3 py-2 text-sm">
					<span class="font-mono text-cyan-300">{ex.example}</span>
					<p class="text-slate-400">{ex.desc}</p>
				</div>
			{/each}
		</div>
	</div>

	{#key graphKey}
		<ForceGraph nodes={graphNodes} links={graphLinks} height={260} />
	{/key}

	<PlaybackControls {playback} title="Version time-travel" />

	<p class="text-xs text-slate-500">
		Scrub playback to preview semver milestones. Bumps append animated changelog lines.
	</p>
</div>
