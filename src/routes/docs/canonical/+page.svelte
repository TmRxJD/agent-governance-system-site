<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import { snipCanonicalYml, snipCanonEnforce } from '$lib/docs/snippets';
</script>

<h1>Canonicalization</h1>

<p>
	The Canonicalization Engine registers <strong>concepts</strong>: each has exactly one
	<code>canonicalPath</code> and optional <code>mirrors</code> (docs, generated maps). Gates and MCP
	tools detect drift and plan fixes.
</p>

<h2>Configure concepts</h2>

<p>Create <code>.ags/canonical.yml</code>:</p>

<DocCode title=".ags/canonical.yml" lang="yaml" code={snipCanonicalYml} />

<p>
	<code>graphArtifact</code> is where the engine writes the live canonical map (commit it so CI can
	diff).
</p>

<h2>MCP tools</h2>

<div class="not-prose my-4 overflow-x-auto rounded-xl border border-white/10">
	<table class="w-full min-w-[28rem] text-left text-sm">
		<thead class="bg-white/[0.04] text-slate-400">
			<tr>
				<th class="px-3 py-2">Tool</th>
				<th class="px-3 py-2">Does</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-white/[0.06] text-slate-300">
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">canon_get</td>
				<td class="px-3 py-2">Read registry / graph</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">canon_validate</td>
				<td class="px-3 py-2">Validate concept entries</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">canon_enforce</td>
				<td class="px-3 py-2">Fail on missing SoT or illegal duplicates</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">canon_drift</td>
				<td class="px-3 py-2">Diff committed map vs live state</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">canon_plan_fix</td>
				<td class="px-3 py-2">Produce restore actions for a concept</td>
			</tr>
		</tbody>
	</table>
</div>

<DocCode title="Example calls" lang="json" code={snipCanonEnforce} />

<h2>Gate</h2>

<p>
	<code>gate.canonical</code> can be required in CI or inside the enforcement session so merges cannot
	land with a drifting SoT map. Canonical checks often call into
	<a href={href('/docs/data-array/')}>Data arrays</a> when a concept’s SoT is itself a governed list.
</p>

<p>
	Showcase: <a href={href('/showcase/canonicalization/')}>Canonicalization</a>.
</p>
