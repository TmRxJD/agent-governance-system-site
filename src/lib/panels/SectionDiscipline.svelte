<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ComparisonSection from './ComparisonSection.svelte';

	const beforeItems = [
		{
			title: 'Inconsistent reasoning across tasks',
			body: 'The agent solves the same problem differently depending on the prompt, the day, or the surrounding conversation. Patterns don’t persist.'
		},
		{
			title: 'Symptom-level fixes instead of real corrections',
			body: 'It patches issues in multiple files instead of repairing the underlying abstraction. The bug disappears temporarily, then resurfaces somewhere else.'
		},
		{
			title: 'Parallel implementations of the same concept',
			body: 'It re-implements logic that already exists because it didn’t recall the earlier decision or didn’t see the file. Now the project has competing versions of the same idea.'
		},
		{
			title: 'Partial refactors that leave invariants broken',
			body: 'It updates some call sites for a renamed function and forgets the rest. The code compiles, but the behavior is fractured.'
		},
		{
			title: 'Silent contract drift',
			body: 'It changes a return type or field name because it “seemed clearer,” breaking downstream consumers that were never updated.'
		},
		{
			title: 'Invented structure when context is missing',
			body: 'When the agent doesn’t have the right files, it guesses. Those guesses become new modules, shapes, and flows that don’t match the project’s architecture.'
		}
	];

	const afterItems = [
		{
			title: 'Stable architectural memory',
			body: 'Naming, invariants, and rules stay consistent across tasks and sessions. Agents don’t drift.'
		},
		{
			title: 'Root-level corrections',
			body: 'Semantic graphs show where a concept lives and how it’s used. Fixes happen at the right abstraction, not scattered across call sites.'
		},
		{
			title: 'Reuse of established patterns',
			body: 'Builders, helpers, and abstractions created earlier become part of the agent’s working vocabulary. No more parallel implementations.'
		},
		{
			title: 'Complete refactors',
			body: 'When a concept changes, AGS ensures all dependent locations update together. No half-migrated logic.'
		},
		{
			title: 'Contract consistency across modules',
			body: 'Schemas and canonical sources prevent silent type drift. If a field changes, the entire project aligns.'
		},
		{
			title: 'Automatic context retrieval',
			body: 'Agents pull the files they need instead of guessing or inventing structure. Decisions are made with full visibility.'
		}
	];
</script>

<section id="discipline" class="scroll-mt-20 border-t border-white/[0.06] py-12 sm:py-16">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			numeral="1"
			title="Agent Discipline & Drift Prevention"
			subheading="AI coding breaks down in ways that aren’t obvious — until they cost you hours."
			tone="cyan"
		/>
		<p class="mb-8 max-w-3xl text-base leading-relaxed text-slate-400">
			Ungoverned agents don’t fail loudly. They fail in subtle, compounding ways that look correct in isolation
			but fracture the project over time.
		</p>
		<ComparisonSection
			beforeHeading="AI coding without AGS"
			afterHeading="AI coding with AGS"
			{beforeItems}
			{afterItems}
			closing="AGS forces agents to behave like part of the engineering system, not a free-floating text generator."
		/>
	</div>
</section>
