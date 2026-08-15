<script lang="ts">
	type Node = { name: string; bad?: boolean };

	const beforeTree: Node[] = [
		{ name: 'src/', bad: false },
		{ name: '  helpers2/', bad: true },
		{ name: '  utils_new/', bad: true },
		{ name: '  authService.copy.ts', bad: true },
		{ name: 'config/', bad: false },
		{ name: '  settings.json', bad: false },
		{ name: '  settings.final.json', bad: true },
		{ name: '  old-settings.json', bad: true },
		{ name: 'data/', bad: false },
		{ name: '  users: [{id},{Id},{user_id}]', bad: true }
	];

	const afterTree: Node[] = [
		{ name: 'src/', bad: false },
		{ name: '  domain/auth/', bad: false },
		{ name: '  domain/auth/service.ts', bad: false },
		{ name: 'config/', bad: false },
		{ name: '  settings.json  ← canonical', bad: false },
		{ name: 'data/', bad: false },
		{ name: '  users: [{ id }]  normalized', bad: false },
		{ name: '.ags/pointer.yml', bad: false },
		{ name: '.ags/canonical.yml', bad: false }
	];
</script>

<section id="repo" class="scroll-mt-20 border-t border-white/[0.06] bg-black/20 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4">
		<p class="text-sm font-medium text-violet-300/90">2 · Repo Governance & Structural Integrity</p>
		<h2 class="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
			The project stays coherent as it grows.
		</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
			Schema, arrays, pointers, and canonical sources keep structure honest. Dependencies and policy keep the
			map clean.
		</p>

		<div class="mt-10 grid gap-4 lg:grid-cols-2" data-ags-demo="repo">
			<div class="overflow-hidden rounded-2xl border border-fuchsia-500/25 bg-[#0a0610]">
				<div class="border-b border-fuchsia-500/20 px-4 py-2.5">
					<p class="text-[11px] font-semibold tracking-[0.16em] text-fuchsia-300/90 uppercase">
						Ungoverned repo
					</p>
					<p class="text-sm text-white">Before AGS</p>
				</div>
				<ul class="space-y-1 p-4 font-mono text-[12px]">
					{#each beforeTree as n}
						<li class={n.bad ? 'text-fuchsia-300/90' : 'text-slate-400'}>{n.name}</li>
					{/each}
				</ul>
				<p class="border-t border-fuchsia-500/20 px-4 py-2.5 text-xs text-fuchsia-200/80">
					Duplication. Unclear truth. Shape drift.
				</p>
			</div>

			<div class="overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#060d14]">
				<div class="border-b border-cyan-400/20 px-4 py-2.5">
					<p class="text-[11px] font-semibold tracking-[0.16em] text-cyan-300/90 uppercase">Governed repo</p>
					<p class="text-sm text-white">With AGS</p>
				</div>
				<ul class="space-y-1 p-4 font-mono text-[12px] text-cyan-100/90">
					{#each afterTree as n}
						<li>{n.name}</li>
					{/each}
				</ul>
				<p class="border-t border-cyan-400/20 px-4 py-2.5 text-xs text-cyan-100/80">
					Domain layout. One canonical source. Enforced pointers.
				</p>
			</div>
		</div>
	</div>
</section>
