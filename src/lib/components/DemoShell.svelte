<script lang="ts">
	import type { Snippet } from 'svelte';
	import Badge from '$lib/ui/Badge.svelte';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import type { EngineMeta } from '$lib/sim/engine-registry';

	type Props = {
		engine: EngineMeta;
		children: Snippet;
	};

	let { engine, children }: Props = $props();
</script>

<section
	class="space-y-4"
	data-ags-demo={engine.slug}
	data-ags-diagram="true"
	data-ags-animation="true"
>
	<div class="flex flex-wrap items-start justify-between gap-3">
		<div>
			<div class="mb-2 flex flex-wrap gap-2">
				<Badge tone="magenta" label="Simulated" />
				<Badge tone="violet" label={`Wave ${engine.wave}`} />
				<Badge tone="cyan" label={engine.semanticDomain} />
			</div>
			<h1 class="text-2xl font-semibold tracking-tight sm:text-3xl">{engine.title}</h1>
			<p class="mt-2 max-w-2xl text-slate-300">{engine.blurb}</p>
		</div>
	</div>

	<GlassPanel class="overflow-hidden">
		{@render children()}
	</GlassPanel>

	<p class="text-xs text-slate-500">
		Public showcase only — behavior is simulated and does not execute proprietary AGS engine code.
	</p>
</section>
