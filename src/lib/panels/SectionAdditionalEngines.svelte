<script lang="ts">
	import { href } from '$lib/paths';
	import SectionHeader from './SectionHeader.svelte';

	const extras = [
		{ name: 'Dependency', blurb: 'Cycles and cross-domain coupling, blocked.' },
		{ name: 'Release', blurb: 'Tagged artifacts with structured metadata.' },
		{ name: 'Promotion', blurb: 'Environment gates with policy checks.' },
		{ name: 'Health', blurb: 'Stability checks before and after deploy.' },
		{ name: 'Observability', blurb: 'Structured signals for behavioral drift.' },
		{ name: 'Rollback', blurb: 'A governed path back when things fail.' },
		{ name: 'Optimization', blurb: 'Budgets for agents and MCP ops.' },
		{ name: 'Artifact', blurb: 'Completeness and integrity on outputs.' },
		{ name: 'Registry', blurb: 'Validated publish with version integrity.' },
		{ name: 'Integrity', blurb: 'Checksums and tamper detection.' },
		{ name: 'Identity', blurb: 'Agents, users, environments — defined.' },
		{ name: 'Access', blurb: 'Permissions and hard boundaries.' },
		{ name: 'Security', blurb: 'Secrets, tokens, unsafe surfaces.' }
	];
</script>

<section id="engines" class="scroll-mt-20 border-t border-white/[0.06] bg-black/25 py-16 sm:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			eyebrow="Additional engines"
			title="The rest of the system."
			subheading="Supporting components that reinforce the three pillars."
			tone="muted"
		/>

		<div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each extras as eng (eng.name)}
				<a
					href={href('/docs/')}
					class="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.04]"
				>
					<p class="font-medium text-slate-100 group-hover:text-cyan-200">{eng.name}</p>
					<p class="mt-2 text-sm leading-snug text-slate-500">{eng.blurb}</p>
				</a>
			{/each}
		</div>
	</div>
</section>
