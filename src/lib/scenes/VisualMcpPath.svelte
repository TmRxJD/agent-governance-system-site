<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { prefersReducedMotion } from '$lib/animations/scroll-reveal';

	/**
	 * ONE scene: how AGS actually governs an agent.
	 * Not CI. Not “build → prod”. The MCP attestation path.
	 */
	type Beat =
		| 'idle'
		| 'edit'
		| 'raw-git'
		| 'denied'
		| 'mcp'
		| 'staging'
		| 'confidence'
		| 'checkpoint'
		| 'accepted';

	type ToolCall = { name: string; detail: string; status: 'pending' | 'run' | 'done' };

	let beat = $state<Beat>('idle');
	let running = $state(false);
	let tools = $state<ToolCall[]>([
		{ name: 'enforcement_begin', detail: 'Open a session', status: 'pending' },
		{ name: 'staging_enforce', detail: 'Lock one Commit-Scope', status: 'pending' },
		{ name: 'confidence_enforce', detail: 'Require proof before ship', status: 'pending' },
		{ name: 'commit_checkpoint', detail: 'Legal commit via MCP only', status: 'pending' }
	]);

	const wait = (ms: number) =>
		new Promise((r) => setTimeout(r, prefersReducedMotion() ? Math.min(ms, 120) : ms));

	function resetTools() {
		tools = tools.map((t) => ({ ...t, status: 'pending' }));
	}

	async function markTool(i: number) {
		tools = tools.map((t, idx) =>
			idx === i ? { ...t, status: 'run' } : idx < i ? { ...t, status: 'done' } : t
		);
		await wait(700);
		tools = tools.map((t, idx) => (idx <= i ? { ...t, status: 'done' } : t));
	}

	async function play() {
		if (running) return;
		running = true;
		resetTools();

		beat = 'edit';
		await wait(1100);

		beat = 'raw-git';
		await wait(900);

		beat = 'denied';
		await wait(1400);

		beat = 'mcp';
		await wait(500);
		await markTool(0);
		beat = 'staging';
		await markTool(1);
		beat = 'confidence';
		await markTool(2);
		beat = 'checkpoint';
		await markTool(3);

		beat = 'accepted';
		running = false;
	}

	onMount(() => {
		const t = setTimeout(play, 600);
		return () => clearTimeout(t);
	});

	const phaseLabel: Record<Beat, string> = {
		idle: 'Ready',
		edit: 'Agent edits files',
		'raw-git': 'Agent tries raw git commit',
		denied: 'Blocked — no MCP attestation',
		mcp: 'MCP path starts',
		staging: 'Staging locked',
		confidence: 'Confidence cleared',
		checkpoint: 'Checkpoint via MCP',
		accepted: 'History updated legally'
	};
</script>

<div
	class="overflow-hidden rounded-3xl border border-white/10 bg-[#05070e] shadow-[0_50px_120px_rgba(0,0,0,0.55)]"
	data-ags-animation="mcp-path"
	data-ags-diagram="true"
	data-ags-interaction="replay"
	data-ags-demo="enforcement"
>
	<!-- chrome -->
	<div class="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
		<div>
			<p class="text-xs tracking-[0.18em] text-slate-500 uppercase">Live example</p>
			<p class="text-sm text-slate-200">{phaseLabel[beat]}</p>
		</div>
		<button
			type="button"
			class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-100 disabled:opacity-40"
			onclick={play}
			disabled={running}
		>
			{running ? 'Playing…' : 'Replay'}
		</button>
	</div>

	<div class="grid gap-0 lg:grid-cols-2">
		<!-- left: workspace + shell -->
		<div class="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
			<p class="mb-3 text-xs text-slate-500">Workspace</p>
			<div class="space-y-2">
				<div
					class={`rounded-xl border px-3 py-2 font-mono text-xs transition duration-500 ${
						beat === 'edit' || beat === 'accepted'
							? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-50'
							: 'border-white/10 bg-white/[0.03] text-slate-400'
					}`}
				>
					src/lib/paths.ts
					{#if beat === 'edit'}
						<span class="ml-2 text-cyan-300/80" in:fade>edited</span>
					{/if}
				</div>
				<div class="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-slate-500">
					docs/AGENT_STAGING_PROTOCOL.md
				</div>
			</div>

			<p class="mb-3 mt-6 text-xs text-slate-500">Shell</p>
			<div class="min-h-[8.5rem] rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-xs">
				{#if beat === 'raw-git' || beat === 'denied'}
					<p class="text-violet-200" in:fly={{ y: 6, duration: 200 }}>
						<span class="text-slate-600">$ </span>git commit -m "wip"
					</p>
				{/if}
				{#if beat === 'denied'}
					<p class="mt-2 text-fuchsia-300" in:fly={{ y: 6, duration: 220 }}>
						denied — Enforcement requires MCP
					</p>
					<p class="mt-1 text-fuchsia-200/70">Raw git is not a legal agent path.</p>
				{/if}
				{#if beat === 'checkpoint' || beat === 'accepted'}
					<p class="text-violet-200" in:fly={{ y: 6, duration: 200 }}>
						<span class="text-slate-600">$ </span>commit_checkpoint
					</p>
				{/if}
				{#if beat === 'accepted'}
					<p class="mt-2 text-cyan-300" in:fly={{ y: 6, duration: 220 }}>
						accepted — Enforcement: mcp
					</p>
				{/if}
				{#if beat === 'idle' || beat === 'edit' || beat === 'mcp' || beat === 'staging' || beat === 'confidence'}
					<p class="text-slate-600">Waiting for action…</p>
				{/if}
			</div>
		</div>

		<!-- right: MCP tool strip -->
		<div class="p-5">
			<p class="mb-3 text-xs text-slate-500">Governance MCP</p>
			<ul class="space-y-2">
				{#each tools as tool, i (tool.name)}
					<li
						class={`rounded-xl border px-3 py-2.5 transition duration-500 ${
							tool.status === 'run'
								? 'border-violet-400/50 bg-violet-500/15'
								: tool.status === 'done'
									? 'border-cyan-400/35 bg-cyan-500/10'
									: 'border-white/10 bg-white/[0.02]'
						}`}
					>
						<div class="flex items-center justify-between gap-2">
							<span class="font-mono text-xs text-slate-100">{tool.name}</span>
							<span class="text-[10px] tracking-wide text-slate-500 uppercase">
								{tool.status === 'run' ? 'running' : tool.status === 'done' ? 'ok' : 'idle'}
							</span>
						</div>
						<p class="mt-1 text-xs text-slate-400">{tool.detail}</p>
						{#if tool.status === 'run'}
							<div class="mt-2 h-0.5 overflow-hidden rounded bg-white/10">
								<div class="ags-pulse h-full w-2/3 bg-violet-300/80"></div>
							</div>
						{/if}
					</li>
				{/each}
			</ul>

			{#if beat === 'accepted'}
				<div
					class="mt-4 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-3"
					in:fly={{ y: 8, duration: 280 }}
				>
					<p class="text-sm font-medium text-cyan-50">Legal commit landed</p>
					<p class="mt-1 text-xs leading-relaxed text-cyan-100/75">
						Edits were always allowed. Shipping into history required the MCP path.
					</p>
				</div>
			{:else if beat === 'denied'}
				<div
					class="mt-4 rounded-xl border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-3"
					in:fly={{ y: 8, duration: 280 }}
				>
					<p class="text-sm font-medium text-fuchsia-50">Instruction-only failed</p>
					<p class="mt-1 text-xs leading-relaxed text-fuchsia-100/75">
						Soft prompts are skippable. This gate is not.
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
