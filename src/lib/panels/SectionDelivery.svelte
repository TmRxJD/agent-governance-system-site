<script lang="ts">
	import ComparePanel from './ComparePanel.svelte';

	const beforeItems = [
		{
			title: 'Commit history with no intent',
			body: 'Messages like “quick fix”, “temp change”, “update stuff”, “final-final-auth” make it impossible to understand what happened or safely revert anything.'
		},
		{
			title: 'Version numbers that don’t reflect reality',
			body: 'Patch-level changes become minor versions. Breaking changes slip into patch releases. Hotfixes override semantic meaning.'
		},
		{
			title: 'Direct-to-production deployments',
			body: 'Changes go from laptop → prod with no structured gates, no health checks, and no rollback plan.'
		},
		{
			title: 'Artifacts with unclear provenance',
			body: 'Builds named “build.zip” or “final-prod.zip” appear in the registry with no integrity guarantees.'
		}
	];

	const afterItems = [
		{
			title: 'Scoped, reversible commits',
			body: 'Every change has a clear scope and a clear intent. History becomes readable and safe to navigate.'
		},
		{
			title: 'Predictable versioning',
			body: 'Patch, minor, and major changes follow strict rules. Version numbers match the kind of change.'
		},
		{
			title: 'Governed environment pipeline',
			body: 'dev → bench → staging → prod. Each stage requires health and policy checks before promotion.'
		},
		{
			title: 'Rollback paths defined per version',
			body: 'If staging fails, the system knows exactly how to revert safely.'
		},
		{
			title: 'Artifact and registry integrity',
			body: 'Artifacts are validated, signed, and tracked. Nothing ambiguous enters production.'
		}
	];
</script>

<section id="delivery" class="scroll-mt-20 border-t border-white/[0.06] py-12 sm:py-16">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<p class="text-sm font-medium text-fuchsia-300/90">3 · Governed Delivery</p>
		<h2 class="mt-2 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
			Shipping shouldn’t be a separate gamble — it should follow the same rules as the rest of the system.
		</h2>
		<p class="mt-3 max-w-3xl text-base leading-relaxed text-slate-400">
			AI-assisted development often produces code quickly, but delivery becomes a fragile, ad-hoc process. AGS
			governs commits, versions, environments, artifacts, and releases under one unified model.
		</p>

		<div class="mt-8 grid gap-4 lg:grid-cols-2" data-ags-demo="delivery">
			<ComparePanel
				variant="before"
				heading="Delivery — Before AGS"
				items={beforeItems}
				closing="Delivery becomes guesswork."
			/>
			<ComparePanel
				variant="after"
				heading="Delivery — With AGS"
				items={afterItems}
				closing="Delivery becomes predictable."
			/>
		</div>
	</div>
</section>
