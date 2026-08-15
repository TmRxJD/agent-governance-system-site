<script lang="ts">
	import { onMount } from 'svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Button from '$lib/ui/Button.svelte';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import { href } from '$lib/paths';
	import {
		isCommerceConfigured,
		licenseStatus,
		lookupLicenses,
		openBillingPortal,
		type LicenseLookupResponse,
		type LicenseStatusResponse
	} from '$lib/licensing';

	let tab = $state<'key' | 'email'>('key');
	let licenseKey = $state('');
	let email = $state('');
	let busy = $state(false);
	let error = $state('');
	let status = $state<LicenseStatusResponse | null>(null);
	let lookup = $state<LicenseLookupResponse | null>(null);

	onMount(() => {
		/* client-only page actions */
	});

	async function checkKey() {
		busy = true;
		error = '';
		status = null;
		const result = await licenseStatus(licenseKey.trim());
		busy = false;
		if (!result.ok) {
			error = result.error;
			return;
		}
		status = result;
	}

	async function checkEmail() {
		busy = true;
		error = '';
		lookup = null;
		const result = await lookupLicenses(email.trim().toLowerCase());
		busy = false;
		if (!result.ok) {
			error = result.error;
			return;
		}
		lookup = result;
	}

	async function openPortal() {
		busy = true;
		error = '';
		const result = await openBillingPortal({
			email: email.trim().toLowerCase() || (status && status.ok ? status.email || '' : ''),
			returnUrl: `${window.location.origin}${href('/account/')}`
		});
		busy = false;
		if (!result.ok) {
			error = result.error;
			return;
		}
		window.location.href = result.url;
	}
</script>

<SeoHead
	title="Account · AGS"
	description="Check AGS license status, look up seats by email, and open the billing portal."
/>

<section class="mx-auto max-w-xl space-y-6">
	<div>
		<h1 class="text-3xl font-semibold text-white">License account</h1>
		<p class="mt-2 text-sm text-slate-400">
			Verify a key, list licenses for an email, or open Stripe Customer Portal when commerce is
			connected.
		</p>
	</div>

	<GlassPanel>
		<div class="flex gap-2 text-sm">
			<button
				type="button"
				class={`rounded-full px-3 py-1.5 ${tab === 'key' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
				onclick={() => (tab = 'key')}>By key</button
			>
			<button
				type="button"
				class={`rounded-full px-3 py-1.5 ${tab === 'email' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
				onclick={() => (tab = 'email')}>By email</button
			>
		</div>

		{#if tab === 'key'}
			<label class="mt-4 block text-sm text-slate-400" for="key">AGS_LICENSE_KEY</label>
			<textarea
				id="key"
				rows="3"
				bind:value={licenseKey}
				placeholder="ags_live_1...."
				class="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-xs text-white"
			></textarea>
			<div class="mt-4 flex flex-wrap gap-2">
				<button
					type="button"
					disabled={busy || !licenseKey.trim()}
					onclick={checkKey}
					class="inline-flex rounded-xl border border-cyan-400/40 bg-cyan-400/15 px-4 py-2.5 text-sm font-semibold text-cyan-200 disabled:opacity-50"
					>{busy ? 'Checking…' : 'Check status'}</button
				>
				<Button href={href('/checkout/')} variant="ghost">Checkout</Button>
			</div>
		{:else}
			<label class="mt-4 block text-sm text-slate-400" for="email">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				placeholder="you@company.com"
				class="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
			/>
			<div class="mt-4 flex flex-wrap gap-2">
				<button
					type="button"
					disabled={busy || !email.includes('@')}
					onclick={checkEmail}
					class="inline-flex rounded-xl border border-cyan-400/40 bg-cyan-400/15 px-4 py-2.5 text-sm font-semibold text-cyan-200 disabled:opacity-50"
					>{busy ? 'Looking up…' : 'Look up licenses'}</button
				>
				<button
					type="button"
					disabled={busy || !email.includes('@')}
					onclick={openPortal}
					class="inline-flex rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-200 disabled:opacity-50"
					>Billing portal</button
				>
			</div>
		{/if}

		{#if !isCommerceConfigured()}
			<p class="mt-4 text-xs text-amber-200/90">
				Set <code class="text-amber-100">PUBLIC_APPWRITE_ENDPOINT</code> +
				<code class="text-amber-100">PUBLIC_APPWRITE_PROJECT_ID</code> (or
				<code class="text-amber-100">PUBLIC_AGS_COMMERCE_URL</code>) to enable live status.
			</p>
		{/if}
		{#if error}
			<p class="mt-4 text-sm text-rose-300">{error}</p>
		{/if}

		{#if status?.ok}
			<div class="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300">
				<p><span class="text-slate-500">Key id</span> · {status.keyId}</p>
				<p class="mt-1"><span class="text-slate-500">Tier</span> · {status.tier}</p>
				<p class="mt-1"><span class="text-slate-500">Status</span> · {status.status}</p>
				<p class="mt-1"><span class="text-slate-500">Seats</span> · {status.seats}</p>
				{#if status.planId}
					<p class="mt-1"><span class="text-slate-500">Plan</span> · {status.planId}</p>
				{/if}
			</div>
		{/if}

		{#if lookup?.ok}
			<ul class="mt-6 space-y-3">
				{#each lookup.licenses as lic (lic.keyId)}
					<li class="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300">
						<p class="font-medium text-white">{lic.planId} · {lic.status}</p>
						<p class="mt-1 text-slate-500">{lic.keyId} · {lic.tier} · {lic.seats} seat(s)</p>
					</li>
				{:else}
					<li class="text-sm text-slate-500">No licenses found for that email.</li>
				{/each}
			</ul>
		{/if}
	</GlassPanel>
</section>
