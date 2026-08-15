<script lang="ts">
	import Button from '$lib/ui/Button.svelte';
	import SectionDiscipline from '$lib/panels/SectionDiscipline.svelte';
	import SectionTokenEfficiency from '$lib/panels/SectionTokenEfficiency.svelte';
	import SectionRepo from '$lib/panels/SectionRepo.svelte';
	import SectionDelivery from '$lib/panels/SectionDelivery.svelte';
	import SectionAdditionalEngines from '$lib/panels/SectionAdditionalEngines.svelte';
	import { href } from '$lib/paths';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>AGS — More agent output per dollar</title>
	<meta
		name="description"
		content="AGS cuts token waste, stops agent drift, and turns AI-assisted development into governed engineering."
	/>
</svelte:head>

<div>
	<!-- Hero with stock visual -->
	<section class="relative overflow-hidden border-b border-white/[0.06]">
		<div class="absolute inset-0">
			<img
				src={`${base}/media/hero.jpg`}
				alt=""
				class="h-full w-full object-cover opacity-35"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-b from-[#06080f]/70 via-[#06080f]/85 to-[#06080f]"
			></div>
		</div>
		<div class="relative mx-auto max-w-3xl px-4 pb-20 pt-24 text-center sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
			<p class="text-sm font-medium tracking-wide text-cyan-300/90">Agent Governance System</p>
			<h1 class="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.08]">
				Cut agent token waste. Get more output per dollar.
			</h1>
			<p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
				AGS reduces repeated prompts and runaway reasoning — then keeps agents disciplined, repos
				coherent, and delivery predictable.
			</p>
			<div class="mt-10 flex flex-wrap justify-center gap-3">
				<Button href="#token-efficiency" variant="neon">See token efficiency</Button>
				<Button href={href('/pricing/')} variant="ghost">Pricing</Button>
			</div>
		</div>
	</section>

	<SectionDiscipline />
	<SectionTokenEfficiency />
	<SectionRepo />
	<SectionDelivery />
	<SectionAdditionalEngines />

	<section class="relative overflow-hidden border-t border-white/[0.06]">
		<div class="absolute inset-0">
			<img src={`${base}/media/ship.jpg`} alt="" class="h-full w-full object-cover opacity-20" />
			<div class="absolute inset-0 bg-[#06080f]/85"></div>
		</div>
		<div class="relative mx-auto max-w-xl px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8">
			<h2 class="text-3xl font-semibold tracking-tight text-white">Get AGS</h2>
			<p class="mt-3 text-lg font-medium text-slate-200">Start coding with governed agents.</p>
			<p class="mt-3 text-base leading-relaxed text-slate-400">
				Install AGS, load your project rules, and keep AI work consistent as you scale.
			</p>
			<div class="mt-8 flex flex-wrap justify-center gap-3">
				<Button href={href('/pricing/')} variant="neon">View pricing</Button>
				<Button href={href('/get/')} variant="ghost">Get AGS</Button>
			</div>
		</div>
	</section>

	<footer class="border-t border-white/[0.06] px-4 py-10 sm:px-6 lg:px-8">
		<div class="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-sm text-slate-500">Agent Governance System</p>
			<nav class="flex flex-wrap gap-4 text-sm text-slate-400">
				<a class="hover:text-cyan-300" href={href('/docs/')}>Docs</a>
				<a
					class="hover:text-cyan-300"
					href="https://github.com/TmRxJD/agent-governance-system-site"
					rel="noreferrer"
					target="_blank">GitHub</a
				>
				<a class="hover:text-cyan-300" href={href('/licensing/')}>License</a>
				<a class="hover:text-cyan-300" href={href('/get/')}>Contact</a>
			</nav>
		</div>
	</footer>
</div>
