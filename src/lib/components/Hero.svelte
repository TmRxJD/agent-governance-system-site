<script lang="ts">
	import { href } from '$lib/paths';
	import Button from '$lib/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/scroll-reveal';
</script>

<section class="relative overflow-hidden px-4 pb-8 pt-16 sm:pt-24" use:scrollReveal>
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl"
		></div>
		<div
			class="absolute right-0 top-20 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl"
		></div>
	</div>

	<div class="mx-auto max-w-6xl">
		<p class="text-xs font-semibold tracking-[0.24em] text-cyan-300 uppercase">Agent Governance System</p>
		<h1 class="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl sm:leading-[1.05]">
			Deterministic governance for agents, MCP, and repos.
		</h1>
		<p class="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
			Staging, Semantic, Pointer, Sentinel, Versioning, and Deployment — one system that sits on the commit and
			release path.
		</p>
		<div class="mt-10 flex flex-wrap gap-3">
			<Button href="#commit-gate" variant="neon">See it work</Button>
			<Button href={href('/get/')} variant="ghost">Get AGS</Button>
			<Button href={href('/docs/')} variant="primary">Docs</Button>
		</div>
	</div>
</section>
