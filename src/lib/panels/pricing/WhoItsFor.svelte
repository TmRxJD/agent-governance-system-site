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

<section id="who" class="scroll-mt-20 py-16 sm:py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<h2 class="text-2xl font-semibold tracking-tight text-white">Who it’s for</h2>
		<div class="mt-10 grid gap-5 md:grid-cols-3">
			{#each blocks as b (b.name)}
				<div class="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
					<h3 class="text-base font-semibold text-white">{b.name}</h3>
					<p class="mt-3 text-sm leading-snug text-slate-400">{b.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
