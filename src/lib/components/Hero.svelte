<script lang="ts">
	import { href } from '$lib/paths';
	import Button from '$lib/ui/Button.svelte';
</script>

<section class="relative overflow-hidden px-4 pb-10 pt-20 sm:pt-28">
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div class="absolute left-1/2 top-0 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl"></div>
		<div class="absolute right-0 top-40 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"></div>
	</div>

	<div class="mx-auto max-w-3xl text-center">
		<p class="text-sm text-cyan-300/90">Agent Governance System</p>
		<h1 class="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl sm:leading-[1.05]">
			Keep AI coding agents honest with your repository.
		</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
			AGS sits between an agent and git. Bad commits stop. Clear commits pass. Releases move only when checks
			pass.
		</p>
		<div class="mt-10 flex flex-wrap justify-center gap-3">
			<Button href="#story" variant="neon">See a real commit</Button>
			<Button href={href('/get/')} variant="ghost">Get AGS</Button>
		</div>
	</div>
</section>
