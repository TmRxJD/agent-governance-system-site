<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import { snipVersioningYml } from '$lib/docs/snippets';
</script>

<h1>Versioning</h1>

<p>
	The Versioning Engine reads <code>.ags/versioning.yml</code>, maps
	<a href={href('/docs/staging-scopes/')}>Commit-Scopes</a> to bump rules, and keeps package versions +
	changelog aligned with what actually landed.
</p>

<h2>Config</h2>

<DocCode title=".ags/versioning.yml" lang="yaml" code={snipVersioningYml} />

<ul>
	<li><code>scheme: semver</code> — major / minor / patch</li>
	<li><code>packages[]</code> — which package.json files to track</li>
	<li><code>bumpRules</code> — Commit-Scope → bump (or <code>none</code>)</li>
	<li><code>changelog.path</code> — where release notes accumulate</li>
</ul>

<h2>Example mapping</h2>

<table>
	<thead>
		<tr>
			<th>Commit-Scope</th>
			<th>Bump</th>
			<th>Why</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>breaking-change</code></td>
			<td>major</td>
			<td>Contract break</td>
		</tr>
		<tr>
			<td><code>file-create</code> / <code>module-wire</code></td>
			<td>minor</td>
			<td>Additive surface</td>
		</tr>
		<tr>
			<td><code>single-fix</code> / <code>single-change</code></td>
			<td>patch</td>
			<td>Compatible fix / tweak</td>
		</tr>
		<tr>
			<td><code>milestone-close</code></td>
			<td>none</td>
			<td>Process commit — bump already happened in work commits</td>
		</tr>
	</tbody>
</table>

<h2>Changelog snippet agents produce</h2>

<pre class="not-prose overflow-x-auto rounded-xl border border-white/10 bg-black/45 p-4 text-sm text-slate-200"><code>## 1.2.0
- feat(auth): session refresh helper (Commit-Scope: function-create)
- fix(auth): clear stale token on 401 (Commit-Scope: single-fix)</code></pre>

<p>
	Showcase: <a href={href('/showcase/versioning/')}>Versioning</a>. Related:
	<a href={href('/docs/deployment/')}>Deployment</a>,
	<a href={href('/docs/examples/')}>Examples</a>.
</p>
