<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import { snipMcpPipeline, snipCommitMessage } from '$lib/docs/snippets';
</script>

<h1>Overview</h1>

<p>
	<strong>Agent Governance System (AGS)</strong> is a governance runtime for AI-assisted development. It
	turns agent work into a repeatable loop: classify the change, prove confidence, enforce repo rules,
	then commit with a structured message. The package is
	<code>@tmrxjd/agent-governance-system</code>.
</p>

<h2>What AGS does</h2>

<ul>
	<li>
		<strong>Agent discipline</strong> — CAP (Commit Authorization Protocol) controls when agents may
		commit; staging scopes force one atomic category per commit; commit-msg validation blocks fake
		“finished” language.
	</li>
	<li>
		<strong>Repo integrity</strong> — schema, pointer, semantic, canonical, and data-array engines keep
		configs, docs, and declared lists aligned with the files that actually exist.
	</li>
	<li>
		<strong>Cost & quality signals</strong> — efficiency and impact engines track token burn, loops, and
		whether the agent is actually improving outcomes over time.
	</li>
	<li>
		<strong>Delivery control</strong> — versioning bump rules and deployment environment gates promote
		work through local → bench → staging → production with explicit checks.
	</li>
</ul>

<h2>The governed loop</h2>

<p>
	When CAP is on, a typical agent turn ends like this — every step is an MCP tool or package API your
	host can call:
</p>

<DocCode title="MCP pipeline (ordered)" lang="text" code={snipMcpPipeline} />

<p>Commits themselves look like this — status line + trailers the hook and MCP validator understand:</p>

<DocCode title="Agent commit message" lang="text" code={snipCommitMessage} />

<h2>Where to go next</h2>

<table>
	<thead>
		<tr>
			<th>You are…</th>
			<th>Start with</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Installing for the first time</td>
			<td><a href={href('/docs/install-commercial/')}>Install</a> → <a href={href('/docs/tutorials/')}>Tutorials</a></td>
		</tr>
		<tr>
			<td>Wiring Cursor / MCP</td>
			<td><a href={href('/docs/configuration/')}>Configuration</a> → <a href={href('/docs/api/')}>API surface</a></td>
		</tr>
		<tr>
			<td>Designing repo policy</td>
			<td><a href={href('/docs/staging-scopes/')}>Staging scopes</a> → <a href={href('/docs/canonical/')}>Canonicalization</a></td>
		</tr>
		<tr>
			<td>Choosing a plan</td>
			<td><a href={href('/docs/licensing/')}>Licensing</a> · <a href={href('/pricing/')}>Pricing</a></td>
		</tr>
	</tbody>
</table>

<h2>Package entry points</h2>

<ul>
	<li><code>@tmrxjd/agent-governance-system</code> — plugins, TOC, coordination</li>
	<li><code>…/commit-msg</code> — validate agent commit messages in hooks and CI</li>
	<li><code>…/commit-cap</code> — CAP state (<code>off</code> | <code>on</code> | <code>close-only</code>)</li>
	<li><code>…/gates</code>, <code>…/confidence</code>, <code>…/product-licensing</code> — enforcement helpers</li>
</ul>

<p>
	Interactive walkthroughs of each engine live under
	<a href={href('/showcase/')}>Showcase</a>. Full copy-paste configs are on
	<a href={href('/docs/examples/')}>Examples</a>.
</p>
