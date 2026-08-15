<script lang="ts">
	const commitsBefore = [
		{ text: 'wip', bad: true },
		{ text: 'fix stuff', bad: true },
		{ text: 'asdf', bad: true },
		{ text: 'update files + config + docs', bad: true },
		{ text: 'final????', bad: true }
	];
	const commitsAfter = [
		{ text: 'status/checkpoint(auth): fix token parse', bad: false },
		{ text: '  Commit-Scope: single-change', bad: false },
		{ text: 'status/checkpoint(docs): add pointer rule', bad: false },
		{ text: '  Commit-Scope: file-create', bad: false },
		{ text: 'status/checkpoint(schema): align user array', bad: false }
	];

	const versionsBefore = ['0.1.0', '0.1.0-fix', 'v2', '0.1.3?', 'prod-hotfix'];
	const versionsAfter = ['0.1.0', '0.1.1  patch', '0.2.0  minor', '1.0.0  major'];

	const deployBefore = ['laptop → production', 'no health gate', 'no rollback plan', 'artifact: “build.zip”'];
	const deployAfter = [
		'dev → bench → staging → prod',
		'health required before promote',
		'rollback path retained',
		'artifact + registry integrity checked'
	];
</script>

<section id="delivery" class="scroll-mt-20 border-t border-white/[0.06] py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4">
		<p class="text-sm font-medium text-fuchsia-300/90">3 · Governed Delivery</p>
		<h2 class="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
			Software ships safely and predictably.
		</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
			Commits, versions, environments, artifacts, and releases stay under the same governance — not a separate
			hopeful process.
		</p>

		<div class="mt-10 grid gap-4 lg:grid-cols-3" data-ags-demo="delivery">
			<!-- Commits -->
			<div class="overflow-hidden rounded-2xl border border-white/10 bg-[#080b12]">
				<div class="border-b border-white/10 px-4 py-2.5">
					<p class="text-xs text-slate-500">Commit history</p>
					<p class="text-sm text-white">Before → After</p>
				</div>
				<div class="grid grid-cols-2 gap-0 text-[11px]">
					<ul class="space-y-1 border-r border-white/10 p-3 font-mono text-fuchsia-300/85">
						{#each commitsBefore as c}
							<li>{c.text}</li>
						{/each}
					</ul>
					<ul class="space-y-1 p-3 font-mono text-cyan-200/90">
						{#each commitsAfter as c}
							<li>{c.text}</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Versions -->
			<div class="overflow-hidden rounded-2xl border border-white/10 bg-[#080b12]">
				<div class="border-b border-white/10 px-4 py-2.5">
					<p class="text-xs text-slate-500">Versioning</p>
					<p class="text-sm text-white">Before → After</p>
				</div>
				<div class="grid grid-cols-2 gap-0 text-[11px]">
					<ul class="space-y-1 border-r border-white/10 p-3 font-mono text-fuchsia-300/85">
						{#each versionsBefore as v}
							<li>{v}</li>
						{/each}
					</ul>
					<ul class="space-y-1 p-3 font-mono text-cyan-200/90">
						{#each versionsAfter as v}
							<li>{v}</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Deploy -->
			<div class="overflow-hidden rounded-2xl border border-white/10 bg-[#080b12]">
				<div class="border-b border-white/10 px-4 py-2.5">
					<p class="text-xs text-slate-500">Deployment</p>
					<p class="text-sm text-white">Before → After</p>
				</div>
				<div class="grid grid-cols-2 gap-0 text-[11px]">
					<ul class="space-y-1 border-r border-white/10 p-3 font-mono text-fuchsia-300/85">
						{#each deployBefore as d}
							<li>{d}</li>
						{/each}
					</ul>
					<ul class="space-y-1 p-3 font-mono text-cyan-200/90">
						{#each deployAfter as d}
							<li>{d}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
