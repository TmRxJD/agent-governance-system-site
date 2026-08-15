<script lang="ts">
	import VisualMcpPath from '$lib/scenes/VisualMcpPath.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { href } from '$lib/paths';
	import { scrollReveal } from '$lib/animations/scroll-reveal';
</script>

<svelte:head>
	<title>AGS — Governance that agents cannot skip</title>
</svelte:head>

<div class="-mx-4">
	<!-- What it is / problem — plain language, no engine laundry list -->
	<section class="px-4 pb-6 pt-20 sm:pt-28" use:scrollReveal>
		<div class="mx-auto max-w-2xl text-center">
			<p class="text-sm text-cyan-300/90">Agent Governance System</p>
			<h1 class="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
				Rules for AI coding agents that cannot be skipped.
			</h1>
			<p class="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-slate-400">
				Agents can edit your project freely. Soft instructions do not stop a bad ship. AGS makes the legal
				path mechanical — through MCP tools, not hope.
			</p>
		</div>
	</section>

	<section class="px-4 py-10 sm:py-14" use:scrollReveal>
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-sm text-slate-500">The problem</p>
			<p class="mt-3 text-xl font-medium leading-snug text-slate-200 sm:text-2xl">
				If governance lives only in a prompt, the agent can ignore it.
			</p>
			<p class="mx-auto mt-4 max-w-xl text-slate-400">
				AGS attaches enforcement to the only paths that matter: how work is classified, proven, and recorded.
				Unattested work does not become history.
			</p>
		</div>
	</section>

	<!-- ONE scene -->
	<section id="example" class="scroll-mt-20 px-4 pb-24 pt-6" use:scrollReveal>
		<div class="mx-auto mb-8 max-w-3xl">
			<p class="text-sm text-cyan-300/90">Example · Enforcement path</p>
			<h2 class="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
				Edits are easy. Landing a commit is not — unless MCP says so.
			</h2>
			<p class="mt-3 max-w-2xl text-slate-400">
				This is one loop AGS runs: deny raw git, then require staging and confidence before a checkpoint.
				Replay it.
			</p>
		</div>
		<div class="mx-auto max-w-5xl">
			<VisualMcpPath />
		</div>
	</section>

	<section class="border-t border-white/[0.06] px-4 py-16">
		<div class="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
			<p class="text-slate-400">More of the system comes next — one scene at a time.</p>
			<div class="flex flex-wrap justify-center gap-3">
				<Button href={href('/docs/')} variant="ghost">Docs</Button>
				<Button href={href('/get/')} variant="neon">Get AGS</Button>
			</div>
		</div>
	</section>
</div>
