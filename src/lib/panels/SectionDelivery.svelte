<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ComparisonSection from './ComparisonSection.svelte';

	const beforeItems = [
		{
			title: 'Commit history with no intent',
			body: '“quick fix” / “final-final” — unreadable, unsafe to revert.'
		},
		{
			title: 'Version numbers that lie',
			body: 'Breaking changes slip into patches.'
		},
		{
			title: 'Direct-to-production',
			body: 'Laptop → prod. No gates. No rollback plan.'
		},
		{
			title: 'No rehearsed path back',
			body: 'Staging fails and the only option is hot-fix forward — or hope.'
		},
		{
			title: 'Unclear artifact provenance',
			body: '“final-prod.zip” with no integrity guarantees.'
		}
	];

	const afterItems = [
		{
			title: 'Scoped, reversible commits',
			body: 'Clear intent. Readable history.'
		},
		{
			title: 'Predictable versioning',
			body: 'Patch / minor / major match the change.'
		},
		{
			title: 'Governed environment pipeline',
			body: 'dev → bench → staging → prod, with checks.'
		},
		{
			title: 'Defined rollback paths',
			body: 'When staging fails, revert is known.'
		},
		{
			title: 'Artifact & registry integrity',
			body: 'Validated, signed, tracked — before production.'
		}
	];
</script>

<section id="delivery" class="scroll-mt-20 py-16 sm:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			title="Governed Delivery"
			subheading="Shipping shouldn’t be a separate gamble — it should follow the same rules."
			tone="magenta"
		/>
		<ComparisonSection
			beforeHeading="Before AGS"
			afterHeading="With AGS"
			beforeImage="/media/chaos.jpg"
			afterImage="/media/ship.jpg"
			{beforeItems}
			{afterItems}
			closing="Delivery becomes predictable."
		/>
	</div>
</section>
