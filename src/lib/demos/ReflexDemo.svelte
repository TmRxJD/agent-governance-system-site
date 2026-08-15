<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { createMovieTimeline } from '$lib/animations/movie';

	type PainSignal = {
		id: string;
		time: string;
		severity: 'low' | 'med' | 'high';
		message: string;
	};

	type Violation = {
		id: string;
		label: string;
		reflex: string;
	};

	const VIOLATIONS: Violation[] = [
		{ id: 'v1', label: 'Raw git commit', reflex: 'Block + redirect to tower-gov MCP' },
		{ id: 'v2', label: 'Missing Commit-Scope', reflex: 'Staging enforce reject' },
		{ id: 'v3', label: 'Pointer drift', reflex: 'Sentinel ping + doc refresh cue' },
		{ id: 'v4', label: 'Confidence bypass', reflex: 'Hook deny + pain signal' }
	];

	const SIGNAL_POOL = [
		'Hook rejected: missing Enforcement trailer',
		'Pain: staging_enforce returned fail',
		'Pain: pointer_drift on docs/AGENT_*.md',
		'Pain: confidence below threshold',
		'Reflex armed: commit_checkpoint required',
		'Pain: batch Commit-Scope detected'
	];

	let signals = $state<PainSignal[]>([]);
	let selectedViolation = $state<string>('v1');
	let arcPulse = $state(false);
	let tick = 0;

	function nowLabel() {
		return new Date().toLocaleTimeString(undefined, {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	}

	function pushSignal() {
		const msg = SIGNAL_POOL[tick % SIGNAL_POOL.length];
		const severity: PainSignal['severity'] =
			tick % 3 === 0 ? 'high' : tick % 2 === 0 ? 'med' : 'low';
		signals = [
			{
				id: `s${Date.now()}`,
				time: nowLabel(),
				severity,
				message: msg
			},
			...signals
		].slice(0, 12);
		tick += 1;
	}

	function selectViolation(id: string) {
		selectedViolation = id;
		arcPulse = true;
		setTimeout(() => (arcPulse = false), 900);
	}

	const activeViolation = $derived(VIOLATIONS.find((v) => v.id === selectedViolation)!);

	const interval = setInterval(pushSignal, 2800);
	pushSignal();

	onMount(() => {
		let movie: Awaited<ReturnType<typeof createMovieTimeline>> | undefined;
		(async () => {
			movie = await createMovieTimeline((_g, tl) => {
				tl.to({}, { duration: 0.3 });
			});
			movie.play();
		})();
		return () => movie?.kill();
	});

	onDestroy(() => clearInterval(interval));

	const severityColor = {
		low: 'text-slate-400 border-white/10',
		med: 'text-violet-200 border-violet-400/40 bg-violet-400/5',
		high: 'text-fuchsia-200 border-fuchsia-400/50 bg-fuchsia-400/10'
	};
</script>

<div class="space-y-4" data-ags-animation="reflex" data-ags-diagram="true">
	<div class="grid gap-4 lg:grid-cols-[1fr_14rem]">
		<div
			class="max-h-52 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-black/25 p-3"
			data-ags-interaction="pain-feed"
		>
			<h3 class="sticky top-0 bg-black/80 text-xs font-medium tracking-wide text-slate-500 uppercase">
				Pain signal feed
			</h3>
			{#each signals as s (s.id)}
				<div
					class="rounded-lg border px-2.5 py-1.5 text-sm {severityColor[s.severity]}"
					data-inview="true"
				>
					<span class="font-mono text-[10px] text-slate-500">{s.time}</span>
					{s.message}
				</div>
			{/each}
		</div>

		<div class="space-y-2" data-ags-interaction="violations">
			<h3 class="text-xs font-medium tracking-wide text-slate-500 uppercase">Violations</h3>
			{#each VIOLATIONS as v (v.id)}
				<button
					type="button"
					class="w-full rounded-lg border px-2.5 py-2 text-left text-sm transition {selectedViolation ===
					v.id
						? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-100'
						: 'border-white/10 text-slate-300 hover:border-violet-400/40'}"
					onclick={() => selectViolation(v.id)}
				>
					{v.label}
				</button>
			{/each}
		</div>
	</div>

	<div
		class="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4"
		data-ags-diagram="reflex-arc"
	>
		<svg viewBox="0 0 480 160" class="mx-auto w-full max-w-xl" role="img" aria-label="Reflex arc">
			<defs>
				<linearGradient id="reflexGrad" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stop-color="#22d3ee" />
					<stop offset="50%" stop-color="#a78bfa" />
					<stop offset="100%" stop-color="#e879f9" />
				</linearGradient>
			</defs>

			<circle cx="60" cy="80" r="28" fill="#22d3ee33" stroke="#22d3ee" stroke-width="2" />
			<text x="60" y="85" text-anchor="middle" fill="#e2e8f0" font-size="11">Violation</text>

			<circle cx="240" cy="40" r="22" fill="#a78bfa33" stroke="#a78bfa" stroke-width="2" />
			<text x="240" y="45" text-anchor="middle" fill="#e2e8f0" font-size="10">Sentinel</text>

			<circle cx="420" cy="80" r="28" fill="#e879f933" stroke="#e879f9" stroke-width="2" />
			<text x="420" y="85" text-anchor="middle" fill="#e2e8f0" font-size="11">Reflex</text>

			<path
				d="M 88 80 Q 160 20, 218 48"
				fill="none"
				stroke="url(#reflexGrad)"
				stroke-width="3"
				class={arcPulse ? 'ags-flow' : ''}
				opacity={arcPulse ? 1 : 0.35}
			/>
			<path
				d="M 262 52 Q 340 60, 392 80"
				fill="none"
				stroke="url(#reflexGrad)"
				stroke-width="3"
				class={arcPulse ? 'ags-flow' : ''}
				opacity={arcPulse ? 1 : 0.35}
			/>

			{#if arcPulse}
				<circle cx="240" cy="80" r="8" fill="#e879f9" class="ags-pulse" />
			{/if}
		</svg>

		<div class="mt-2 text-center">
			<p class="text-sm font-medium text-violet-200">{activeViolation.label}</p>
			<p class="text-sm text-slate-400">→ {activeViolation.reflex}</p>
		</div>
	</div>

	<p class="text-xs text-slate-500">
		Live feed appends simulated pain signals. Select a violation to pulse the reflex arc.
	</p>
</div>
