<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import MermaidDiagram from '$lib/diagrams/MermaidDiagram.svelte';
	import { href } from '$lib/paths';
	import { snipMcpPipeline } from '$lib/docs/snippets';
</script>

<h1>System architecture</h1>

<p>
	AGS is a plugin-hosted governance kernel. Engines register MCP tools, gates, and graphs. Your IDE or
	bot host loads the toolkit; agents call tools in order; hooks and CI re-validate the same rules at
	commit time.
</p>

<h2>Control plane</h2>

<ul>
	<li><strong>CAP</strong> — whether the agent may write commits at all</li>
	<li><strong>Enforcement session</strong> — proves the required tools ran this turn</li>
	<li><strong>Staging</strong> — classifies the diff into one Commit-Scope</li>
	<li><strong>Confidence</strong> — blocks low-certainty commits on critical paths</li>
	<li><strong>Domain engines</strong> — schema, pointer, semantic, arrays, canonical, sentinel, …</li>
	<li><strong>Commit</strong> — <code>commit_checkpoint</code> writes only after the chain passes</li>
</ul>

	<DocCode title="Before commit" lang="text" code={snipMcpPipeline} />

<h2>Pipeline diagram</h2>

<div class="not-prose my-6">
	<MermaidDiagram
		definition={`flowchart LR
  A[Agent edit] --> B[enforcement_begin]
  B --> C[staging_enforce]
  C --> D[confidence_enforce]
  D --> E[schema / pointer / semantic]
  E --> F[testing_validate]
  F --> G[sentinel_status]
  G --> H[commit_checkpoint]
  H --> I[Versioning / Deployment]`}
	/>
</div>

<h2>Layers</h2>

<ol>
	<li>
		<strong>Authoring</strong> — agent edits files; staging classifies the change set into one atomic
		scope (<a href={href('/docs/staging-scopes/')}>staging scopes</a>).
	</li>
	<li>
		<strong>Meaning & structure</strong> —
		<a href={href('/docs/semantic-domains/')}>semantic</a> and
		<a href={href('/docs/pointer-domains/')}>pointer</a> domains keep concepts and paths coherent.
	</li>
	<li>
		<strong>Singularity</strong> —
		<a href={href('/docs/canonical/')}>canonicalization</a> and
		<a href={href('/docs/data-array/')}>data arrays</a> pin one SoT and ordered lists.
	</li>
	<li>
		<strong>Reflex</strong> — Sentinel converts engine failures into halt / remediate actions.
	</li>
	<li>
		<strong>Ship</strong> —
		<a href={href('/docs/versioning/')}>versioning</a> and
		<a href={href('/docs/deployment/')}>deployment</a> promote tagged work through environments.
	</li>
</ol>

<h2>Where code runs</h2>

<p>
	Runtime lives in <code>@tmrxjd/agent-governance-system</code>: TypeScript engines, MCP tool factories,
	CLI scripts, and git hooks. Your host (Cursor MCP, Claude Code, Discord bot, CI job) imports the
	package and mounts the tool catalog — see <a href={href('/docs/api/')}>API surface</a> and
	<a href={href('/docs/configuration/')}>Configuration</a>.
</p>
