<script lang="ts">
	type Props = {
		variant: 'before' | 'after';
		title: string;
		body: string;
	};

	let { variant, title, body }: Props = $props();
</script>

<article
	class={`rounded-xl border px-4 py-3.5 ${
		variant === 'before'
			? 'border-white/10 bg-black/25'
			: 'border-white/10 bg-black/25'
	}`}
>
	<div class="flex gap-3">
		<span
			class={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
				variant === 'before' ? 'bg-fuchsia-400' : 'bg-cyan-400'
			}`}
			aria-hidden="true"
		></span>
		<div>
			<h4 class="text-sm font-semibold text-white">{title}</h4>
			<p class="mt-1.5 text-sm leading-snug text-slate-400">{body}</p>
		</div>
	</div>
</article>
