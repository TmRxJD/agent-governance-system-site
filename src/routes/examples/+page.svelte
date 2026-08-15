<script lang="ts">
	import GlassPanel from '$lib/ui/GlassPanel.svelte';

	const examples = [
		{
			title: 'versioning.yml',
			body: `versioning:
  scheme: semver
  bumpRules:
    feat: minor
    fix: patch
    breaking: major
  changelog: true`
		},
		{
			title: 'deployment.yml',
			body: `deployment:
  environments: [dev, bench, staging, prod]
  gates:
    staging: [health, inventory]
    prod: [health, inventory, approval]`
		},
		{
			title: 'changelog snippet',
			body: `## 0.2.0
- feat: deployment engine movie mode
- fix: pointer drift pulse clarity`
		},
		{
			title: 'data-arrays.yml',
			body: `schemaVersion: 1
arrays:
  - id: demo-tools
    path: examples/demo-tools.json
    locator:
      jsonPath: tools
    order: alpha
    uniqueBy: "$value"
    itemKind: string
graphArtifact: docs/data-array-map/latest.json`
		},
		{
			title: 'canonical.yml',
			body: `schemaVersion: 1
concepts:
  - id: versioning-config
    label: Versioning policy
    canonicalPath: .ags/versioning.yml
    kind: config
    mirrors:
      - docs/versioning/
  - id: deployment-config
    label: Deployment policy
    canonicalPath: .ags/deployment.yml
    kind: config
    mirrors:
      - docs/deployment/
graphArtifact: docs/canonical-map/latest.json`
		}
	];
</script>

<section class="space-y-6">
	<h1 class="text-3xl font-semibold">Examples</h1>
	<p class="text-slate-300">Public sample configs — illustrative only.</p>
	{#each examples as ex}
		<GlassPanel>
			<h2 class="font-mono text-cyan-200">{ex.title}</h2>
			<pre class="mt-3 overflow-auto rounded-xl bg-black/40 p-4 text-sm text-slate-200">{ex.body}</pre>
		</GlassPanel>
	{/each}
</section>
