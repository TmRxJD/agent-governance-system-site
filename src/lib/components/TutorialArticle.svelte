<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import { href } from '$lib/paths';
	import { tutorials } from '$lib/docs/tutorials/entries';
	import {
		polishMcpCode,
		polishTutorialParagraph,
		tutorialTitleBySlug
	} from '$lib/docs/tutorials/polish';
	import type { Tutorial } from '$lib/docs/tutorials/types';

	let { tutorial, prev, next }: { tutorial: Tutorial; prev?: Tutorial; next?: Tutorial } =
		$props();
</script>

<h1>{tutorial.title}</h1>
<p>{tutorial.summary}</p>

{#if tutorial.goals.length}
	<h2>What you will learn</h2>
	<ul>
		{#each tutorial.goals as goal}
			<li>{goal}</li>
		{/each}
	</ul>
{/if}

{#if tutorial.prerequisites.length}
	<h2>Prerequisites</h2>
	<ul>
		{#each tutorial.prerequisites as slug}
			<li>
				<a href={href(`/docs/tutorials/${slug}/`)}>{tutorialTitleBySlug(slug, tutorials)}</a>
			</li>
		{/each}
	</ul>
{/if}

{#if tutorial.imports?.length || tutorial.mcpTools?.length || tutorial.cli?.length || tutorial.config?.length}
	<h2>Surface</h2>
	<div class="not-prose my-4 overflow-x-auto rounded-xl border border-white/10">
		<table class="w-full min-w-[28rem] text-left text-sm">
			<tbody class="divide-y divide-white/[0.06] text-slate-300">
				{#if tutorial.imports?.length}
					<tr>
						<th class="px-3 py-2 align-top font-medium text-slate-400">Imports</th>
						<td class="px-3 py-2 font-mono text-xs text-cyan-200/90"
							>{tutorial.imports.join(' · ')}</td
						>
					</tr>
				{/if}
				{#if tutorial.mcpTools?.length}
					<tr>
						<th class="px-3 py-2 align-top font-medium text-slate-400">MCP</th>
						<td class="px-3 py-2 font-mono text-xs text-cyan-200/90"
							>{tutorial.mcpTools.join(' · ')}</td
						>
					</tr>
				{/if}
				{#if tutorial.cli?.length}
					<tr>
						<th class="px-3 py-2 align-top font-medium text-slate-400">CLI</th>
						<td class="px-3 py-2 font-mono text-xs text-cyan-200/90">{tutorial.cli.join(' · ')}</td>
					</tr>
				{/if}
				{#if tutorial.config?.length}
					<tr>
						<th class="px-3 py-2 align-top font-medium text-slate-400">Config</th>
						<td class="px-3 py-2 font-mono text-xs text-cyan-200/90"
							>{tutorial.config.join(' · ')}</td
						>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
{/if}

{#each tutorial.sections as section}
	<h2>{section.heading}</h2>
	{#each section.paragraphs as p}
		<p>{polishTutorialParagraph(p, tutorial)}</p>
	{/each}
	{#if section.steps?.length}
		<ol>
			{#each section.steps as step}
				<li>{step}</li>
			{/each}
		</ol>
	{/if}
	{#if section.code}
		<DocCode
			title={section.code.title}
			lang={section.code.lang}
			code={section.code.lang === 'json'
				? polishMcpCode(section.code.title, section.code.code, tutorial)
				: section.code.code}
		/>
	{/if}
{/each}

{#if tutorial.relatedDocs?.length}
	<h2>Related reference</h2>
	<ul>
		{#each tutorial.relatedDocs as doc}
			<li><a href={href(doc.href)}>{doc.label}</a></li>
		{/each}
	</ul>
{/if}

<nav
	class="not-prose mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:justify-between"
>
	{#if prev}
		<a class="text-sm text-cyan-300 hover:text-cyan-200" href={href(`/docs/tutorials/${prev.slug}/`)}
			>← {prev.title}</a
		>
	{:else}
		<span></span>
	{/if}
	{#if next}
		<a
			class="text-sm text-cyan-300 hover:text-cyan-200 sm:text-right"
			href={href(`/docs/tutorials/${next.slug}/`)}>{next.title} →</a
		>
	{/if}
</nav>
