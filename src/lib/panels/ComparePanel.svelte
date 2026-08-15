<script lang="ts">
	type Item = { title: string; body: string };

	type Props = {
		variant: 'before' | 'after';
		heading: string;
		items: Item[];
		closing?: string;
	};

	let { variant, heading, items, closing }: Props = $props();
</script>

<div
	class={`flex h-full flex-col overflow-hidden rounded-2xl border ${
		variant === 'before'
			? 'border-fuchsia-500/25 bg-[#0a0610]'
			: 'border-cyan-400/30 bg-[#060d14]'
	}`}
	data-ags-diagram="panel"
>
	<div
		class={`border-b px-5 py-3 ${
			variant === 'before' ? 'border-fuchsia-500/20' : 'border-cyan-400/20'
		}`}
	>
		<p
			class={`text-[11px] font-semibold tracking-[0.16em] uppercase ${
				variant === 'before' ? 'text-fuchsia-300/90' : 'text-cyan-300/90'
			}`}
		>
			{variant === 'before' ? 'Ungoverned' : 'Governed'}
		</p>
		<p class="mt-1 text-base font-medium text-white">{heading}</p>
	</div>

	<ul class="flex-1 space-y-4 px-5 py-4">
		{#each items as item}
			<li>
				<p
					class={`text-sm font-medium ${
						variant === 'before' ? 'text-fuchsia-100' : 'text-cyan-100'
					}`}
				>
					{item.title}
				</p>
				<p class="mt-1 text-sm leading-relaxed text-slate-400">{item.body}</p>
			</li>
		{/each}
	</ul>

	{#if closing}
		<div
			class={`border-t px-5 py-3 text-sm ${
				variant === 'before'
					? 'border-fuchsia-500/20 text-fuchsia-200/85'
					: 'border-cyan-400/20 text-cyan-100/85'
			}`}
		>
			{closing}
		</div>
	{/if}
</div>
