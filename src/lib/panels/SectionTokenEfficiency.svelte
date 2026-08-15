<script lang="ts">
	import { href } from '$lib/paths';
</script>

<section
	id="token-efficiency"
	class="scroll-mt-20 border-y border-white/[0.06] bg-gradient-to-b from-cyan-950/25 via-black/20 to-transparent py-14 sm:py-20"
>
	<div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
		<p class="text-xs font-semibold tracking-[0.18em] text-cyan-300/90 uppercase">The hook</p>
		<h2 class="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
			Token Efficiency as a First-Class Feature
		</h2>
		<div class="mt-6 space-y-4 text-left text-sm leading-relaxed text-slate-400 sm:text-base">
			<p>
				Agents waste tokens when they repeat fixes, chase symptoms, or reason in circles. AGS
				prevents this by learning your project’s structure and building organic guardrails that stop
				wasted reasoning before it happens.
			</p>
			<p>
				As AGS grows with your codebase, it becomes more token-efficient — reducing cost, extending
				agent throughput, and preventing runaway usage.
			</p>
			<p class="font-medium text-slate-300">
				This is the closest thing to an agent that compartmentalizes your project and works smarter
				over time.
			</p>
		</div>
		<p class="mt-8 text-sm font-medium text-cyan-200/90">
			More output per dollar. Less wasted reasoning.
		</p>
		<div class="mt-6">
			<a
				href={href('/pricing/#token-efficiency')}
				class="text-sm text-cyan-300/90 underline-offset-4 hover:text-cyan-200 hover:underline"
				>See token efficiency on pricing →</a
			>
		</div>
	</div>
</section>
