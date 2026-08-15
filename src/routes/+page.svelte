<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import VisualCommitStory from '$lib/scenes/VisualCommitStory.svelte';
	import VisualSplitDiff from '$lib/scenes/VisualSplitDiff.svelte';
	import VisualContradiction from '$lib/scenes/VisualContradiction.svelte';
	import VisualPipeline from '$lib/scenes/VisualPipeline.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { href } from '$lib/paths';
	import { scrollReveal } from '$lib/animations/scroll-reveal';

	const insides = [
		{
			title: 'Commit rules',
			body: 'Stops incomplete commits. Accepts scoped checkpoints.',
			href: '/showcase/staging/'
		},
		{
			title: 'Meaning checks',
			body: 'Catches claims that cannot both be true.',
			href: '/showcase/semantic-graph/'
		},
		{
			title: 'Repo map',
			body: 'Knows which files own which rules.',
			href: '/showcase/pointer-map/'
		},
		{
			title: 'Auto response',
			body: 'When something breaks a rule, a fixed reaction runs.',
			href: '/showcase/reflex-arcs/'
		},
		{
			title: 'Versions',
			body: 'Turns change sets into tags and notes.',
			href: '/showcase/versioning/'
		},
		{
			title: 'Release path',
			body: 'Moves builds through environments with checks.',
			href: '/showcase/deployment/'
		}
	];
</script>

<svelte:head>
	<title>AGS — Keep AI coding agents honest with your repository</title>
</svelte:head>

<div class="-mx-4">
	<Hero />

	<!-- Problem: full-bleed quiet strip -->
	<section class="border-y border-white/[0.06] bg-black/20 py-16" use:scrollReveal>
		<div class="mx-auto max-w-3xl px-4 text-center">
			<p class="text-sm text-slate-500">The problem</p>
			<p class="mt-4 text-2xl font-medium leading-snug text-slate-200 sm:text-3xl">
				Agents can open PRs and write commits faster than anyone can review the trail.
			</p>
			<p class="mx-auto mt-4 max-w-xl text-slate-400">
				Without a gate, history fills with vague messages, mixed changes, and “done” claims nobody approved.
			</p>
		</div>
	</section>

	<!-- Story 1: commit — visual first, copy below on mobile / beside on desktop -->
	<section id="story" class="scroll-mt-20 py-20 sm:py-28" use:scrollReveal>
		<div class="mx-auto max-w-6xl px-4">
			<div class="mb-10 max-w-xl">
				<p class="text-sm text-cyan-300/90">1 · In the terminal</p>
				<h2 class="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
					Watch a bad commit stop — then a good one land.
				</h2>
				<p class="mt-3 text-slate-400">
					Press Replay. The first attempt fails. The second succeeds. Nothing here is a real git call —
					it’s the pattern AGS enforces.
				</p>
			</div>
			<VisualCommitStory />
		</div>
	</section>

	<!-- Story 2: split — alternating layout -->
	<section class="bg-gradient-to-b from-violet-500/[0.04] to-transparent py-20 sm:py-28" use:scrollReveal>
		<div class="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr]">
			<div>
				<p class="text-sm text-violet-300/90">2 · In the working tree</p>
				<h2 class="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
					One agent turn. Three kinds of change. Three outcomes.
				</h2>
				<p class="mt-3 text-slate-400">
					Edits, new files, and mixed bundles don’t share a commit. The board shows them separate as the
					system would.
				</p>
			</div>
			<VisualSplitDiff />
		</div>
	</section>

	<!-- Story 3: contradiction — centered stage -->
	<section class="py-20 sm:py-28" use:scrollReveal>
		<div class="mx-auto max-w-3xl px-4 text-center">
			<p class="text-sm text-fuchsia-300/90">3 · In the claims</p>
			<h2 class="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
				If two statements can’t both be true, the change holds.
			</h2>
			<p class="mx-auto mt-3 max-w-lg text-slate-400">
				Example: calling a feature finished while marking it unapproved.
			</p>
			<div class="mt-10 text-left">
				<VisualContradiction />
			</div>
		</div>
	</section>

	<!-- Story 4: pipeline — wide visual -->
	<section class="border-y border-white/[0.06] bg-black/25 py-20 sm:py-28" use:scrollReveal>
		<div class="mx-auto max-w-6xl px-4">
			<div class="mx-auto mb-10 max-w-2xl text-center">
				<p class="text-sm text-cyan-300/90">4 · On the way to production</p>
				<h2 class="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
					Releases advance one green step at a time.
				</h2>
			</div>
			<VisualPipeline />
		</div>
	</section>

	<!-- What's inside — plain language, after the story -->
	<section id="inside" class="py-20 sm:py-28" use:scrollReveal>
		<div class="mx-auto max-w-6xl px-4">
			<p class="text-sm text-slate-500">What’s inside</p>
			<h2 class="mt-2 max-w-xl text-3xl font-semibold tracking-tight text-white">
				Six jobs. Same system.
			</h2>
			<p class="mt-3 max-w-lg text-slate-400">
				You don’t need the internal names up front. These are the jobs people actually feel.
			</p>
			<div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each insides as item (item.title)}
					<a
						href={href(item.href)}
						class="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.04]"
					>
						<h3 class="font-medium text-white group-hover:text-cyan-100">{item.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
						<span class="mt-4 inline-block text-xs text-cyan-400/80 opacity-0 transition group-hover:opacity-100"
							>Details →</span
						>
					</a>
				{/each}
			</div>
			<p class="mt-8 text-sm text-slate-500">
				<a class="text-slate-400 underline-offset-4 hover:text-cyan-300 hover:underline" href={href('/showcase/')}
					>Full catalog</a
				>
				· for people who already know the engine names.
			</p>
		</div>
	</section>

	<section class="border-t border-white/[0.06] py-20" use:scrollReveal>
		<div class="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center">
			<h2 class="text-3xl font-semibold tracking-tight text-white">Install the package. Keep the source private.</h2>
			<p class="max-w-md text-slate-400">
				Commercial license or Tower Community. Distributed on GitHub Packages.
			</p>
			<div class="flex flex-wrap justify-center gap-3">
				<Button href={href('/get/')} variant="neon">Get AGS</Button>
				<Button href={href('/docs/')} variant="ghost">Docs</Button>
			</div>
		</div>
	</section>
</div>
