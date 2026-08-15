<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import { snipPointerMap } from '$lib/docs/snippets';
</script>

<h1>Pointer domains</h1>

<p>
	The Pointer Engine maps repository paths to <strong>homes</strong> — declared places where a kind of
	artifact must live. <code>pointer_enforce</code> fails when governed content points at a missing
	path, when a file has no home, or when docs drift from the map.
</p>

<h2>What a pointer home is</h2>

<p>
	A home is a stable directory (or file pattern) for a concern: routes, components, docs, assets,
	policies. Agents must create and update files inside the declared home instead of inventing parallel
	trees.
</p>

<DocCode title="Example home map" lang="text" code={snipPointerMap} />

<h2>Typical domains</h2>

<ul>
	<li><code>site</code> / <code>routes</code> — application routes and pages</li>
	<li><code>docs</code> — human documentation that must track real paths</li>
	<li><code>components</code> — UI building blocks</li>
	<li><code>assets</code> — static media</li>
	<li><code>ags-policy</code> — <code>.ags/*.yml</code> governance configs</li>
</ul>

<h2>Agent usage</h2>

<DocCode
	title="pointer_enforce"
	lang="text"
	code={`// MCP
pointer_enforce {}
// Returns path issues + suggested homes for orphaned files.`}
/>

<h2>Works with</h2>

<ul>
	<li>
		<a href={href('/docs/canonical/')}>Canonicalization</a> — pointers say where things live;
		canonical says which file is the SoT.
	</li>
	<li>
		<a href={href('/docs/semantic-domains/')}>Semantic domains</a> — pointer concepts belong to the
		<code>pointer</code> domain in the constraint graph.
	</li>
</ul>

<p>
	Interactive drift visualization:
	<a href={href('/showcase/pointer-map/')}>Pointer showcase</a>.
</p>
