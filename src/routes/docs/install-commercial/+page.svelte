<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import { snipNpmrc, snipInstall } from '$lib/docs/snippets';
</script>

<h1>Install</h1>

<ol>
	<li>
		Get a plan from <a href={href('/pricing/')}>Pricing</a> /
		<a href={href('/checkout/')}>Checkout</a> and keep the license key handy
		(<code>AGS_LICENSE_KEY</code>). Free tier can install without a paid key.
	</li>
	<li>
		Create a GitHub personal access token (or fine-grained token) with
		<code>read:packages</code> and export it as <code>AGS_NPM_TOKEN</code>.
	</li>
	<li>Add registry auth for the <code>@tmrxjd</code> scope:</li>
</ol>

<DocCode title=".npmrc" lang="ini" code={snipNpmrc} />

<ol start="4">
	<li>Install into your app or monorepo:</li>
</ol>

<DocCode title="pnpm" lang="bash" code={snipInstall} />

<pre class="not-prose overflow-x-auto rounded-xl border border-white/10 bg-black/45 p-4 text-sm text-slate-200"><code># npm
npm install @tmrxjd/agent-governance-system

# yarn
yarn add @tmrxjd/agent-governance-system</code></pre>

<ol start="5">
	<li>
		Wire configuration — hooks, <code>.ags/*.yml</code>, and MCP — using
		<a href={href('/docs/configuration/')}>Configuration</a>, then follow
		<a href={href('/docs/tutorials/')}>Tutorials</a> for the first CAP session.
	</li>
</ol>

<h2>Verify the install</h2>

<pre class="not-prose overflow-x-auto rounded-xl border border-white/10 bg-black/45 p-4 text-sm text-slate-200"><code>node -e "require('@tmrxjd/agent-governance-system/commit-msg'); console.log('ok')"</code></pre>
