<script lang="ts">
	import PillarCard from './PillarCard.svelte';
	import { base } from '$app/paths';

	export type PillarItem = { title: string; body: string };

	type Props = {
		beforeHeading: string;
		afterHeading: string;
		beforeItems: PillarItem[];
		afterItems: PillarItem[];
		beforeImage: string;
		afterImage: string;
		closing?: string;
	};

	let {
		beforeHeading,
		afterHeading,
		beforeItems,
		afterItems,
		beforeImage,
		afterImage,
		closing
	}: Props = $props();

	function src(path: string) {
		return `${base}${path}`;
	}
</script>

<div class="relative" data-ags-diagram="comparison">
	<div class="grid grid-cols-1 gap-6 min-[700px]:grid-cols-2 min-[700px]:gap-8">
		<!-- Ungoverned -->
		<div
			class="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-gradient-to-b from-[#1a0a16] to-[#0c0712] shadow-[0_28px_70px_rgba(190,24,93,0.14)]"
		>
			<div class="relative h-44 shrink-0 sm:h-52 lg:h-56">
				<img src={src(beforeImage)} alt="" class="h-full w-full object-cover" />
				<div
					class="absolute inset-0 bg-gradient-to-t from-[#0c0712] via-[#0c0712]/60 to-fuchsia-950/35"
				></div>
				<div class="absolute inset-x-0 bottom-0 p-5">
					<p class="text-[10px] font-semibold tracking-[0.22em] text-fuchsia-300 uppercase">
						Ungoverned
					</p>
					<p class="mt-1 text-2xl font-semibold tracking-tight text-white">{beforeHeading}</p>
				</div>
			</div>
			<div class="flex flex-1 flex-col px-5 pb-2 pt-1 sm:px-6">
				{#each beforeItems as item (item.title)}
					<PillarCard variant="before" title={item.title} body={item.body} />
				{/each}
			</div>
		</div>

		<!-- Governed -->
		<div
			class="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-cyan-400/35 bg-gradient-to-b from-[#071820] to-[#071018] shadow-[0_28px_70px_rgba(34,211,238,0.14)]"
		>
			<div class="relative h-44 shrink-0 sm:h-52 lg:h-56">
				<img src={src(afterImage)} alt="" class="h-full w-full object-cover" />
				<div
					class="absolute inset-0 bg-gradient-to-t from-[#071018] via-[#071018]/60 to-cyan-950/35"
				></div>
				<div class="absolute inset-x-0 bottom-0 p-5">
					<p class="text-[10px] font-semibold tracking-[0.22em] text-cyan-300 uppercase">
						Governed
					</p>
					<p class="mt-1 text-2xl font-semibold tracking-tight text-white">{afterHeading}</p>
				</div>
			</div>
			<div class="flex flex-1 flex-col px-5 pb-2 pt-1 sm:px-6">
				{#each afterItems as item (item.title)}
					<PillarCard variant="after" title={item.title} body={item.body} />
				{/each}
			</div>
		</div>
	</div>
</div>

{#if closing}
	<p class="mx-auto mt-14 max-w-lg text-center text-sm text-slate-500">{closing}</p>
{/if}
