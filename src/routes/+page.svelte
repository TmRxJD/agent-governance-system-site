<script lang="ts">
	import Button from '$lib/ui/Button.svelte';
	import SectionDiscipline from '$lib/panels/SectionDiscipline.svelte';
	import SectionRepo from '$lib/panels/SectionRepo.svelte';
	import SectionDelivery from '$lib/panels/SectionDelivery.svelte';
	import SectionAdditionalEngines from '$lib/panels/SectionAdditionalEngines.svelte';
	import { href } from '$lib/paths';
</script>

<svelte:head>
	<title>AGS — Governed AI-assisted engineering</title>
</svelte:head>

<div>
	<!-- Hero -->
	<section class="px-4 pb-14 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-sm font-medium tracking-wide text-cyan-300/90">Agent Governance System</p>
			<h1 class="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.08]">
				Turn chaotic AI-assisted development into governed engineering.
			</h1>
			<p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
				AGS keeps agents disciplined, repos coherent, and delivery predictable — as one system.
			</p>
			<div class="mt-10 flex flex-wrap justify-center gap-3">
				<Button href="#discipline" variant="neon">See how AGS governs AI coding</Button>
				<Button href={href('/get/')} variant="ghost">Get AGS</Button>
			</div>
		</div>
	</section>

	<SectionDiscipline />
	<SectionRepo />
	<SectionDelivery />
	<SectionAdditionalEngines />

	<!-- Get AGS callout — centered -->
	<section class="border-t border-white/[0.06] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
		<div class="mx-auto max-w-xl text-center">
			<h2 class="text-3xl font-semibold tracking-tight text-white">Get AGS</h2>
			<p class="mt-3 text-lg font-medium text-slate-200">Start coding with governed agents.</p>
			<p class="mt-3 text-base leading-relaxed text-slate-400">
				Install AGS, load your project rules, and keep AI work consistent as you scale.
			</p>
			<div class="mt-8 flex justify-center">
				<Button href={href('/get/')} variant="neon">Get AGS</Button>
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
