<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ComparisonSection from './ComparisonSection.svelte';

	const beforeItems = [
		{
			title: 'Diverging domain models',
			body: 'The user object in authentication, billing, analytics, and notifications slowly evolves into different shapes. Each module believes it’s using the same model — it isn’t.'
		},
		{
			title: 'Feature flags that multiply',
			body: 'One feature becomes three flags with different names and values. Half the system thinks the feature is on; half thinks it’s off.'
		},
		{
			title: 'Configuration scattered across files',
			body: 'Timeouts, regions, modes, and toggles appear in multiple JSON files with no clear authority. Changing one doesn’t update the others.'
		},
		{
			title: 'Data shapes that drift silently',
			body: 'Lists and collections diverge: id, userId, uid, Id — all refer to the same concept but break downstream logic unpredictably.'
		},
		{
			title: 'Domain boundaries erode',
			body: 'Modules appear in the wrong domain because the agent didn’t understand the project’s structure. Auth logic ends up in utilities; billing logic ends up in helpers.'
		},
		{
			title: 'Competing abstractions emerge',
			body: 'The agent introduces new layers (“FlowManager”, “Coordinator”, “Pipeline”) that conflict with existing architecture. Now two systems exist for the same job.'
		}
	];

	const afterItems = [
		{
			title: 'One canonical model per domain',
			body: 'All modules reference the same schema. No drift. No variants.'
		},
		{
			title: 'One authoritative configuration source',
			body: 'Feature flags and settings live in one governed file. Everything else must point to it.'
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
			body: 'Agents cannot introduce new layers unless policy allows. Architecture stays unified.'
		},
		{
			title: 'Structural enforcement through pointers and policy',
			body: 'The repo has a backbone. Agents cannot violate it.'
		}
	];
</script>

<section id="repo" class="scroll-mt-20 border-t border-white/[0.06] bg-black/15 py-12 sm:py-16">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			numeral="2"
			title="Repo Governance & Structural Integrity"
			subheading="Projects don’t fall apart because of one big mistake — they fall apart from slow structural drift."
			tone="violet"
		/>
		<p class="mb-8 max-w-3xl text-base leading-relaxed text-slate-400">
			Ungoverned AI introduces inconsistencies that compound over time. AGS keeps the project coherent by
			enforcing structure at every layer.
		</p>
		<ComparisonSection
			beforeHeading="Repo — Before AGS"
			afterHeading="Repo — With AGS"
			{beforeItems}
			{afterItems}
			closing="This is how AGS prevents structural entropy."
		/>
	</div>
</section>
