<script lang="ts">
	type Props = {
		variant: 'before' | 'after';
		title: string;
		body: string;
	};

	let { variant, title, body }: Props = $props();
</script>

<article class="border-0 py-4">
	<div class="flex gap-3">
		<span
			class={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${
				variant === 'before' ? 'bg-fuchsia-400' : 'bg-cyan-400'
			}`}
			aria-hidden="true"
		></span>
		<div class="min-w-0">
			<h4 class="text-[15px] font-semibold leading-snug text-white">{title}</h4>
			<p class="mt-1 text-[13px] leading-snug text-slate-500">{body}</p>
		</div>
	</div>
</article>
