<script lang="ts">
	import Scene from './Scene.svelte';
	import TerminalDemo from './TerminalDemo.svelte';
	import { href } from '$lib/paths';

	const frames = [
		[
			{ kind: 'cmd' as const, text: 'git commit -m "fix stuff"' },
			{ kind: 'err' as const, text: 'blocked — CAP=on, missing Commit-Scope' }
		],
		[
			{ kind: 'cmd' as const, text: 'git commit -m "fix stuff"' },
			{ kind: 'err' as const, text: 'blocked — staging: scope unclassified' }
		],
		[
			{ kind: 'cmd' as const, text: 'ags checkpoint --scope single-change' },
			{ kind: 'ok' as const, text: 'accepted — status/checkpoint(ags-site)' }
		]
	];
</script>

<Scene
	anchor="commit-gate"
	eyebrow="Use case"
	title="A commit that doesn’t clear the gate doesn’t land."
	lede="CAP and Staging sit on the commit path. Incomplete messages stop. Scoped checkpoints pass."
>
	{#snippet aside()}
		<a class="text-sm text-cyan-300 hover:underline" href={href('/showcase/staging/')}>Staging →</a>
		<span class="mx-2 text-slate-600">·</span>
		<a class="text-sm text-cyan-300 hover:underline" href={href('/docs/staging-scopes/')}>Scopes →</a>
	{/snippet}
	<TerminalDemo {frames} title="agent · repo shell" />
</Scene>
