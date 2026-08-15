<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlaybackControls from '$lib/components/PlaybackControls.svelte';
	import { createPlayback } from '$lib/animations/playback';

	const roles = ['agent', 'maintainer', 'ci-bot'] as const;
	const actions = ['commit', 'deploy', 'rollback', 'read-secrets'] as const;

	const matrix: Record<(typeof roles)[number], Record<(typeof actions)[number], boolean>> = {
		agent: { commit: true, deploy: false, rollback: false, 'read-secrets': false },
		maintainer: { commit: true, deploy: true, rollback: true, 'read-secrets': true },
		'ci-bot': { commit: true, deploy: true, rollback: false, 'read-secrets': false }
	};

	const playback = createPlayback(['Request: deploy', 'Check matrix', 'Denied', 'Escalation'], 1);
	onDestroy(() => playback.destroy());

	let frame = $state(0);
	let activeRole = $state<(typeof roles)[number]>('agent');
	$effect(() => playback.state.subscribe((s) => (frame = s.frame)));

	const action = $derived('deploy' as const);
	const allowed = $derived(matrix[activeRole][action]);
</script>

<div class="space-y-4" data-ags-demo="access">
	<PlaybackControls {playback} title="Access gate" />

	<div class="flex flex-wrap gap-2">
		{#each roles as r}
			<button
				type="button"
				class="rounded-lg border px-3 py-1 text-xs
          {activeRole === r ? 'border-violet-400/60 bg-violet-500/15 text-violet-100' : 'border-white/10 text-slate-400'}"
				onclick={() => (activeRole = r)}
			>
				{r}
			</button>
		{/each}
	</div>

	<table class="w-full text-xs">
		<thead>
			<tr class="text-slate-500">
				<th class="py-1 text-left">Action</th>
				{#each roles as r}
					<th class="py-1">{r}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each actions as act}
				<tr class="border-t border-white/5">
					<td class="py-2 text-slate-300">{act}</td>
					{#each roles as r}
						<td class="py-2 text-center">
							<span class={matrix[r][act] ? 'text-cyan-300' : 'text-slate-600'}>
								{matrix[r][act] ? '✓' : '—'}
							</span>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<p class="text-xs {frame >= 2 && !allowed ? 'text-fuchsia-300 animate-pulse' : 'text-cyan-300'}">
		{frame >= 2 && !allowed ? `Blocked: ${activeRole} cannot ${action}` : frame >= 3 ? 'Escalated to maintainer (simulated)' : `Evaluating ${action} for ${activeRole}…`}
	</p>
</div>
