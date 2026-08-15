<script lang="ts">
	import { href } from '$lib/paths';
	import { base } from '$app/paths';
</script>

<section id="token-efficiency" class="relative scroll-mt-20 overflow-hidden border-y border-cyan-400/20">
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<img
			src={`${base}/media/order.jpg`}
			alt=""
			class="h-full w-full scale-105 object-cover opacity-70 brightness-110 contrast-110 saturate-125"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-b from-[#06080f]/55 via-[#062029]/50 to-[#06080f]/75"
		></div>
		<div
			class="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_15%,rgba(34,211,238,0.45),transparent_50%),radial-gradient(ellipse_at_85%_75%,rgba(167,139,250,0.35),transparent_48%),radial-gradient(ellipse_at_50%_100%,rgba(232,121,249,0.22),transparent_42%)]"
		></div>
		<div
			class="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(165,243,252,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(165,243,252,0.55)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_78%)]"
		></div>
		<div
			class="absolute left-[15%] top-[20%] h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl"
		></div>
		<div
			class="absolute right-[10%] bottom-[15%] h-72 w-72 rounded-full bg-violet-400/25 blur-3xl"
		></div>
		<div
			class="absolute left-1/2 top-1/2 h-[22rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl"
		></div>
	</div>

	<div
		class="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8"
	>
		<div
			class="rounded-2xl border border-cyan-300/25 bg-[#06080f]/55 px-6 py-10 shadow-[0_0_80px_rgba(34,211,238,0.18)] backdrop-blur-md sm:px-10 sm:py-12"
		>
			<p class="text-sm font-medium tracking-wide text-cyan-200">Lower AI bills</p>
			<h2 class="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
				Stop paying for the same mistake twice
			</h2>
			<div class="mt-6 space-y-4 text-left text-sm leading-relaxed text-slate-200 sm:text-base">
				<p>
					Coding agents burn money when they retry the same fix, chase the wrong file, or talk in
					circles. AGS remembers how your project is supposed to work, so the agent spends less time —
					and fewer tokens — getting lost.
				</p>
				<p>
					The longer AGS runs on your codebase, the less waste you see. More of your budget goes to
					useful work.
				</p>
			</div>
			<div class="mt-8">
				<a
					href={href('/pricing/#token-efficiency')}
					class="text-sm text-cyan-200 underline-offset-4 hover:text-cyan-100 hover:underline"
					>How pricing reflects this →</a
				>
			</div>
		</div>
	</div>
</section>
