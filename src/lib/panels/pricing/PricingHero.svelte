<script lang="ts">
	import { base } from '$app/paths';
</script>

<header class="relative overflow-hidden border-b border-white/[0.06]">
	<div class="absolute inset-0">
		<img
			src={`${base}/media/pricing-hero.jpg`}
			alt=""
			class="h-full w-full object-cover opacity-25"
		/>
		<div class="absolute inset-0 bg-gradient-to-b from-[#06080f]/50 via-[#06080f]/85 to-[#06080f]"></div>
	</div>
	<div class="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
		<p class="text-sm font-medium tracking-wide text-cyan-300/90">Pricing</p>
		<h1 class="mt-1 max-w-2xl text-xl font-semibold tracking-tight text-white sm:text-2xl">
			Plans that stay useful as your AI bill grows
		</h1>
		<p class="mt-2 max-w-xl text-sm text-slate-400">
			Pick Free, Personal, or Enterprise. Each tier unlocks more of the system that keeps agents
			on-track — and less wasteful.
		</p>
	</div>
</header>
