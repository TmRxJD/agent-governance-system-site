<script lang="ts">
	import ComparePanel from './ComparePanel.svelte';

	const beforeLines = [
		{ text: 'agent: rewrite AuthService “cleaner”', tone: 'warn' as const },
		{ text: '→ renames helpers inconsistently', tone: 'bad' as const },
		{ text: '→ drops yesterday’s error-shape decision', tone: 'bad' as const },
		{ text: '→ invents a new folder for the same concern', tone: 'bad' as const },
		{ text: '→ style drifts from the rest of the module', tone: 'bad' as const },
		{ text: '→ “looks fine” — invariants quietly broken', tone: 'bad' as const }
	];

	const afterLines = [
		{ text: 'agent: change AuthService under scope', tone: 'ok' as const },
		{ text: '→ Commit-Scope: single-change', tone: 'ok' as const },
		{ text: '→ reuses the builder it created earlier', tone: 'ok' as const },
		{ text: '→ checks semantic graph before renaming', tone: 'ok' as const },
		{ text: '→ canonical path required — no new orphan folder', tone: 'ok' as const },
		{ text: '→ policy + enforcement: drift outside rules blocked', tone: 'ok' as const }
	];
</script>

<section id="discipline" class="scroll-mt-20 border-t border-white/[0.06] py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4">
		<p class="text-sm font-medium text-cyan-300/90">1 · Agent Discipline & Drift Prevention</p>
		<h2 class="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
			From vibe coding to governed agent work.
		</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
			Ungoverned agents rewrite history of decisions as they go. AGS keeps scope, meaning, builders, and policy
			in force so the same agent stays consistent over time.
		</p>

		<div class="mt-10 grid gap-4 lg:grid-cols-2" data-ags-demo="discipline">
			<ComparePanel
				variant="before"
				title="AI coding without AGS"
				subtitle="Session log"
				lines={beforeLines}
				footer="Inconsistent. Forgetful. Structure drifts."
			/>
			<ComparePanel
				variant="after"
				title="AI coding with AGS"
				subtitle="Governed session"
				lines={afterLines}
				footer="Scoped. Consistent. Deterministic."
			/>
		</div>

		<div class="mt-8 grid gap-4 sm:grid-cols-3">
			<div class="rounded-xl border border-white/10 bg-white/[0.02] p-4">
				<p class="text-xs tracking-wide text-slate-500 uppercase">Semantic graph</p>
				<p class="mt-2 text-sm text-slate-300">
					Agents reference concepts and constraints they already established — not reinvent names each turn.
				</p>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/[0.02] p-4">
				<p class="text-xs tracking-wide text-slate-500 uppercase">Builder reuse</p>
				<p class="mt-2 text-sm text-slate-300">
					Patterns the agent built earlier stay available and preferred over one-off rewrites.
				</p>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/[0.02] p-4">
				<p class="text-xs tracking-wide text-slate-500 uppercase">Enforcement</p>
				<p class="mt-2 text-sm text-slate-300">
					Sentinel and policy stop work that violates scope, meaning, or project rules.
				</p>
			</div>
		</div>
	</div>
</section>
