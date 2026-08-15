<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import {
		snipPackageExports,
		snipValidateCommit,
		snipCommitCheckpoint,
		snipCapAuthorize,
		snipMcpPipeline,
		snipTestingPlan
	} from '$lib/docs/snippets';
</script>

<h1>API surface</h1>

<p>
	AGS exposes three complementary surfaces: <strong>package exports</strong> (TypeScript),
	<strong>MCP tools</strong> (agent-callable), and <strong>CLI scripts</strong> (local / CI).
</p>

<h2>Package imports</h2>

<DocCode title="Subpath imports" lang="ts" code={snipPackageExports} />

<p>High-value entry points:</p>

<table>
	<thead>
		<tr>
			<th>Import</th>
			<th>Use for</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>@tmrxjd/agent-governance-system/commit-msg</code></td>
			<td><code>validateAgentCommitMessage</code> in git hooks and CI</td>
		</tr>
		<tr>
			<td><code>…/commit-cap</code></td>
			<td>Read / set CAP state (<code>off</code> | <code>on</code> | <code>close-only</code>)</td>
		</tr>
		<tr>
			<td><code>…/confidence</code></td>
			<td>Score whether a change set is safe to checkpoint</td>
		</tr>
		<tr>
			<td><code>…/gates</code></td>
			<td>Run named gates (<code>gate.array</code>, <code>gate.canonical</code>, …)</td>
		</tr>
		<tr>
			<td><code>…/product-licensing</code></td>
			<td>Verify license keys and tier capabilities</td>
		</tr>
		<tr>
			<td><code>…/plugin</code></td>
			<td>Host plugin API — register engines into an MCP toolkit</td>
		</tr>
	</tbody>
</table>

<h2>Validate a commit message</h2>

<DocCode title="commit-msg" lang="ts" code={snipValidateCommit} />

<p>
	Required trailers include <code>Status</code>, <code>Commit-Scope</code>, <code>Not-done</code>,
	<code>Next</code>, <code>Evidence</code>, <code>Graph-ids</code>, <code>User-approved</code>, and
	<code>Enforcement</code>. Forbidden phrases include claims like “shipped” or “feature is done”
	unless you are on an approved close path. Full scope list:
	<a href={href('/docs/staging-scopes/')}>Staging scopes</a>.
</p>

<h2>MCP tools (agent loop)</h2>

<DocCode title="Ordered pipeline" lang="text" code={snipMcpPipeline} />

<div class="not-prose my-4 overflow-x-auto rounded-xl border border-white/10">
	<table class="w-full min-w-[32rem] text-left text-sm">
		<thead class="bg-white/[0.04] text-slate-400">
			<tr>
				<th class="px-3 py-2">Tool</th>
				<th class="px-3 py-2">Purpose</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-white/[0.06] text-slate-300">
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">commit_authorize</td>
				<td class="px-3 py-2">Get/set CAP</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">enforcement_begin</td>
				<td class="px-3 py-2">Open an enforcement session for this turn</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">staging_classify / staging_enforce</td>
				<td class="px-3 py-2">Propose and lock a Commit-Scope</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">confidence_enforce</td>
				<td class="px-3 py-2">Block low-confidence critical commits</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">schema_enforce · pointer_enforce · semantic_enforce</td>
				<td class="px-3 py-2">Domain integrity</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">array_* · canon_*</td>
				<td class="px-3 py-2">List + SoT enforcement</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">testing_plan / testing_validate</td>
				<td class="px-3 py-2">Which tests must run for touched paths</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">sentinel_status</td>
				<td class="px-3 py-2">Aggregate halt / remediate signals</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">commit_checkpoint / commit_close</td>
				<td class="px-3 py-2">Write the CAP-gated commit</td>
			</tr>
		</tbody>
	</table>
</div>

<DocCode title="commit_authorize" lang="json" code={snipCapAuthorize} />
<DocCode title="commit_checkpoint" lang="json" code={snipCommitCheckpoint} />
<DocCode title="testing_plan" lang="json" code={snipTestingPlan} />

<h2>CLI</h2>

<p>Common local / CI commands (package scripts; names may be aliased in your monorepo):</p>

<pre class="not-prose overflow-x-auto rounded-xl border border-white/10 bg-black/45 p-4 text-sm text-slate-200"><code>pnpm testing:plan -- --paths packages/app/src/auth/session.ts
pnpm testing:validate
pnpm semantic:get
pnpm sentinel:status
pnpm performance:get</code></pre>

<p>
	Next: <a href={href('/docs/tutorials/')}>Tutorials</a> walks through enabling CAP and landing the
	first governed checkpoint.
</p>
