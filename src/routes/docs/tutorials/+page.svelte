<script lang="ts">
	import { href } from '$lib/paths';
	import { tutorialTracks } from '$lib/docs/tutorials/types';
	import { tutorials, tutorialsInTrack } from '$lib/docs/tutorials/entries';
</script>

<section class="not-prose">
	<h1 class="text-3xl font-semibold tracking-tight text-white">Tutorials</h1>
	<p class="mt-3 max-w-2xl text-base text-slate-400">
		Hands-on guides for every AGS surface you will call from code, hooks, CLI, or MCP — install and
		host wiring, the commit loop, structure graphs, delivery, token intelligence, ops, and licensing.
		Work a track in order; each page shows imports, tools, config, and what success looks like.
	</p>
	<p class="mt-2 text-sm text-slate-500">{tutorials.length} tutorials across {tutorialTracks.length} tracks.</p>

	<div class="mt-10 space-y-12">
		{#each tutorialTracks as track (track.id)}
			{@const items = tutorialsInTrack(track.id)}
			<section id={track.id} class="scroll-mt-24">
				<div class="border-b border-white/[0.08] pb-3">
					<h2 class="text-lg font-semibold text-white">{track.title}</h2>
					<p class="mt-1 text-sm text-slate-500">{track.blurb}</p>
				</div>
				<ul class="mt-4 divide-y divide-white/[0.06]">
					{#each items as item (item.slug)}
						<li>
							<a
								href={href(`/docs/tutorials/${item.slug}/`)}
								class="group flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
							>
								<span class="font-medium text-cyan-200/90 group-hover:text-cyan-100">
									{item.title}
								</span>
								<span
									class="text-sm text-slate-500 group-hover:text-slate-400 sm:max-w-md sm:text-right"
									>{item.summary}</span
								>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</section>
