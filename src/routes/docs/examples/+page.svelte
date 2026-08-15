<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import {
		snipVersioningYml,
		snipDeploymentYml,
		snipDataArraysYml,
		snipCanonicalYml,
		snipValidateCommit,
		snipCommitMessage,
		snipHooksWire,
		snipNpmrc
	} from '$lib/docs/snippets';
</script>

<h1>Examples</h1>

<p>
	Copy-paste starting points for AGS policies, hooks, and commit messages. Adapt names and paths to
	your repo. Guided flows live in <a href={href('/docs/tutorials/')}>Tutorials</a>; full wiring is in
	<a href={href('/docs/configuration/')}>Configuration</a>.
</p>

<h2>Registry auth</h2>
<DocCode title=".npmrc" lang="ini" code={snipNpmrc} />

<h2>Versioning policy</h2>
<DocCode title=".ags/versioning.yml" lang="yaml" code={snipVersioningYml} />

<h2>Deployment policy</h2>
<DocCode title=".ags/deployment.yml" lang="yaml" code={snipDeploymentYml} />

<h2>Data arrays</h2>
<DocCode title=".ags/data-arrays.yml" lang="yaml" code={snipDataArraysYml} />

<h2>Canonical registry</h2>
<DocCode title=".ags/canonical.yml" lang="yaml" code={snipCanonicalYml} />

<h2>Agent commit message</h2>
<DocCode title="status/checkpoint(…)" lang="text" code={snipCommitMessage} />

<h2>Validate in a hook</h2>
<DocCode title="commit-msg" lang="ts" code={snipHooksWire} />
<DocCode title="Programmatic validate" lang="ts" code={snipValidateCommit} />

<h2>Changelog fragment</h2>
<pre class="not-prose overflow-x-auto rounded-xl border border-white/10 bg-black/45 p-4 text-sm text-slate-200"><code>## 1.2.0
- feat(auth): session refresh helper
- fix(auth): clear stale token on 401

## 1.1.1
- fix(pointer): correct docs home for routes/</code></pre>
