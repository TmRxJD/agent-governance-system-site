<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';
	import MermaidDiagram from '$lib/diagrams/MermaidDiagram.svelte';
	import { createMovieTimeline } from '$lib/animations/movie';

	type Env = 'dev' | 'bench' | 'staging' | 'prod';

	const ENVS: { id: Env; label: string; color: string }[] = [
		{ id: 'dev', label: 'Dev', color: 'cyan' },
		{ id: 'bench', label: 'Bench', color: 'violet' },
		{ id: 'staging', label: 'Staging', color: 'fuchsia' },
		{ id: 'prod', label: 'Prod', color: 'cyan' }
	];

	const DEPLOYMENT_FRAMES = [
		'Dev — build artifact',
		'Dev — unit tests pass',
		'Bench — smoke suite',
		'Bench — health green',
		'Staging — governance gate',
		'Staging — e2e pass',
		'Prod — canary 10%',
		'Prod — full rollout'
	];

	const GH_STEPS = [
		'Checkout',
		'pnpm install',
		'pnpm build',
		'pnpm test',
		'Deploy bench',
		'Deploy staging',
		'Deploy prod'
	];

	const playback = createPlayback(DEPLOYMENT_FRAMES, 1.5);
	const deployState = playback.state;

	const activeEnvIndex = $derived(
		Math.min(ENVS.length - 1, Math.floor($deployState.frame / 2))
	);

	const healthByEnv = $derived.by(() => {
		const frame = $deployState.frame;
		return {
			dev: frame >= 1,
			bench: frame >= 3,
			staging: frame >= 5,
			prod: frame >= 7
		} satisfies Record<Env, boolean>;
	});

	const ghStepIndex = $derived(
		Math.min(GH_STEPS.length - 1, Math.floor($deployState.frame / 1.1))
	);

	const mermaidDef = `flowchart LR
  dev[Dev] --> bench[Bench]
  bench --> staging[Staging]
  staging --> prod[Prod]
  style dev fill:#22d3ee22,stroke:#22d3ee
  style bench fill:#a78bfa22,stroke:#a78bfa
  style staging fill:#e879f922,stroke:#e879f9
  style prod fill:#22d3ee44,stroke:#22d3ee`;

	let pipelineEl: HTMLDivElement | undefined = $state();

	onMount(() => {
		let movie: Awaited<ReturnType<typeof createMovieTimeline>> | undefined;
		(async () => {
			if (!pipelineEl) return;
			movie = await createMovieTimeline((_g, tl) => {
				tl.to(pipelineEl!, { opacity: 1, duration: 0.4 });
				tl.to(pipelineEl!, { filter: 'brightness(1.15)', duration: 0.5, yoyo: true, repeat: 3 });
			});
			movie.play();
		})();
		return () => movie?.kill();
	});

	onDestroy(() => playback.destroy());
</script>

<div
	class="space-y-4"
	data-ags-animation="deployment"
	data-ags-diagram="true"
	bind:this={pipelineEl}
>
	<div class="flex flex-wrap items-stretch justify-between gap-2" data-ags-interaction="env-pipeline">
		{#each ENVS as env, i (env.id)}
			<div class="flex flex-1 min-w-[4.5rem] flex-col items-center gap-2">
				<div
					class="flex w-full flex-col items-center rounded-xl border px-3 py-4 transition {i <=
					activeEnvIndex
						? env.color === 'cyan'
							? 'border-cyan-400/50 bg-cyan-400/10'
							: env.color === 'violet'
								? 'border-violet-400/50 bg-violet-400/10'
								: 'border-fuchsia-400/50 bg-fuchsia-400/10'
						: 'border-white/10 bg-black/20 opacity-50'}"
				>
					<span
						class="text-sm font-semibold {env.color === 'cyan'
							? 'text-cyan-200'
							: env.color === 'violet'
								? 'text-violet-200'
								: 'text-fuchsia-200'}"
					>
						{env.label}
					</span>
					<span
						class="mt-2 h-2.5 w-2.5 rounded-full {healthByEnv[env.id]
							? 'bg-emerald-400 ags-pulse'
							: 'bg-slate-600'}"
						title={healthByEnv[env.id] ? 'Health OK' : 'Pending'}
					></span>
				</div>
				{#if i < ENVS.length - 1}
					<span class="hidden text-slate-600 sm:inline">→</span>
				{/if}
			</div>
		{/each}
	</div>

	<div class="grid gap-4 lg:grid-cols-2">
		<div
			class="rounded-xl border border-white/10 bg-black/25 p-3"
			data-ags-interaction="github-actions"
		>
			<h3 class="text-xs font-medium tracking-wide text-slate-500 uppercase">
				GitHub Actions (simulated)
			</h3>
			<ul class="mt-2 space-y-1.5 font-mono text-xs">
				{#each GH_STEPS as step, i (step)}
					<li
						class="flex items-center gap-2 rounded px-2 py-1 {i < ghStepIndex
							? 'text-emerald-300'
							: i === ghStepIndex
								? 'bg-violet-400/15 text-violet-100 ags-pulse'
								: 'text-slate-500'}"
					>
						<span>{i < ghStepIndex ? '✓' : i === ghStepIndex ? '●' : '○'}</span>
						{step}
					</li>
				{/each}
			</ul>
		</div>

		<div class="space-y-2">
			<h3 class="text-xs font-medium tracking-wide text-slate-500 uppercase">Health checks</h3>
			{#each ENVS as env (env.id)}
				<div class="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm">
					<span class="text-slate-300">{env.label}</span>
					<span class={healthByEnv[env.id] ? 'text-emerald-400' : 'text-slate-500'}>
						{healthByEnv[env.id] ? '● healthy' : '○ waiting'}
					</span>
				</div>
			{/each}
		</div>
	</div>

	<PlaybackControls {playback} title="Deployment movie" />

	<p class="font-mono text-xs text-violet-200">{$deployState.label}</p>

	<MermaidDiagram definition={mermaidDef} />
</div>
