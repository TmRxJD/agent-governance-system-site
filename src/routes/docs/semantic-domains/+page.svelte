<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import { snipSemanticDomains } from '$lib/docs/snippets';
</script>

<h1>Semantic domains</h1>

<p>
	A <strong>semantic domain</strong> is a named meaning space — staging, pointer, sentinel, versioning,
	and so on. The Semantic Engine maintains a constraint graph over concepts in those domains. When an
	agent asserts something that conflicts with an existing concept (for example: “commits may use raw
	git while CAP is on”), <code>semantic_enforce</code> surfaces the contradiction before the commit.
</p>

<h2>Why it exists</h2>

<ul>
	<li>Agents forget prior constraints within a long session.</li>
	<li>Docs, rules, and code often encode the same idea three incompatible ways.</li>
	<li>
		Governance needs a machine-checkable place to say “this concept belongs to domain X and implies
		Y.”
	</li>
</ul>

<h2>Core domains</h2>

<DocCode title="Domain ids agents reason about" lang="text" code={snipSemanticDomains} />

<div class="not-prose my-4 overflow-x-auto rounded-xl border border-white/10">
	<table class="w-full min-w-[32rem] text-left text-sm">
		<thead class="bg-white/[0.04] text-slate-400">
			<tr>
				<th class="px-3 py-2">Domain</th>
				<th class="px-3 py-2">Owns</th>
				<th class="px-3 py-2">Docs</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-white/[0.06] text-slate-300">
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">staging</td>
				<td class="px-3 py-2">Atomic Commit-Scopes</td>
				<td class="px-3 py-2"><a class="text-cyan-300" href={href('/docs/staging-scopes/')}>Staging scopes</a></td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">pointer</td>
				<td class="px-3 py-2">Path → home maps</td>
				<td class="px-3 py-2"><a class="text-cyan-300" href={href('/docs/pointer-domains/')}>Pointer domains</a></td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">canonical</td>
				<td class="px-3 py-2">Singular SoT per concept</td>
				<td class="px-3 py-2"><a class="text-cyan-300" href={href('/docs/canonical/')}>Canonicalization</a></td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">data-array</td>
				<td class="px-3 py-2">Ordered / unique lists</td>
				<td class="px-3 py-2"><a class="text-cyan-300" href={href('/docs/data-array/')}>Data arrays</a></td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">versioning</td>
				<td class="px-3 py-2">Semver bump policy</td>
				<td class="px-3 py-2"><a class="text-cyan-300" href={href('/docs/versioning/')}>Versioning</a></td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">deployment</td>
				<td class="px-3 py-2">Environment promotion</td>
				<td class="px-3 py-2"><a class="text-cyan-300" href={href('/docs/deployment/')}>Deployment</a></td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">sentinel</td>
				<td class="px-3 py-2">Halt / remediate reflexes</td>
				<td class="px-3 py-2"><a class="text-cyan-300" href={href('/showcase/reflex-arcs/')}>Showcase</a></td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-mono text-xs text-cyan-200">efficiency · impact</td>
				<td class="px-3 py-2">Token cost and outcome maturity</td>
				<td class="px-3 py-2"><a class="text-cyan-300" href={href('/docs/engine-registry/')}>Engine registry</a></td>
			</tr>
		</tbody>
	</table>
</div>

<h2>Agent usage</h2>

<DocCode
	title="semantic_enforce"
	lang="text"
	code={`// MCP
semantic_enforce {}
// Failures name the conflicting concepts and suggested next tools.`}
/>

<p>
	Each engine in the <a href={href('/docs/engine-registry/')}>registry</a> declares its
	<code>semanticDomain</code> so hosts can filter tools and docs by meaning space.
</p>
