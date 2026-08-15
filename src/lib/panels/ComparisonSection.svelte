<script lang="ts">
	import type { Snippet } from 'svelte';
	import PillarCard from './PillarCard.svelte';

	export type PillarItem = { title: string; body: string };

	type Props = {
		beforeHeading: string;
		afterHeading: string;
		beforeItems: PillarItem[];
		afterItems: PillarItem[];
		closing?: string;
		intro?: Snippet;
	};

	let { beforeHeading, afterHeading, beforeItems, afterItems, closing, intro }: Props = $props();
</script>

{#if intro}
	<div class="mb-6 max-w-3xl text-base leading-relaxed text-slate-400">
		{@render intro()}
	</div>
{/if}

<div class="grid gap-6 lg:grid-cols-2 lg:gap-8" data-ags-diagram="comparison">
	<div>
		<p class="mb-3 text-[11px] font-semibold tracking-[0.18em] text-fuchsia-300/90 uppercase">
			Ungoverned
		</p>
		<p class="mb-4 text-sm font-medium text-white">{beforeHeading}</p>
		<div class="flex flex-col gap-3">
			{#each beforeItems as item (item.title)}
				<PillarCard variant="before" title={item.title} body={item.body} />
			{/each}
		</div>
	</div>

	<div>
		<p class="mb-3 text-[11px] font-semibold tracking-[0.18em] text-cyan-300/90 uppercase">Governed</p>
		<p class="mb-4 text-sm font-medium text-white">{afterHeading}</p>
		<div class="flex flex-col gap-3">
			{#each afterItems as item (item.title)}
				<PillarCard variant="after" title={item.title} body={item.body} />
			{/each}
		</div>
	</div>
</div>

{#if closing}
	<p class="mt-8 max-w-3xl text-sm leading-relaxed text-slate-400">{closing}</p>
{/if}
