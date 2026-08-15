<script lang="ts">
	type Props = {
		variant: 'before' | 'after';
		title: string;
		body: string;
	};

	let { variant, title, body }: Props = $props();
</script>

<article
	class={`rounded-xl border p-4 sm:p-5 ${
		variant === 'before'
			? 'border-fuchsia-500/20 bg-[#0a0610]/80'
			: 'border-cyan-400/25 bg-[#060d14]/80'
	}`}
>
	<h4
		class={`text-sm font-semibold ${
			variant === 'before' ? 'text-fuchsia-100' : 'text-cyan-100'
		}`}
	>
		{title}
	</h4>
	<p class="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
</article>
