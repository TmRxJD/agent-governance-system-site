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

<!-- Force side-by-side from md up; never stack columns on tablet/desktop -->
<div
	class="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8"
	data-ags-diagram="comparison"
>
	<!-- Ungoverned column -->
	<div
		class="overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-[#0c0712] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
	>
		<div class="relative h-36 sm:h-44">
			<img
				src={src(beforeImage)}
				alt=""
				class="h-full w-full object-cover opacity-70"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-[#0c0712] via-[#0c0712]/50 to-fuchsia-950/30"></div>
			<div class="absolute bottom-3 left-4 right-4">
				<p class="text-[11px] font-semibold tracking-[0.2em] text-fuchsia-300 uppercase">Ungoverned</p>
				<p class="text-lg font-semibold text-white">{beforeHeading}</p>
			</div>
		</div>
		<div class="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
			{#each beforeItems as item (item.title)}
				<PillarCard variant="before" title={item.title} body={item.body} />
			{/each}
		</div>
	</div>

	<!-- Governed column -->
	<div
		class="overflow-hidden rounded-2xl border border-cyan-400/35 bg-[#071018] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
	>
		<div class="relative h-36 sm:h-44">
			<img src={src(afterImage)} alt="" class="h-full w-full object-cover opacity-70" />
			<div class="absolute inset-0 bg-gradient-to-t from-[#071018] via-[#071018]/50 to-cyan-950/30"></div>
			<div class="absolute bottom-3 left-4 right-4">
				<p class="text-[11px] font-semibold tracking-[0.2em] text-cyan-300 uppercase">Governed</p>
				<p class="text-lg font-semibold text-white">{afterHeading}</p>
			</div>
		</div>
		<div class="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
			{#each afterItems as item (item.title)}
				<PillarCard variant="after" title={item.title} body={item.body} />
			{/each}
		</div>
	</div>
</div>

{#if closing}
	<p class="mt-10 text-center text-sm font-medium tracking-wide text-slate-400">{closing}</p>
{/if}
