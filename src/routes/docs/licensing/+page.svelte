<script lang="ts">
	import { href } from '$lib/paths';
</script>

<h1>Licensing</h1>

<p>
	AGS product plans unlock capability tiers in the runtime via a license key
	(<code>AGS_LICENSE_KEY</code>). Purchase and manage seats from
	<a href={href('/pricing/')}>Pricing</a> /
	<a href={href('/checkout/')}>Checkout</a>.
</p>

<h2>Plans</h2>

<div class="not-prose my-4 overflow-x-auto rounded-xl border border-white/10">
	<table class="w-full min-w-[36rem] text-left text-sm">
		<thead class="bg-white/[0.04] text-slate-400">
			<tr>
				<th class="px-3 py-2">Plan</th>
				<th class="px-3 py-2">Best for</th>
				<th class="px-3 py-2">What you get</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-white/[0.06] text-slate-300">
			<tr>
				<td class="px-3 py-2 font-medium text-white">Free</td>
				<td class="px-3 py-2">Exploration and small personal projects</td>
				<td class="px-3 py-2">Core governance for agents and repos</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-medium text-white">Personal</td>
				<td class="px-3 py-2">Solo developers</td>
				<td class="px-3 py-2">
					Full agent and repo intelligence; student discount available on
					<a class="text-cyan-300" href={href('/pricing/')}>Pricing</a>
				</td>
			</tr>
			<tr>
				<td class="px-3 py-2 font-medium text-white">Enterprise</td>
				<td class="px-3 py-2">Teams and companies</td>
				<td class="px-3 py-2">
					Full governance across agents, repos, and delivery pipelines (per-seat or unlimited)
				</td>
			</tr>
		</tbody>
	</table>
</div>

<h2>How keys work</h2>

<ol>
	<li>Complete checkout (or use Free) → receive a signed license key when billing is connected.</li>
	<li>Set <code>AGS_LICENSE_KEY</code> in local env, CI secrets, and MCP host env.</li>
	<li>
		The <code>product-licensing</code> package export maps your tier to capabilities. Online authorize
		(commerce Appwrite function) confirms the key is still active in the license database.
	</li>
</ol>

<pre class="not-prose overflow-x-auto rounded-xl border border-white/10 bg-black/45 p-4 text-sm text-slate-200"><code>export AGS_LICENSE_KEY=ags_live_…
# then start your MCP host / agent session</code></pre>

<h2>Install</h2>

<ul>
	<li><a href={href('/docs/install-commercial/')}>Install</a> — package install + registry auth</li>
	<li><a href={href('/checkout/')}>Checkout</a> — start a paid plan when payment providers are connected</li>
</ul>
