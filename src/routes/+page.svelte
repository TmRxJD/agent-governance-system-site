<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import SceneCommitGate from '$lib/scenes/SceneCommitGate.svelte';
	import SceneStaging from '$lib/scenes/SceneStaging.svelte';
	import SceneSemantic from '$lib/scenes/SceneSemantic.svelte';
	import ScenePointer from '$lib/scenes/ScenePointer.svelte';
	import SceneSentinel from '$lib/scenes/SceneSentinel.svelte';
	import SceneShip from '$lib/scenes/SceneShip.svelte';
	import { ENGINES } from '$lib/sim/engine-registry';
	import { href } from '$lib/paths';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/scroll-reveal';
</script>

<svelte:head>
	<title>AGS — Deterministic Governance for Agents, MCP, and Repos</title>
</svelte:head>

<div class="-mx-4">
	<Hero />
	<SceneCommitGate />
	<SceneStaging />
	<SceneSemantic />
	<ScenePointer />
	<SceneSentinel />
	<SceneShip />

	<section class="border-t border-white/5 py-20 sm:py-28" use:scrollReveal id="engines">
		<div class="mx-auto max-w-6xl px-4">
			<p class="text-xs font-semibold tracking-[0.22em] text-violet-300 uppercase">Engines</p>
			<h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">The full system.</h2>
			<p class="mt-3 max-w-xl text-slate-400">
				Each engine has a page: how it works, a live sequence, examples, and docs.
			</p>
			<div class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{#each ENGINES as engine (engine.slug)}
					<a href={href(`/showcase/${engine.slug}/`)} class="group block">
						<GlassPanel
							class="h-full p-4 transition duration-300 group-hover:border-cyan-400/35 group-hover:bg-white/[0.04]"
							padding="p-4"
						>
							<p class="text-xs tracking-wide text-cyan-300/80 uppercase">{engine.shortTitle}</p>
							<p class="mt-1 font-medium text-slate-100">{engine.title}</p>
							<p class="mt-2 text-sm text-slate-500">{engine.blurb}</p>
						</GlassPanel>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<section class="border-t border-white/5 py-20 sm:py-28" use:scrollReveal>
		<div class="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-3xl font-semibold tracking-tight">Get AGS.</h2>
				<p class="mt-2 max-w-md text-slate-400">
					Commercial license or Tower Community. Package on GitHub Packages — not on this site.
				</p>
			</div>
			<div class="flex flex-wrap gap-3">
				<Button href={href('/get/')} variant="neon">Get AGS</Button>
				<Button href={href('/licensing/')} variant="ghost">Licensing</Button>
			</div>
		</div>
	</section>
</div>
