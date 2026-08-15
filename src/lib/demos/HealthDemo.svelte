<script lang="ts">
	type Endpoint = { path: string; status: 'up' | 'degraded' | 'down'; ms: number };

	let endpoints = $state<Endpoint[]>([
		{ path: '/health', status: 'up', ms: 12 },
		{ path: '/mcp/tower', status: 'up', ms: 45 },
		{ path: '/mcp/tower-gov', status: 'up', ms: 38 },
		{ path: '/metrics', status: 'degraded', ms: 210 }
	]);

	let ticking = $state(true);

	function tick() {
		endpoints = endpoints.map((e) => {
			const jitter = Math.floor(Math.random() * 40) - 10;
			const ms = Math.max(8, e.ms + jitter);
			let status: Endpoint['status'] = 'up';
			if (ms > 180) status = 'degraded';
			if (ms > 350) status = 'down';
			return { ...e, ms, status };
		});
	}

	$effect(() => {
		if (!ticking) return;
		const timer = setInterval(tick, 1200);
		return () => clearInterval(timer);
	});

	const colors = { up: 'text-cyan-300 border-cyan-400/40', degraded: 'text-fuchsia-300 border-fuchsia-400/40', down: 'text-red-300 border-red-400/40' };
</script>

<div class="space-y-4" data-ags-demo="health">
	<div class="flex items-center justify-between">
		<h3 class="text-sm font-medium text-cyan-200">Endpoint probes</h3>
		<button
			type="button"
			class="text-xs text-violet-300 hover:text-violet-100"
			onclick={() => (ticking = !ticking)}
		>
			{ticking ? 'Pause' : 'Resume'} simulation
		</button>
	</div>

	<ul class="space-y-2">
		{#each endpoints as ep (ep.path)}
			<li
				class="flex items-center justify-between rounded-lg border bg-black/25 px-3 py-2 transition-all duration-300 {colors[ep.status]}"
				class:opacity-40={!ticking}
			>
				<span class="font-mono text-xs">{ep.path}</span>
				<span class="flex items-center gap-3 text-xs">
					<span class="inline-block h-2 w-2 rounded-full bg-current animate-pulse"></span>
					{ep.status} · {ep.ms}ms
				</span>
			</li>
		{/each}
	</ul>
</div>
