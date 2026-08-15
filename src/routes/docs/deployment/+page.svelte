<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import { snipDeploymentYml } from '$lib/docs/snippets';
</script>

<h1>Deployment</h1>

<p>
	The Deployment Engine reads <code>.ags/deployment.yml</code>: ordered environments, required checks /
	tests / approvals per stage, and what must pass before merging to the protected branch.
</p>

<h2>Config</h2>

<DocCode title=".ags/deployment.yml" lang="yaml" code={snipDeploymentYml} />

<ul>
	<li><code>environments[]</code> — id + requiredChecks / requiredTests / requiredApprovals</li>
	<li><code>deploymentOrder</code> — promotion sequence (no skipping)</li>
	<li><code>mergeTarget</code> — protected branch name</li>
	<li><code>requireBeforeMerge</code> — environments that must be green before merge</li>
</ul>

<h2>Promotion flow</h2>

<ol>
	<li>Agent work lands on a feature branch under CAP + staging.</li>
	<li>Versioning records the bump / changelog for the release candidate.</li>
	<li>
		Promotion engine advances <code>local → bench → staging → production</code> only when that
		environment’s checks pass.
	</li>
	<li>Merge to <code>mergeTarget</code> requires the listed environments.</li>
</ol>

<pre class="not-prose overflow-x-auto rounded-xl border border-white/10 bg-black/45 p-4 text-sm text-slate-200"><code># Promotion check
# environment: staging
# requiredChecks: [build, health]
# requiredTests: [unit, e2e]
# requiredApprovals: 1
# → ok: false until health endpoint + e2e + approval recorded</code></pre>

<h2>Works with</h2>

<ul>
	<li><a href={href('/docs/versioning/')}>Versioning</a> — what version you are promoting</li>
	<li>Health / Observability / Rollback engines — runtime signals and undo paths</li>
	<li><a href={href('/showcase/deployment/')}>Deployment showcase</a> — animated pipeline</li>
</ul>
