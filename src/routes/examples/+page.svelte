<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import {
		snipVersioningYml,
		snipDeploymentYml,
		snipDataArraysYml,
		snipCanonicalYml
	} from '$lib/docs/snippets';
	import { href } from '$lib/paths';
</script>

<section class="mx-auto max-w-3xl space-y-8 px-4 py-10">
	<div>
		<h1 class="text-3xl font-semibold text-white">Examples</h1>
		<p class="mt-3 text-slate-400">
			Sample AGS policy files you can drop into a repo. Full guides live in
			<a class="text-cyan-300 hover:underline" href={href('/docs/examples/')}>Docs → Examples</a>.
		</p>
	</div>

	<DocCode title=".ags/versioning.yml" lang="yaml" code={snipVersioningYml} />
	<DocCode title=".ags/deployment.yml" lang="yaml" code={snipDeploymentYml} />
	<DocCode title=".ags/data-arrays.yml" lang="yaml" code={snipDataArraysYml} />
	<DocCode title=".ags/canonical.yml" lang="yaml" code={snipCanonicalYml} />
</section>
