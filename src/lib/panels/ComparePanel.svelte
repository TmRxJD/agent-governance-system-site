<script lang="ts">
	type Line = { text: string; tone?: 'bad' | 'ok' | 'muted' | 'warn' };

	type Props = {
		title: string;
		subtitle?: string;
		variant: 'before' | 'after';
		lines: Line[];
		footer?: string;
	};

	let { title, subtitle, variant, lines, footer }: Props = $props();
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
		class={`flex items-center justify-between border-b px-4 py-2.5 ${
			variant === 'before' ? 'border-fuchsia-500/20' : 'border-cyan-400/20'
		}`}
	>
		<div>
			<p
				class={`text-[11px] font-semibold tracking-[0.16em] uppercase ${
					variant === 'before' ? 'text-fuchsia-300/90' : 'text-cyan-300/90'
				}`}
			>
				{variant === 'before' ? 'Ungoverned' : 'Governed'}
			</p>
			<p class="text-sm font-medium text-white">{title}</p>
			{#if subtitle}
				<p class="text-xs text-slate-500">{subtitle}</p>
			{/if}
		</div>
		<span
			class={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
				variant === 'before'
					? 'bg-fuchsia-500/15 text-fuchsia-200'
					: 'bg-cyan-500/15 text-cyan-100'
			}`}>{variant === 'before' ? 'Before AGS' : 'With AGS'}</span
		>
	</div>

	<div class="flex-1 space-y-1.5 p-3 font-mono text-[12px] leading-relaxed">
		{#each lines as line}
			<p
				class={line.tone === 'bad'
					? 'text-fuchsia-300/90'
					: line.tone === 'ok'
						? 'text-cyan-200'
						: line.tone === 'warn'
							? 'text-amber-200/90'
							: 'text-slate-400'}
			>
				{line.text}
			</p>
		{/each}
	</div>

	{#if footer}
		<div
			class={`border-t px-4 py-2.5 text-xs ${
				variant === 'before'
					? 'border-fuchsia-500/20 text-fuchsia-200/80'
					: 'border-cyan-400/20 text-cyan-100/80'
			}`}
		>
			{footer}
		</div>
	{/if}
</div>
