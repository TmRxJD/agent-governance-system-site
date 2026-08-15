<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import CopyBlock from '$lib/components/CopyBlock.svelte';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { href } from '$lib/paths';
	import {
		buildAgentActivationPrompt,
		humanActivationSteps
	} from '$lib/licensing/activate';
	import { isCommerceConfigured, redeemSetupToken } from '$lib/licensing';

	let licenseKey = $state('');
	let agentPrompt = $state('');
	let loading = $state(true);
	let error = $state('');
	let planId = $state('');

	const steps = humanActivationSteps();

	onMount(async () => {
		const t = page.url.searchParams.get('t');
		const k = page.url.searchParams.get('k');
		if (t && isCommerceConfigured()) {
			const res = await redeemSetupToken(t);
			if (res.ok) {
				licenseKey = res.licenseKey;
				agentPrompt = res.agentPrompt;
				planId = res.planId;
			} else {
				error = res.error || 'Could not redeem setup token.';
			}
		} else if (k) {
			licenseKey = k;
			agentPrompt = buildAgentActivationPrompt(k);
		} else {
			error =
				'No activation token or license key in this link. Open the link from your license email, or paste your key on the account page.';
		}
		loading = false;
	});
</script>

<SeoHead
	title="Activate AGS · paste to your AI"
	description="Activate your AGS license by pasting one prompt into your AI coding agent. No env-file hunting."
/>

<section class="mx-auto max-w-2xl space-y-8">
	<header>
		<p class="text-sm font-medium tracking-wide text-cyan-300/90">Activate</p>
		<h1 class="mt-2 text-3xl font-semibold text-white">Get AGS ready without touching code</h1>
		<p class="mt-3 text-slate-400">
			You do the human steps. Your AI agent installs the package, writes the license, wires MCP, and
			confirms ready.
		</p>
	</header>

	{#if loading}
		<p class="text-sm text-slate-400">Loading your activation…</p>
	{:else if error && !licenseKey}
		<GlassPanel>
			<p class="text-sm text-rose-300">{error}</p>
			<div class="mt-4 flex flex-wrap gap-2">
				<Button href={href('/account/')} variant="neon">Account / paste key</Button>
				<Button href={href('/docs/install-commercial/')} variant="ghost">Install docs</Button>
			</div>
		</GlassPanel>
	{:else}
		{#if planId}
			<p class="text-xs text-slate-500">Plan · {planId}</p>
		{/if}

		<section class="space-y-4">
			<p class="text-xs font-semibold tracking-[0.2em] text-cyan-300/90 uppercase">
				For you (human)
			</p>
			<ol class="space-y-4">
				{#each steps as step, i (step.id)}
					<li>
						<GlassPanel padding="p-4">
							<p class="text-sm font-semibold text-white">
								<span class="text-cyan-300">{i + 1}.</span>
								{step.title}
							</p>
							<p class="mt-2 text-sm leading-relaxed text-slate-300">{step.body}</p>
							{#if step.copyText}
								<div class="mt-3">
									<CopyBlock text={step.copyText} label={step.copyLabel || 'Copy'} />
								</div>
							{/if}
						</GlassPanel>
					</li>
				{/each}
			</ol>
		</section>

		<section class="space-y-3">
			<p class="text-xs font-semibold tracking-[0.2em] text-fuchsia-300/90 uppercase">
				Activation prompt — paste to your AI
			</p>
			<GlassPanel padding="p-4">
				<CopyBlock text={agentPrompt} label="Activation prompt" multiline />
			</GlassPanel>
		</section>

		<section class="space-y-3">
			<p class="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
				License key (private)
			</p>
			<GlassPanel padding="p-4">
				<CopyBlock text={licenseKey} label="AGS_LICENSE_KEY" />
				<p class="mt-3 text-xs text-slate-500">
					Prefer the activation prompt above. Only share this key with your own agent or hosts you
					control.
				</p>
			</GlassPanel>
		</section>

		<footer class="flex flex-wrap gap-3 border-t border-white/10 pt-6 text-sm">
			<Button href={href('/account/')} variant="ghost">Account</Button>
			<Button href={href('/docs/tutorials/')} variant="ghost">Tutorials</Button>
			<Button href={href('/pricing/')} variant="ghost">Pricing</Button>
		</footer>
	{/if}
</section>
