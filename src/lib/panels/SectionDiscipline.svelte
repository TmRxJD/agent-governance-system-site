<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ComparisonSection from './ComparisonSection.svelte';

	const beforeItems = [
		{
			title: 'Inconsistent reasoning across tasks',
			body: 'The same problem is solved differently depending on the prompt, the day, or the conversation. Patterns don’t persist.'
		},
		{
			title: 'Symptom-level fixes instead of real corrections',
			body: 'Issues are patched across files instead of repairing the underlying abstraction — then resurface elsewhere.'
		},
		{
			title: 'Parallel implementations of the same concept',
			body: 'Existing logic is re-implemented because earlier decisions weren’t recalled. Competing versions appear.'
		},
		{
			title: 'Partial refactors that leave invariants broken',
			body: 'Some call sites update; others don’t. The code may compile while behavior stays fractured.'
		},
		{
			title: 'Silent contract drift',
			body: 'A return type or field name changes because it “seemed clearer,” breaking downstream consumers.'
		},
		{
			title: 'Invented structure when context is missing',
			body: 'Without the right files, the agent guesses — and those guesses become mismatched modules and flows.'
		}
	];

	const afterItems = [
		{
			title: 'Stable architectural memory',
			body: 'Naming, invariants, and rules stay consistent across tasks and sessions. Agents don’t drift.'
		},
		{
			title: 'Root-level corrections',
			body: 'Semantic graphs show where a concept lives. Fixes happen at the right abstraction.'
		},
		{
			title: 'Reuse of established patterns',
			body: 'Builders and helpers created earlier become part of the agent’s working vocabulary.'
		},
		{
			title: 'Complete refactors',
			body: 'When a concept changes, dependent locations update together — no half-migrated logic.'
		},
		{
			title: 'Contract consistency across modules',
			body: 'Schemas and canonical sources prevent silent type drift across the project.'
		},
		{
			title: 'Automatic context retrieval',
			body: 'Agents pull the files they need instead of guessing or inventing structure.'
		}
	];
</script>

<section id="discipline" class="scroll-mt-20 py-14 sm:py-20">
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
			closing="AGS forces agents to behave like part of the engineering system, not a free-floating text generator."
		/>
	</div>
</section>
