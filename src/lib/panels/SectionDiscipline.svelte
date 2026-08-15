<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ComparisonSection from './ComparisonSection.svelte';

	const beforeItems = [
		{
			title: 'Inconsistent reasoning',
			body: 'Same problem, different answers — patterns don’t stick.'
		},
		{
			title: 'Symptom-level fixes',
			body: 'Patches across files. The real break stays.'
		},
		{
			title: 'Parallel implementations',
			body: 'Existing logic gets rebuilt because nothing recalled it.'
		},
		{
			title: 'Partial refactors',
			body: 'Some call sites update. Others don’t. Behavior fractures.'
		},
		{
			title: 'Silent contract drift',
			body: 'A “clearer” rename quietly breaks consumers.'
		},
		{
			title: 'Invented structure',
			body: 'Missing context → guesses that become mismatched modules.'
		}
	];

	const afterItems = [
		{
			title: 'Stable architectural memory',
			body: 'Naming, invariants, and rules persist across sessions.'
		},
		{
			title: 'Root-level corrections',
			body: 'Fix the abstraction — not every symptom file.'
		},
		{
			title: 'Reuse established patterns',
			body: 'Builders and helpers stay in the agent’s vocabulary.'
		},
		{
			title: 'Complete refactors',
			body: 'Dependent locations update together.'
		},
		{
			title: 'Contract consistency',
			body: 'Schemas and canonical sources block silent type drift.'
		},
		{
			title: 'Automatic context retrieval',
			body: 'Agents pull the files they need — no guessing.'
		}
	];
</script>

<section id="discipline" class="scroll-mt-20 py-16 sm:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			numeral="1"
			title="Agent Discipline & Drift Prevention"
			subheading="AI coding breaks down in ways that aren’t obvious — until they cost you hours."
			tone="cyan"
		/>
		<ComparisonSection
			beforeHeading="Without AGS"
			afterHeading="With AGS"
			beforeImage="/media/chaos.jpg"
			afterImage="/media/order.jpg"
			{beforeItems}
			{afterItems}
			closing="AGS makes agents part of the engineering system — not a free-floating text generator."
		/>
	</div>
</section>
