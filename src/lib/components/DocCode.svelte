<script lang="ts">
	let {
		title,
		code,
		lang = 'text'
	}: {
		title?: string;
		code: string;
		lang?: string;
	} = $props();
</script>

<figure class="not-prose my-5 overflow-hidden rounded-xl border border-white/10 bg-black/45">
	{#if title}
		<figcaption
			class="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-xs text-cyan-200/90"
		>
			<span>{title}</span>
			<span class="text-slate-500 uppercase">{lang}</span>
		</figcaption>
	{/if}
	<pre class="overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-200"><code>{code}</code></pre>
</figure>
