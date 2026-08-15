<script lang="ts">
	const points = [
		{
			title: 'Fewer dead-end retries',
			body: 'The agent stops looping on the same broken fix and moves on with context that sticks.'
		},
		{
			title: 'Rules that fit your repo',
			body: 'AGS learns how your project is structured so the agent asks less and guesses less.'
		},
		{
			title: 'Cheaper over time',
			body: 'As those rules settle in, each session uses fewer tokens for the same kind of work.'
		}
	];
</script>

<section
	id="token-efficiency"
	class="scroll-mt-16 border-y border-white/[0.06] bg-gradient-to-b from-cyan-950/20 to-transparent py-12 sm:py-14"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<p class="text-sm font-medium tracking-wide text-cyan-300/90">AI cost control</p>
		<h2 class="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
			Built to waste fewer tokens
		</h2>
		<p class="mt-3 max-w-2xl text-sm leading-snug text-slate-400 sm:text-base">
			Most of your AI spend isn’t “smart work” — it’s retries, confusion, and re-explaining the same
			project. AGS cuts that noise so more of your budget becomes finished code.
		</p>

		<div class="mt-8 grid gap-4 sm:grid-cols-3">
			{#each points as p (p.title)}
				<div class="rounded-xl border border-cyan-400/20 bg-black/30 p-5">
					<h3 class="text-sm font-semibold text-white">{p.title}</h3>
					<p class="mt-2 text-sm leading-snug text-slate-400">{p.body}</p>
				</div>
			{/each}
		</div>

		<p class="mt-8 text-center text-base font-medium text-cyan-200/95 sm:text-lg">
			Many teams find AGS costs less than the tokens it saves.
		</p>
	</div>
</section>
