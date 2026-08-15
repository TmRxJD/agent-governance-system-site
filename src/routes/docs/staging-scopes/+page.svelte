<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import { snipStagingClassify, snipCommitMessage } from '$lib/docs/snippets';
</script>

<h1>Staging scopes</h1>

<p>
	When an agent edits files, <code>staging_classify</code> inspects the diff and proposes a scope.
	<code>staging_enforce</code> locks that scope for the enforcement session. The commit message’s
	<code>Commit-Scope:</code> trailer must match.
</p>

<h2>Allowed scopes</h2>

<div class="not-prose my-4 overflow-x-auto rounded-xl border border-white/10">
	<table class="w-full min-w-[36rem] text-left text-sm">
		<thead class="bg-white/[0.04] text-slate-400">
			<tr>
				<th class="px-3 py-2">Commit-Scope</th>
				<th class="px-3 py-2">Use when</th>
				<th class="px-3 py-2">Typical bump</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-white/[0.06] text-slate-300">
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">file-create</td>
				<td class="px-3 py-2">Adding a new file that stands alone</td>
				<td class="px-3 py-2">minor</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">type-create</td>
				<td class="px-3 py-2">New types / interfaces without behavior wire-up</td>
				<td class="px-3 py-2">patch / minor</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">function-create</td>
				<td class="px-3 py-2">New function / method body</td>
				<td class="px-3 py-2">minor</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">module-wire</td>
				<td class="px-3 py-2">Connecting existing pieces (imports, registry, DI)</td>
				<td class="px-3 py-2">minor</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">single-change</td>
				<td class="px-3 py-2">One focused behavior change in existing code</td>
				<td class="px-3 py-2">patch</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">single-delete</td>
				<td class="px-3 py-2">Removing one concern cleanly</td>
				<td class="px-3 py-2">patch</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">single-fix</td>
				<td class="px-3 py-2">Bugfix for one behavior</td>
				<td class="px-3 py-2">patch</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">single-format</td>
				<td class="px-3 py-2">Formatting / lint-only</td>
				<td class="px-3 py-2">none / patch</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">breaking-change</td>
				<td class="px-3 py-2">API or contract break</td>
				<td class="px-3 py-2">major</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">milestone-close</td>
				<td class="px-3 py-2">Closing a milestone after approval gate</td>
				<td class="px-3 py-2">none</td>
			</tr>
		</tbody>
	</table>
</div>

<p>
	Bump mapping is configured in <code>.ags/versioning.yml</code> — see
	<a href={href('/docs/versioning/')}>Versioning</a>.
</p>

<h2>Classify a diff</h2>

<DocCode title="staging_classify" lang="json" code={snipStagingClassify} />

<h2>Commit with the locked scope</h2>

<DocCode title="Matching Commit-Scope trailer" lang="text" code={snipCommitMessage} />

<h2>Rules that keep agents honest</h2>

<ul>
	<li>One Commit-Scope per commit — never batch categories.</li>
	<li>Do not invent new scope ids; extend policy only through AGS releases.</li>
	<li>
		If the diff spans multiple scopes, split the work (stash / sequential checkpoints) instead of
		forcing a single commit.
	</li>
</ul>
