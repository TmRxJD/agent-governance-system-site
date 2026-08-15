<script lang="ts">
	let tampered = $state(false);
	let verifying = $state(false);

	const original = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
	let checksum = $derived(tampered ? 'deadbeef00000000000000000000000000000000000000000000000000000000' : original);

	async function verify() {
		verifying = true;
		await new Promise((r) => setTimeout(r, 700));
		verifying = false;
	}

	const match = $derived(checksum === original);
</script>

<div class="space-y-4" data-ags-demo="integrity">
	<div class="flex flex-wrap gap-3">
		<button
			type="button"
			class="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100"
			onclick={verify}
			disabled={verifying}
		>
			{verifying ? 'Verifying…' : 'Verify checksum'}
		</button>
		<button
			type="button"
			class="rounded-lg border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100"
			onclick={() => (tampered = !tampered)}
		>
			{tampered ? 'Restore artifact' : 'Simulate tamper'}
		</button>
	</div>

	<div class="rounded-xl border border-white/10 bg-black/40 p-4">
		<p class="mb-2 text-xs text-slate-400">SHA-256</p>
		<p class="break-all font-mono text-[11px] text-violet-200">{checksum}</p>
	</div>

	{#if verifying}
		<p class="animate-pulse text-xs text-violet-300">Scanning blocks…</p>
	{:else if tampered}
		<p class="text-xs text-fuchsia-300">⚠ Tamper detected — hash mismatch</p>
	{:else}
		<p class="text-xs text-cyan-300">✓ Integrity verified</p>
	{/if}

	<div class="flex h-3 overflow-hidden rounded-full bg-white/5">
		{#each Array(32) as _, i}
			<div
				class="flex-1 border-r border-black/30 transition-colors duration-300
          {tampered && i > 20 ? 'bg-fuchsia-500' : match ? 'bg-cyan-500/70' : 'bg-violet-500/70'}"
			></div>
		{/each}
	</div>
</div>
