<script lang="ts">
	type Props = {
		text: string;
		label?: string;
		/** Larger mono block for prompts. */
		multiline?: boolean;
	};

	let { text, label = 'Copy', multiline = false }: Props = $props();
	let status = $state<'idle' | 'copied' | 'failed'>('idle');

	async function copy() {
		try {
			await navigator.clipboard.writeText(text);
			status = 'copied';
			setTimeout(() => (status = 'idle'), 1800);
		} catch {
			status = 'failed';
			setTimeout(() => (status = 'idle'), 2200);
		}
	}
</script>

<div class="space-y-2">
	<div class="flex items-center justify-between gap-2">
		{#if label}
			<span class="text-xs font-medium tracking-wide text-slate-500 uppercase">{label}</span>
		{/if}
		<button
			type="button"
			class="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
			onclick={copy}
		>
			{status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}
		</button>
	</div>
	{#if multiline}
		<pre
			class="max-h-80 overflow-auto rounded-xl border border-white/10 bg-black/45 p-4 font-mono text-sm whitespace-pre-wrap text-slate-200"
		>{text}</pre>
	{:else}
		<p
			class="rounded-xl border border-white/10 bg-black/35 px-3 py-2 font-mono text-sm break-all text-slate-300"
		>
			{text}
		</p>
	{/if}
</div>
