<script lang="ts">
	import Button from '$lib/ui/Button.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import SectionDiscipline from '$lib/panels/SectionDiscipline.svelte';
	import SectionTokenEfficiency from '$lib/panels/SectionTokenEfficiency.svelte';
	import SectionRepo from '$lib/panels/SectionRepo.svelte';
	import SectionDelivery from '$lib/panels/SectionDelivery.svelte';
	import SectionAdditionalEngines from '$lib/panels/SectionAdditionalEngines.svelte';
	import { href } from '$lib/paths';
	import { base } from '$app/paths';
</script>

<SeoHead
	title="AGS — Keep AI coding on track"
	description="AGS helps coding agents stay consistent, waste fewer tokens, and keep your codebase coherent."
/>

<div>
	<section class="relative overflow-hidden border-b border-white/[0.06]">
		<div class="absolute inset-0">
			<img
				src={`${base}/media/hero.jpg`}
				alt=""
				class="h-full w-full object-cover opacity-80 brightness-110 contrast-105 saturate-110"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-b from-[#06080f]/35 via-[#06080f]/55 to-[#06080f]"
			></div>
			<div
				class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(34,211,238,0.22),transparent_55%)]"
			></div>
		</div>
		<div
			class="relative mx-auto max-w-3xl px-4 pb-20 pt-24 text-center sm:px-6 sm:pb-28 sm:pt-32 lg:px-8"
		>
			<img
				src={`${base}/media/ags-logo.png`}
				alt=""
				width="72"
				height="40"
				class="mx-auto h-14 w-auto object-contain drop-shadow-[0_0_24px_rgba(34,211,238,0.25)]"
			/>
			<p class="mt-4 text-sm font-medium tracking-wide text-cyan-300/90">Agent Governance System</p>
			<h1 class="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.08]">
				Keep AI coding on track — without burning your budget
			</h1>
			<p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-200">
				AGS helps agents follow your project’s real rules, redo less work, and stay consistent from
				edit to ship.
			</p>
			<div class="mt-10 flex flex-wrap justify-center gap-3">
				<Button href="#token-efficiency" variant="neon">See how it saves</Button>
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
			<img src={`${base}/media/ship.jpg`} alt="" class="h-full w-full object-cover opacity-25" />
			<div class="absolute inset-0 bg-[#06080f]/85"></div>
			<div
				class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(34,211,238,0.12),transparent_60%)]"
			></div>
		</div>
		<div class="relative mx-auto max-w-xl px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8">
			<h2 class="text-3xl font-semibold tracking-tight text-white">Ready to run governed agents</h2>
			<p class="mt-3 text-base leading-relaxed text-slate-400">
				Review plans, install the package, and keep AI work consistent as you scale.
			</p>
			<div class="mt-8 flex flex-wrap justify-center gap-3">
				<Button href={href('/pricing/')} variant="neon">View pricing</Button>
				<Button href={href('/docs/')} variant="ghost">Read the docs</Button>
			</div>
		</div>
	</section>

	<footer class="border-t border-white/[0.06] px-4 py-10 sm:px-6 lg:px-8">
		<div class="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-sm text-slate-500">Agent Governance System</p>
			<nav class="flex flex-wrap gap-4 text-sm text-slate-400">
				<a class="hover:text-cyan-300" href={href('/docs/')}>Docs</a>
				<a class="hover:text-cyan-300" href={href('/pricing/')}>Pricing</a>
				<a class="hover:text-cyan-300" href={href('/licensing/')}>License</a>
				<a class="hover:text-cyan-300" href={href('/privacy/')}>Privacy</a>
				<a class="hover:text-cyan-300" href={href('/terms/')}>Terms</a>
				<a
					class="hover:text-cyan-300"
					href="https://github.com/TmRxJD/agent-governance-system-site"
					rel="noreferrer"
					target="_blank">GitHub</a
				>
			</nav>
		</div>
	</footer>
</div>
