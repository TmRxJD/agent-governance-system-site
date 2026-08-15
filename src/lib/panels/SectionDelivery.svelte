<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ComparisonSection from './ComparisonSection.svelte';

	const beforeItems = [
		{
			title: 'Commit history with no intent',
			body: '“quick fix”, “temp change”, “final-final-auth” — history you can’t read or safely revert.'
		},
		{
			title: 'Version numbers that don’t reflect reality',
			body: 'Breaking changes slip into patches; hotfixes override semantic meaning.'
		},
		{
			title: 'Direct-to-production deployments',
			body: 'Laptop → prod with no gates, no health checks, and no rollback plan.'
		},
		{
			title: 'Artifacts with unclear provenance',
			body: '“build.zip” / “final-prod.zip” land in the registry with no integrity guarantees.'
		}
	];

	const afterItems = [
		{
			title: 'Scoped, reversible commits',
			body: 'Every change has clear scope and intent. History stays readable and navigable.'
		},
		{
			title: 'Predictable versioning',
			body: 'Patch, minor, and major follow strict rules. Numbers match the change.'
		},
		{
			title: 'Governed environment pipeline',
			body: 'dev → bench → staging → prod, with health and policy checks before promotion.'
		},
		{
			title: 'Rollback paths defined per version',
			body: 'When staging fails, the system knows exactly how to revert safely.'
		},
		{
			title: 'Artifact and registry integrity',
			body: 'Artifacts are validated, signed, and tracked. Nothing ambiguous enters production.'
		}
	];
</script>

<section id="delivery" class="scroll-mt-20 py-14 sm:py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			numeral="3"
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
