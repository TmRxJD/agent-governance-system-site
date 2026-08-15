<script lang="ts">
	import { ENGINES, enginesByWave } from '$lib/sim/engine-registry';
	import { href } from '$lib/paths';

	const waves = [
		{ id: 'A' as const, title: 'Core loop', lead: 'Classify, mean, guard, version, deploy, measure.' },
		{ id: 'B' as const, title: 'Structure & policy', lead: 'Singularity, lists, deps, release, promotion.' },
		{ id: 'C' as const, title: 'Operations', lead: 'Health, observability, rollback, artifacts, registry.' },
		{ id: 'D' as const, title: 'Trust boundary', lead: 'Integrity, identity, access, security.' }
	];
</script>

<h1>Engine registry</h1>

<p>
	AGS ships as a catalog of engines. Each engine owns a semantic domain, registers MCP tools / gates,
	and participates in Sentinel reflexes when something fails. There are
	<strong>{ENGINES.length}</strong> engines in the public registry.
</p>

<p>
	Start with Staging, Semantic, Pointer, Sentinel, Efficiency, and Versioning. Add Canonical + Data
	Arrays when docs and lists start drifting. Layer ops and trust engines as you promote to shared
	environments.
</p>

{#each waves as wave (wave.id)}
	<h2>{wave.title} <span class="text-slate-500">(wave {wave.id})</span></h2>
	<p>{wave.lead}</p>
	<div class="not-prose my-4 overflow-x-auto rounded-xl border border-white/10">
		<table class="w-full min-w-[36rem] text-left text-sm">
			<thead class="bg-white/[0.04] text-slate-400">
				<tr>
					<th class="px-3 py-2 font-medium">Engine</th>
					<th class="px-3 py-2 font-medium">Domain</th>
					<th class="px-3 py-2 font-medium">What it does</th>
					<th class="px-3 py-2 font-medium">Try</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-white/[0.06] text-slate-300">
				{#each enginesByWave(wave.id) as engine (engine.slug)}
					<tr>
						<td class="px-3 py-2.5 font-medium text-white">{engine.shortTitle}</td>
						<td class="px-3 py-2.5 font-mono text-xs text-cyan-200/80">{engine.semanticDomain}</td>
						<td class="px-3 py-2.5">{engine.blurb}</td>
						<td class="px-3 py-2.5">
							<a class="text-cyan-300 hover:underline" href={href(`/showcase/${engine.slug}/`)}
								>Showcase</a
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/each}

<h2>How agents use them</h2>

<p>
	Engines are not “pick one.” A governed commit typically touches several: staging classifies the
	diff, confidence scores risk, domain engines validate touched surfaces, Sentinel aggregates halt
	signals, then CAP allows <code>commit_checkpoint</code>. See
	<a href={href('/docs/architecture/')}>architecture</a> for the ordered pipeline and
	<a href={href('/docs/api/')}>API</a> for tool names.
</p>
