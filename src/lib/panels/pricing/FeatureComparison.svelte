<script lang="ts">
	type Cell = boolean;

	type Row = { label: string; free: Cell; personal: Cell; enterprise: Cell };

	type Group = { name: string; rows: Row[] };

	const groups: Group[] = [
		{
			name: 'Token Efficiency',
			rows: [
				{ label: 'Token-aware agent discipline', free: true, personal: true, enterprise: true },
				{ label: 'Organic guardrail learning', free: false, personal: true, enterprise: true },
				{ label: 'Reasoning loop prevention', free: false, personal: true, enterprise: true },
				{ label: 'Multi-file context compression', free: false, personal: true, enterprise: true },
				{ label: 'Delivery pipeline token reduction', free: false, personal: false, enterprise: true }
			]
		},
		{
			name: 'Agent Governance',
			rows: [
				{ label: 'Basic agent discipline', free: true, personal: true, enterprise: true },
				{ label: 'Semantic graph intelligence', free: false, personal: true, enterprise: true },
				{ label: 'Builder evolution & pattern learning', free: false, personal: true, enterprise: true },
				{ label: 'Multi-file refactors', free: false, personal: true, enterprise: true }
			]
		},
		{
			name: 'Repo Governance',
			rows: [
				{ label: 'Schemas, pointers, canonical sources', free: true, personal: true, enterprise: true },
				{ label: 'Cross-module contract alignment', free: false, personal: true, enterprise: true },
				{ label: 'Deep context retrieval', free: false, personal: true, enterprise: true }
			]
		},
		{
			name: 'Delivery Governance',
			rows: [
				{ label: 'Scoped commit governance', free: true, personal: true, enterprise: true },
				{ label: 'Versioning engine', free: false, personal: false, enterprise: true },
				{ label: 'Release & promotion engines', free: false, personal: false, enterprise: true },
				{ label: 'Deployment governance', free: false, personal: false, enterprise: true },
				{ label: 'Artifact & registry integrity', free: false, personal: false, enterprise: true },
				{ label: 'Rollback orchestration', free: false, personal: false, enterprise: true },
				{ label: 'Security & access governance', free: false, personal: false, enterprise: true }
			]
		}
	];
</script>

<section id="compare" class="scroll-mt-16 border-y border-white/[0.06] bg-black/25 py-12 sm:py-14">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<h2 class="text-xl font-semibold tracking-tight text-white">Feature comparison</h2>
		<p class="mt-1 text-sm text-slate-500">What each tier unlocks.</p>

		<div class="mt-6 overflow-x-auto rounded-2xl border border-white/10">
			<table class="w-full min-w-[36rem] border-collapse text-left text-sm">
				<thead>
					<tr class="border-b border-white/10 bg-white/[0.03]">
						<th class="px-4 py-3 font-medium text-slate-400 sm:px-5">Capability</th>
						<th class="px-3 py-3 text-center font-medium text-white">Free</th>
						<th class="px-3 py-3 text-center font-medium text-white">Personal</th>
						<th class="px-3 py-3 text-center font-medium text-white">Enterprise</th>
					</tr>
				</thead>
				<tbody>
					{#each groups as group (group.name)}
						<tr class="border-b border-white/10 bg-white/[0.02]">
							<td colspan="4" class="px-4 py-2.5 text-xs font-semibold tracking-wide text-cyan-300/80 uppercase sm:px-5">
								{group.name}
							</td>
						</tr>
						{#each group.rows as row (row.label)}
							<tr class="border-b border-white/[0.06]">
								<td class="px-4 py-3 text-slate-300 sm:px-5">{row.label}</td>
								<td class="px-3 py-3 text-center">
									{#if row.free}
										<span class="text-cyan-300" aria-label="Included">✓</span>
									{:else}
										<span class="text-slate-700" aria-label="Not included">—</span>
									{/if}
								</td>
								<td class="px-3 py-3 text-center">
									{#if row.personal}
										<span class="text-cyan-300" aria-label="Included">✓</span>
									{:else}
										<span class="text-slate-700" aria-label="Not included">—</span>
									{/if}
								</td>
								<td class="px-3 py-3 text-center">
									{#if row.enterprise}
										<span class="text-cyan-300" aria-label="Included">✓</span>
									{:else}
										<span class="text-slate-700" aria-label="Not included">—</span>
									{/if}
								</td>
							</tr>
						{/each}
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>

