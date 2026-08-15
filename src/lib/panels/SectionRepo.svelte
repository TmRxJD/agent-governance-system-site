<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ComparisonSection from './ComparisonSection.svelte';

	const beforeItems = [
		{
			title: 'Diverging domain models',
			body: '“User” means four different shapes across modules.'
		},
		{
			title: 'Feature flags that multiply',
			body: 'One feature becomes three names. State disagrees.'
		},
		{
			title: 'Scattered configuration',
			body: 'Timeouts and toggles live everywhere — no authority.'
		},
		{
			title: 'Data shape drift',
			body: 'id / userId / uid / Id — same idea, broken consumers.'
		},
		{
			title: 'Eroding domain boundaries',
			body: 'Auth in utilities. Billing in helpers.'
		},
		{
			title: 'Competing abstractions',
			body: 'New “managers” conflict with the architecture already there.'
		}
	];

	const afterItems = [
		{
			title: 'One canonical model',
			body: 'One schema per domain. No variants.'
		},
		{
			title: 'One config authority',
			body: 'Flags and settings live in one governed source.'
		},
		{
			title: 'Normalized data shapes',
			body: 'One structure, one meaning, one order.'
		},
		{
			title: 'Domain-aligned placement',
			body: 'Files live where the domain says they should.'
		},
		{
			title: 'Consistent abstractions',
			body: 'New layers appear only when policy allows.'
		},
		{
			title: 'Structural enforcement',
			body: 'Pointers and policy give the repo a backbone.'
		}
	];
</script>

<section id="repo" class="scroll-mt-20 border-y border-white/[0.06] bg-black/30 py-16 sm:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			title="Repo Governance & Structural Integrity"
			subheading="Projects fall apart from slow structural drift — not one big mistake."
			tone="violet"
		/>
		<ComparisonSection
			beforeHeading="Before AGS"
			afterHeading="With AGS"
			beforeImage="/media/repo-chaos.jpg"
			afterImage="/media/repo-order.jpg"
			{beforeItems}
			{afterItems}
			closing="This is how AGS prevents structural entropy."
		/>
	</div>
</section>
