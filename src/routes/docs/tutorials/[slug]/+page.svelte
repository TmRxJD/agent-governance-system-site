<script lang="ts">
	import TutorialArticle from '$lib/components/TutorialArticle.svelte';

	let { data } = $props();
</script>

<TutorialArticle tutorial={data.tutorial} prev={data.prev} next={data.next} />
