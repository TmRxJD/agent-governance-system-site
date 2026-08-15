<script lang="ts">
	type Cell = boolean;

	type Row = { label: string; free: Cell; personal: Cell; enterprise: Cell };

	type Group = { name: string; rows: Row[] };

	const groups: Group[] = [
		{
			name: 'Results you can see',
			rows: [
				{ label: 'Clear score for whether work got better', free: true, personal: true, enterprise: true },
				{ label: 'Checks that the project is actually improving', free: false, personal: true, enterprise: true },
				{ label: 'Treats “stable” as success, not stuck', free: false, personal: true, enterprise: true },
				{ label: 'Stress-tests against bad agent behavior', free: false, personal: true, enterprise: true },
				{ label: 'Flags no progress and regressions', free: false, personal: true, enterprise: true },
				{ label: 'Side-by-side with vs without AGS', free: false, personal: true, enterprise: true },
				{ label: 'Uses results to cut waste next time', free: false, personal: true, enterprise: true },
				{ label: 'Coordinates impact across the full system', free: false, personal: false, enterprise: true }
			]
		},
		{
			name: 'Cost & usage',
			rows: [
				{ label: 'Avoids wasted retries', free: true, personal: true, enterprise: true },
				{ label: 'Learns your project rules', free: false, personal: true, enterprise: true },
				{ label: 'Stops circular prompts', free: false, personal: true, enterprise: true },
				{ label: 'Smarter multi-file context', free: false, personal: true, enterprise: true },
				{ label: 'Leaner delivery workflows', free: false, personal: false, enterprise: true },
				{ label: 'Usage analytics', free: false, personal: false, enterprise: true },
				{ label: 'Cost forecasting', free: false, personal: false, enterprise: true },
				{ label: 'Multi-agent usage control', free: false, personal: false, enterprise: true }
			]
		},
		{
			name: 'Agent behavior',
			rows: [
				{ label: 'Keeps agents consistent', free: true, personal: true, enterprise: true },
				{ label: 'Understands how concepts connect', free: false, personal: true, enterprise: true },
				{ label: 'Reuses patterns it already learned', free: false, personal: true, enterprise: true },
				{ label: 'Safe multi-file changes', free: false, personal: true, enterprise: true }
			]
		},
		{
			name: 'Codebase structure',
			rows: [
				{ label: 'One source of truth for shapes & rules', free: true, personal: true, enterprise: true },
				{ label: 'Keeps modules in agreement', free: false, personal: true, enterprise: true },
				{ label: 'Pulls the right context automatically', free: false, personal: true, enterprise: true }
			]
		},
		{
			name: 'Shipping & releases',
			rows: [
				{ label: 'Clear, scoped commits', free: true, personal: true, enterprise: true },
				{ label: 'Predictable version numbers', free: false, personal: false, enterprise: true },
				{ label: 'Controlled releases & promotions', free: false, personal: false, enterprise: true },
				{ label: 'Safer deployments', free: false, personal: false, enterprise: true },
				{ label: 'Trusted build artifacts', free: false, personal: false, enterprise: true },
				{ label: 'Known rollback paths', free: false, personal: false, enterprise: true },
				{ label: 'Access & security controls', free: false, personal: false, enterprise: true }
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

