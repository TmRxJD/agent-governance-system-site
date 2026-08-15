<script lang="ts">
	import { page } from '$app/state';
	import { href } from '$lib/paths';
	import { docsNav } from '$lib/docs/nav';
	import { tutorialTracks } from '$lib/docs/tutorials/types';
	import { tutorialsInTrack } from '$lib/docs/tutorials/entries';

	function normalizePath(pathname: string) {
		const trimmed = pathname.replace(/\/+$/, '');
		return trimmed === '' ? '/' : trimmed;
	}

	function isIndexPath(pathname: string) {
		const p = normalizePath(pathname);
		return p === '/docs' || p.endsWith('/docs');
	}

	function isActive(path: string) {
		const here = normalizePath(page.url.pathname);
		const target = normalizePath(path);
		if (isIndexPath(target)) {
			return isIndexPath(here);
		}
		return here === target || here.startsWith(`${target}/`) || here.endsWith(target);
	}

	const onTutorials = $derived(normalizePath(page.url.pathname).includes('/docs/tutorials'));
</script>

<aside class="docs-sidebar flex w-full flex-col gap-6 lg:w-56 lg:shrink-0 xl:w-64">
	<div>
		<a
			href={href('/docs/')}
			class={`text-sm font-semibold transition ${
				isIndexPath(page.url.pathname) ? 'text-white' : 'text-slate-300 hover:text-white'
			}`}>Documentation</a
		>
		<p class="mt-1 text-xs text-slate-500">Browse by domain</p>
	</div>

	<nav class="flex flex-col gap-5" aria-label="Docs by domain">
		{#each docsNav as domain (domain.id)}
			<div>
				<p class="text-[11px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
					{domain.title}
				</p>
				<ul class="mt-2 space-y-0.5">
					{#each domain.pages as item (item.href)}
						<li>
							<a
								href={href(item.href)}
								class={`block rounded-md px-2 py-1.5 text-sm transition ${
									isActive(item.href)
										? 'bg-white/10 font-medium text-cyan-200'
										: 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
								}`}>{item.title}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>

	{#if onTutorials}
		<nav class="flex flex-col gap-5 border-t border-white/[0.08] pt-5" aria-label="Tutorial tracks">
			<p class="text-[11px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
				Tutorial tracks
			</p>
			{#each tutorialTracks as track (track.id)}
				<div>
					<a
						href={href(`/docs/tutorials/#${track.id}`)}
						class="text-[11px] font-semibold tracking-[0.08em] text-slate-400 uppercase hover:text-slate-200"
						>{track.title}</a
					>
					<ul class="mt-2 max-h-48 space-y-0.5 overflow-y-auto">
						{#each tutorialsInTrack(track.id) as item (item.slug)}
							<li>
								<a
									href={href(`/docs/tutorials/${item.slug}/`)}
									class={`block rounded-md px-2 py-1 text-xs transition ${
										isActive(`/docs/tutorials/${item.slug}/`)
											? 'bg-white/10 font-medium text-cyan-200'
											: 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-300'
									}`}>{item.title}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	{/if}
</aside>
