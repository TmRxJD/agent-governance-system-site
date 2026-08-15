<script lang="ts">
	import { href } from '$lib/paths';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';

	const pages = [
		{ href: '/docs/overview/', title: 'Overview' },
		{ href: '/docs/engine-registry/', title: 'Engine registry' },
		{ href: '/docs/architecture/', title: 'Architecture' },
		{ href: '/docs/semantic-domains/', title: 'Semantic domains' },
		{ href: '/docs/pointer-domains/', title: 'Pointer domains' },
		{ href: '/docs/staging-scopes/', title: 'Staging scopes' },
		{ href: '/docs/licensing/', title: 'Licensing model' },
		{ href: '/docs/versioning/', title: 'Versioning model' },
		{ href: '/docs/deployment/', title: 'Deployment model' },
		{ href: '/docs/data-array/', title: 'Data Array Engine' },
		{ href: '/docs/canonical/', title: 'Canonicalization Engine' },
		{ href: '/docs/configuration/', title: 'Configuration model' },
		{ href: '/docs/api/', title: 'API surface' },
		{ href: '/docs/examples/', title: 'Examples' },
		{ href: '/docs/tutorials/', title: 'Tutorials' },
		{ href: '/docs/install-commercial/', title: 'Install (commercial)' },
		{ href: '/docs/install-tower/', title: 'Install (Tower Community)' }
	];
</script>

<section>
	<h1 class="text-3xl font-semibold">Documentation</h1>
	<p class="mt-2 max-w-2xl text-slate-300">
		Public docs for Agent Governance System. Engines live in the private package; this site explains models,
		pipelines, and install paths.
	</p>
	<div class="mt-8 grid gap-3 sm:grid-cols-2">
		{#each pages as p}
			<a href={href(p.href)}>
				<GlassPanel class="transition hover:border-cyan-400/40">
					<h2 class="font-medium">{p.title}</h2>
				</GlassPanel>
			</a>
		{/each}
	</div>
</section>
