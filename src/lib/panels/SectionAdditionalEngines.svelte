<script lang="ts">
	import { href } from '$lib/paths';

	const extras = [
		{
			name: 'Dependency',
			blurb: 'Governs package relationships, preventing cycles and unintended cross-domain coupling.'
		},
		{
			name: 'Release',
			blurb: 'Creates governed release artifacts with consistent tagging and structured metadata.'
		},
		{
			name: 'Promotion',
			blurb: 'Controls environment advancement through enforced gates and policy checks.'
		},
		{
			name: 'Health',
			blurb: 'Validates system stability before and after deployment through governed checks.'
		},
		{
			name: 'Observability',
			blurb: 'Surfaces behavioral drift using structured signals across environments.'
		},
		{
			name: 'Rollback',
			blurb: 'Provides a safe, governed path to revert versions when issues arise.'
		},
		{
			name: 'Optimization',
			blurb: 'Manages performance and cost budgets for agents and MCP operations.'
		},
		{
			name: 'Artifact',
			blurb: 'Ensures build outputs meet structural, completeness, and integrity requirements.'
		},
		{
			name: 'Registry',
			blurb: 'Maintains consistent, validated package publishing with governed version integrity.'
		},
		{
			name: 'Integrity',
			blurb: 'Applies checksums and tamper detection to critical files and artifacts.'
		},
		{
			name: 'Identity',
			blurb: 'Defines and enforces identity for agents, users, and environments.'
		},
		{
			name: 'Access',
			blurb: 'Controls permissions and enforces boundaries across agents and operations.'
		},
		{
			name: 'Security',
			blurb: 'Governs secrets, tokens, and deployment surfaces to prevent unsafe behavior.'
		}
	];
</script>

<section id="engines" class="scroll-mt-20 border-t border-white/[0.06] py-12 sm:py-16">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<p class="text-sm font-medium text-slate-500">Additional engines</p>
		<h2 class="mt-2 text-2xl font-semibold tracking-tight text-white">The rest of the system.</h2>
		<p class="mt-2 max-w-xl text-slate-400">Supporting components that reinforce the three pillars.</p>

		<div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each extras as eng (eng.name)}
				<a
					href={href('/docs/')}
					class="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20 hover:bg-white/[0.04]"
				>
					<p class="font-medium text-slate-100">{eng.name}</p>
					<p class="mt-2 text-sm leading-relaxed text-slate-400">{eng.blurb}</p>
				</a>
			{/each}
		</div>
	</div>
</section>
