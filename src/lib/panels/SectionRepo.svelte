<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ComparisonSection from './ComparisonSection.svelte';

	const beforeItems = [
		{
			title: 'Diverging domain models',
			body: 'The same “user” shape silently differs across auth, billing, analytics, and notifications.'
		},
		{
			title: 'Feature flags that multiply',
			body: 'One feature becomes three flags with different names — half the system disagrees on state.'
		},
		{
			title: 'Configuration scattered across files',
			body: 'Timeouts, regions, and toggles live in multiple files with no clear authority.'
		},
		{
			title: 'Data shapes that drift silently',
			body: 'id, userId, uid, Id all mean the same thing — and break consumers unpredictably.'
		},
		{
			title: 'Domain boundaries erode',
			body: 'Auth lands in utilities; billing lands in helpers. Structure stops matching intent.'
		},
		{
			title: 'Competing abstractions emerge',
			body: 'New layers (“FlowManager”, “Coordinator”) conflict with the architecture already in place.'
		}
	];

	const afterItems = [
		{
			title: 'One canonical model per domain',
			body: 'All modules reference the same schema. No drift. No variants.'
		},
		{
			title: 'One authoritative configuration source',
			body: 'Flags and settings live in one governed file. Everything else points to it.'
		},
		{
			title: 'Normalized data shapes',
			body: 'Arrays and collections follow one structure, one meaning, one order.'
		},
		{
			title: 'Domain-aligned file placement',
			body: 'Files live in the correct domain. No bleed. No accidental modules.'
		},
		{
			title: 'Consistent abstractions',
			body: 'New layers appear only when policy allows. Architecture stays unified.'
		},
		{
			title: 'Structural enforcement through pointers and policy',
			body: 'The repo has a backbone. Agents cannot violate it.'
		}
	];
</script>

<section id="repo" class="scroll-mt-20 border-y border-white/[0.06] bg-black/25 py-14 sm:py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			numeral="2"
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
