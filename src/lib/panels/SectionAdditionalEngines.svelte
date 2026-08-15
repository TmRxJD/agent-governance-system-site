<script lang="ts">
	import { href } from '$lib/paths';

	const extras = [
		{ name: 'Dependency', blurb: 'Package edges and cycle detection.', docs: '/docs/' },
		{ name: 'Release', blurb: 'Tags and release notes under policy.', docs: '/docs/' },
		{ name: 'Promotion', blurb: 'Environment gates before advance.', docs: '/docs/deployment/' },
		{ name: 'Health', blurb: 'Checks required before promotion.', docs: '/docs/' },
		{ name: 'Observability', blurb: 'Signals when delivery drifts.', docs: '/docs/' },
		{ name: 'Rollback', blurb: 'Safe reverse path when needed.', docs: '/docs/' },
		{ name: 'Optimization', blurb: 'Budgets for agent and MCP cost.', docs: '/docs/' },
		{ name: 'Artifact', blurb: 'Structure validation for ship units.', docs: '/docs/' },
		{ name: 'Registry', blurb: 'Publish integrity for packages.', docs: '/docs/' },
		{ name: 'Integrity', blurb: 'Checksums and tamper detection.', docs: '/docs/' },
		{ name: 'Identity', blurb: 'Agents, users, and environments.', docs: '/docs/' },
		{ name: 'Access', blurb: 'Permission matrix and gating.', docs: '/docs/' },
		{ name: 'Security', blurb: 'Secret and deploy surface controls.', docs: '/docs/' }
	];
</script>

<section id="engines" class="scroll-mt-20 border-t border-white/[0.06] bg-black/25 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4">
		<p class="text-sm font-medium text-slate-500">Additional engines</p>
		<h2 class="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">The rest of the system.</h2>
		<p class="mt-3 max-w-xl text-slate-400">
			Supporting muscles. Docs for depth — the homepage stays on the three pillars.
		</p>

		<div class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each extras as eng (eng.name)}
				<a
					href={href(eng.docs)}
					class="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20 hover:bg-white/[0.04]"
				>
					<p class="font-medium text-slate-100">{eng.name}</p>
					<p class="mt-1 text-sm text-slate-500">{eng.blurb}</p>
					<p class="mt-3 font-mono text-[10px] text-slate-600">docs →</p>
				</a>
			{/each}
		</div>
	</div>
</section>
