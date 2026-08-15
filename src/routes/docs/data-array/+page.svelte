<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import { snipDataArraysYml, snipArrayEnforce } from '$lib/docs/snippets';
</script>

<h1>Data arrays</h1>

<p>
	The Data Array Engine declares arrays in <code>.ags/data-arrays.yml</code>: where the data lives,
	how to locate it, how to order it, and what uniqueness key to use. Enforcement fails closed on
	violations; normalize planning tells the agent exactly how to rewrite the list.
</p>

<h2>Configure an array</h2>

<DocCode title=".ags/data-arrays.yml" lang="yaml" code={snipDataArraysYml} />

<ul>
	<li><code>path</code> — file that holds the array</li>
	<li><code>locator.jsonPath</code> — where inside the file the array sits</li>
	<li><code>order</code> — e.g. <code>alpha</code></li>
	<li><code>uniqueBy</code> — expression for dedupe (<code>$value</code> for string lists)</li>
	<li><code>itemKind</code> — expected element type</li>
</ul>

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
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">array_get</td>
				<td class="px-3 py-2">Read declared arrays / graph</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">array_validate</td>
				<td class="px-3 py-2">Validate shape without enforcing write policy</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">array_enforce</td>
				<td class="px-3 py-2">Fail on order / dupes / shape issues</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">array_plan_normalize</td>
				<td class="px-3 py-2">Return a concrete rewrite plan the agent can apply</td>
			</tr>
		</tbody>
	</table>
</div>

<DocCode title="Example calls" lang="json" code={snipArrayEnforce} />

<h2>Gate</h2>

<p>
	<code>gate.array</code> plugs into the same enforcement / CI path as other engines. Sentinel can fire
	a <code>reflex.array_enforce</code> remediation hint when arrays fail mid-session.
</p>

<p>
	Related: <a href={href('/docs/canonical/')}>Canonicalization</a> ·
	<a href={href('/showcase/data-arrays/')}>Showcase</a> ·
	<a href={href('/docs/examples/')}>Examples</a>.
</p>
