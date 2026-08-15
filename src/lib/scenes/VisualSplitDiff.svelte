<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { prefersReducedMotion } from '$lib/animations/scroll-reveal';

	type FileItem = { id: string; path: string; lane: 'inbox' | 'a' | 'b' | 'reject' };

	let files = $state<FileItem[]>([
		{ id: '1', path: 'src/lib/paths.ts', lane: 'inbox' },
		{ id: '2', path: 'src/lib/scenes/Hero.svelte', lane: 'inbox' },
		{ id: '3', path: 'docs/AGENT_STAGING.md + package.json', lane: 'inbox' }
	]);

	let step = $state(0);
	let playing = $state(false);

	const laneMeta = {
		inbox: { title: 'Unsorted changes', hint: 'One agent turn' },
		a: { title: 'Edit one file', hint: 'Goes alone' },
		b: { title: 'New file', hint: 'Goes alone' },
		reject: { title: 'Mixed bundle', hint: 'Stays blocked' }
	};

	async function run() {
		if (playing) return;
		playing = true;
		files = files.map((f) => ({ ...f, lane: 'inbox' }));
		step = 0;
		await wait(prefersReducedMotion() ? 200 : 800);
		step = 1;
		files = files.map((f) =>
			f.id === '1' ? { ...f, lane: 'a' } : f.id === '2' ? { ...f, lane: 'b' } : { ...f, lane: 'reject' }
		);
		await wait(prefersReducedMotion() ? 300 : 1400);
		step = 2;
		playing = false;
	}

	function wait(ms: number) {
		return new Promise((r) => setTimeout(r, ms));
	}

	onMount(() => {
		const t = setTimeout(run, 500);
		return () => clearTimeout(t);
	});

	function inLane(lane: FileItem['lane']) {
		return files.filter((f) => f.lane === lane);
	}
</script>

<div
	class="rounded-2xl border border-white/10 bg-[#070b14] p-4 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
	data-ags-animation="split-diff"
	data-ags-diagram="true"
	data-ags-interaction="replay"
>
	<div class="mb-4 flex items-center justify-between gap-3">
		<p class="text-sm text-slate-300">
			{#if step === 0}
				Agent finished a turn with three changes…
			{:else if step === 1}
				The system splits them into separate commits…
			{:else}
				Mixed bundles never share a commit.
			{/if}
		</p>
		<button
			type="button"
			class="shrink-0 rounded-md border border-white/10 px-2.5 py-1 text-xs text-slate-300 hover:border-violet-400/40"
			onclick={run}
			disabled={playing}>Replay</button
		>
	</div>

	<div class="grid gap-3 sm:grid-cols-2">
		{#each Object.entries(laneMeta) as [key, meta] (key)}
			{@const lane = key as FileItem['lane']}
			<div
				class={`min-h-[7.5rem] rounded-xl border p-3 transition duration-500 ${
					lane === 'reject'
						? 'border-fuchsia-400/30 bg-fuchsia-500/5'
						: lane === 'inbox'
							? 'border-white/10 bg-white/[0.02]'
							: 'border-cyan-400/25 bg-cyan-500/5'
				}`}
			>
				<p class="text-xs font-medium text-slate-200">{meta.title}</p>
				<p class="mb-2 text-[11px] text-slate-500">{meta.hint}</p>
				<div class="space-y-1.5">
					{#each inLane(lane) as file (file.id)}
						<div
							class="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono text-[11px] text-cyan-100"
							animate:flip={{ duration: prefersReducedMotion() ? 0 : 450 }}
							in:fly={{ y: 6, duration: 250 }}
						>
							{file.path}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
