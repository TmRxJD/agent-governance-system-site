<script lang="ts">
	import { page } from '$app/state';
	import {
		absoluteFromPathname,
		absoluteUrl,
		DEFAULT_OG_IMAGE_PATH
	} from '$lib/site-meta';

	let {
		title,
		description,
		image = DEFAULT_OG_IMAGE_PATH,
		type = 'website'
	}: {
		title: string;
		description: string;
		image?: string;
		type?: string;
	} = $props();

	const canonical = $derived(absoluteFromPathname(page.url.pathname));
	const imageUrl = $derived(absoluteUrl(image));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="Agent Governance System" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
