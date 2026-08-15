<script lang="ts">
	import { href } from '$lib/paths';
	import { docsNav } from '$lib/docs/nav';
</script>

<section class="not-prose">
	<h1 class="text-3xl font-semibold tracking-tight text-white">Documentation</h1>
	<p class="mt-3 max-w-2xl text-base text-slate-400">
		Install AGS, wire your repo, and learn how governance keeps agents consistent from edit to ship.
	</p>

	<div class="mt-10 space-y-10">
		{#each docsNav as domain (domain.id)}
			<section id={domain.id} class="scroll-mt-24">
				<div class="border-b border-white/[0.08] pb-3">
					<h2 class="text-lg font-semibold text-white">{domain.title}</h2>
					<p class="mt-1 text-sm text-slate-500">{domain.blurb}</p>
				</div>
				<ul class="mt-4 divide-y divide-white/[0.06]">
					{#each domain.pages as item (item.href)}
						<li>
							<a
								href={href(item.href)}
								class="group flex flex-col gap-0.5 py-3 transition sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
							>
								<span class="font-medium text-cyan-200/90 group-hover:text-cyan-100"
									>{item.title}</span
								>
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
