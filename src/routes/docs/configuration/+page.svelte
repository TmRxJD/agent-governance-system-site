<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import {
		snipInstall,
		snipNpmrc,
		snipMcpJson,
		snipHooksWire,
		snipVersioningYml
	} from '$lib/docs/snippets';
</script>

<h1>Configuration</h1>

<p>
	Stand up AGS in a repo: registry auth, license key, policy YAML under <code>.ags/</code>, a commit-msg
	hook, and an MCP host so agents can call the governance tools.
</p>

<h2>Install the package</h2>

<DocCode title=".npmrc" lang="ini" code={snipNpmrc} />
<DocCode title="Install" lang="bash" code={snipInstall} />

<p>
	Full install steps: <a href={href('/docs/install-commercial/')}>Install</a>.
</p>

<h2>License key</h2>

<p>
	Set <code>AGS_LICENSE_KEY</code> (or your host’s mapped env) so product-licensing can unlock the
	tier you purchased. Free / Personal / Enterprise capabilities are described under
	<a href={href('/docs/licensing/')}>Licensing</a>.
</p>

<pre class="not-prose overflow-x-auto rounded-xl border border-white/10 bg-black/45 p-4 text-sm text-slate-200"><code># shell / CI
export AGS_LICENSE_KEY=ags_live_…</code></pre>

<h2>Policy files under <code>.ags/</code></h2>

<p>
	Engines read YAML from the repo root. Create the files you need; missing optional engines simply
	stay inactive until configured.
</p>

<ul>
	<li><code>.ags/versioning.yml</code> — semver packages + bump rules</li>
	<li><code>.ags/deployment.yml</code> — environments + promotion gates</li>
	<li><code>.ags/data-arrays.yml</code> — ordered / unique lists</li>
	<li><code>.ags/canonical.yml</code> — singular SoT registry</li>
</ul>

<DocCode title=".ags/versioning.yml" lang="yaml" code={snipVersioningYml} />

<p>More complete samples: <a href={href('/docs/examples/')}>Examples</a>.</p>

<h2>Commit-msg hook</h2>

<p>Point <code>core.hooksPath</code> at a hooks directory and validate with the package export:</p>

<DocCode title="commit-msg hook sketch" lang="ts" code={snipHooksWire} />

<pre class="not-prose overflow-x-auto rounded-xl border border-white/10 bg-black/45 p-4 text-sm text-slate-200"><code>git config core.hooksPath .githooks</code></pre>

<h2>MCP host</h2>

<p>
	Mount the AGS governance MCP server in your IDE so agents can call
	<code>enforcement_begin</code>, <code>staging_enforce</code>, <code>commit_checkpoint</code>, and the
	rest of the catalog:
</p>

<DocCode title="mcp.json (sketch)" lang="json" code={snipMcpJson} />

<p>
	Exact host entrypoint path ships with the package version you install — check the package README
	after install. Tool catalog and TypeScript imports:
	<a href={href('/docs/api/')}>API surface</a>.
</p>
