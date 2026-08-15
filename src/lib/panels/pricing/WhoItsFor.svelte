<script lang="ts">
	const blocks = [
		{
			name: 'Free',
			body: 'For hobbyists, experimentation, and small projects.'
		},
		{
			name: 'Personal',
			body: 'For individual developers who want full agent and repo intelligence.'
		},
		{
			name: 'Enterprise',
			body: 'For teams and companies that need governed delivery pipelines.'
		}
	];
</script>

<section id="who" class="scroll-mt-16 py-12 sm:py-14">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<h2 class="text-xl font-semibold tracking-tight text-white">Who it’s for</h2>
		<div class="mt-6 grid gap-4 md:grid-cols-3">
			{#each blocks as b (b.name)}
				<div class="rounded-xl border border-white/10 bg-white/[0.02] p-5">
					<h3 class="text-sm font-semibold text-white">{b.name}</h3>
					<p class="mt-2 text-sm leading-snug text-slate-400">{b.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

