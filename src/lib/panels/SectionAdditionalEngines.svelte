<script lang="ts">
	import { href } from '$lib/paths';
	import SectionHeader from './SectionHeader.svelte';
	import { ENGINES, type EngineMeta } from '$lib/sim/engine-registry';

	type EngineGroup = {
		id: string;
		title: string;
		blurb: string;
		slugs: string[];
	};

	const groups: EngineGroup[] = [
		{
			id: 'discipline',
			title: 'Agent discipline',
			blurb: 'How agents classify work, stay consistent, and stop when something is wrong.',
			slugs: ['staging', 'semantic-graph', 'pointer-map', 'reflex-arcs']
		},
		{
			id: 'repo',
			title: 'Repo integrity',
			blurb: 'Canonical sources, ordered lists, packages, policies, and publish surfaces.',
			slugs: [
				'canonicalization',
				'data-arrays',
				'dependency',
				'policy',
				'artifact',
				'registry'
			]
		},
		{
			id: 'delivery',
			title: 'Delivery',
			blurb: 'Versions, environments, promotion, health, signals, and rollback.',
			slugs: [
				'versioning',
				'deployment',
				'release',
				'promotion',
				'health',
				'observability',
				'rollback'
			]
		},
		{
			id: 'cost',
			title: 'Cost & performance',
			blurb: 'Token spend, outcome quality, and MCP budgets.',
			slugs: ['efficiency', 'impact', 'optimization']
		},
		{
			id: 'trust',
			title: 'Trust & access',
			blurb: 'Integrity, identity, permissions, and secrets.',
			slugs: ['integrity', 'identity', 'access', 'security']
		}
	];

	function enginesFor(slugs: string[]): EngineMeta[] {
		return slugs
			.map((slug) => ENGINES.find((e) => e.slug === slug))
			.filter((e): e is EngineMeta => Boolean(e));
	}
</script>

<section id="engines" class="scroll-mt-20 border-t border-white/[0.06] bg-black/25 py-16 sm:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			title="Engines"
			subheading={`All ${ENGINES.length} engines in AGS — open any one for a walkthrough.`}
			tone="muted"
		/>

		<div class="mt-12 space-y-12">
			{#each groups as group (group.id)}
				{@const engines = enginesFor(group.slugs)}
				<div>
					<div class="mb-4 max-w-2xl">
						<h3 class="text-lg font-semibold text-white">{group.title}</h3>
						<p class="mt-1 text-sm text-slate-500">{group.blurb}</p>
					</div>
					<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{#each engines as eng (eng.slug)}
							<a
								href={href(`/showcase/${eng.slug}/`)}
								class="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.04]"
							>
								<p class="font-medium text-slate-100 group-hover:text-cyan-200">{eng.shortTitle}</p>
								<p class="mt-2 text-sm leading-snug text-slate-500">{eng.blurb}</p>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
