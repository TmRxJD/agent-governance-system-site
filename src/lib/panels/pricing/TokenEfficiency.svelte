<script lang="ts">
	const points = [
		{
			title: 'Fewer wasted prompts',
			body: 'Agents stop retrying the same fix or bouncing between guardrails.'
		},
		{
			title: 'Organic guardrails',
			body: 'AGS learns your project and prevents token-heavy reasoning loops.'
		},
		{
			title: 'Scales down cost',
			body: 'As AGS learns, token usage drops, making agents cheaper over time.'
		}
	];
</script>

<section
	id="token-efficiency"
	class="scroll-mt-16 border-y border-white/[0.06] bg-gradient-to-b from-cyan-950/20 to-transparent py-12 sm:py-14"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<p class="text-xs font-semibold tracking-[0.18em] text-cyan-300/90 uppercase">Why AGS</p>
		<h2 class="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
			Token Efficiency & Cost Reduction
		</h2>
		<p class="mt-3 max-w-2xl text-sm leading-snug text-slate-400 sm:text-base">
			AGS reduces token usage by preventing repeated prompts, eliminating agent drift, and enforcing
			organically learned guardrails that keep agents from wasting reasoning cycles.
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
			AGS pays for itself by reducing token consumption as your project grows.
		</p>
	</div>
</section>
