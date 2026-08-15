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
	<section class="px-4 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-24 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-sm font-medium tracking-wide text-cyan-300/90">Agent Governance System</p>
			<h1 class="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.08]">
				Turn chaotic AI-assisted development into governed engineering.
			</h1>
			<p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
				AGS keeps agents disciplined, repos coherent, and delivery predictable — as one system.
			</p>
			<div class="mt-8 flex flex-wrap justify-center gap-3">
				<Button href="#discipline" variant="neon">See how AGS governs AI coding</Button>
				<Button href={href('/get/')} variant="ghost">Get AGS</Button>
			</div>
		</div>
	</section>

	<SectionDiscipline />
	<SectionRepo />
	<SectionDelivery />
	<SectionAdditionalEngines />

	<section class="border-t border-white/[0.06] px-4 py-14 sm:px-6 lg:px-8">
		<div
			class="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/10 via-violet-500/5 to-transparent px-6 py-8 sm:flex-row sm:items-center sm:px-8"
		>
			<div>
				<h2 class="text-2xl font-semibold tracking-tight text-white">Get AGS</h2>
				<p class="mt-2 text-lg font-medium text-slate-200">Start coding with governed agents.</p>
				<p class="mt-2 max-w-md text-slate-400">
					Install AGS, load your project rules, and keep AI work consistent as you scale.
				</p>
			</div>
			<div class="flex flex-wrap gap-3">
				<Button href={href('/get/')} variant="neon">Get AGS</Button>
				<Button href={href('/licensing/')} variant="ghost">Licensing</Button>
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
				<a class="hover:text-cyan-300" href={href('/get/')}>Get AGS</a>
			</nav>
		</div>
	</footer>
</div>
