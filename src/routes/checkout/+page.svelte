<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Button from '$lib/ui/Button.svelte';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import { href } from '$lib/paths';
	import {
		checkStudentProof,
		getPlan,
		isCommerceConfigured,
		loadStudentProof,
		preferredProvider,
		startCheckout,
		type PlanId
	} from '$lib/licensing';
	import { PLAN_DEFINITIONS } from '$lib/licensing/catalog';

	let planId = $state<PlanId>('personal_monthly');
	const plan = $derived(getPlan(planId) ?? getPlan('personal_monthly')!);

	let email = $state('');
	let seats = $state(1);
	let cadenceChoice = $state<'monthly' | 'yearly'>('monthly');
	let studentMode = $state(false);
	let studentOk = $state(false);
	let busy = $state(false);
	let message = $state('');
	let error = $state('');

	const selectable = PLAN_DEFINITIONS.filter((p) => p.showOnPricing);

	onMount(async () => {
		const fromQuery = page.url.searchParams.get('plan') as PlanId | null;
		if (fromQuery && getPlan(fromQuery)) {
			planId = fromQuery;
			if (fromQuery.includes('yearly')) cadenceChoice = 'yearly';
			if (fromQuery.includes('student')) studentMode = true;
		}
		const proof = loadStudentProof();
		if (proof) {
			const check = await checkStudentProof(proof);
			studentOk = Boolean(check.ok);
		}
	});

	function resolvePlanId(): PlanId {
		if (plan.tier === 'free') return 'free';
		if (plan.pricingCardId === 'personal') {
			if (studentMode) {
				return cadenceChoice === 'yearly'
					? 'personal_student_yearly'
					: 'personal_student_monthly';
			}
			return cadenceChoice === 'yearly' ? 'personal_yearly' : 'personal_monthly';
		}
		return cadenceChoice === 'yearly' ? 'enterprise_seat_yearly' : 'enterprise_seat_monthly';
	}

	async function onCheckout() {
		busy = true;
		error = '';
		message = '';
		const nextPlanId = resolvePlanId();
		const selected = getPlan(nextPlanId)!;
		if (selected.tier === 'free') {
			busy = false;
			window.location.href = href('/docs/install-commercial/');
			return;
		}
		if (!email.trim() || !email.includes('@')) {
			error = 'Enter a valid email so we can deliver your license key.';
			busy = false;
			return;
		}
		if (selected.student && !studentOk) {
			error = 'Verify as a student first, then return to checkout.';
			busy = false;
			return;
		}
		const origin = window.location.origin;
		const result = await startCheckout({
			planId: nextPlanId,
			email: email.trim().toLowerCase(),
			seats: selected.pricingCardId === 'enterprise' ? Math.max(1, seats) : 1,
			provider: preferredProvider(),
			successUrl: `${origin}${href('/checkout/success/')}`,
			cancelUrl: `${origin}${href('/checkout/cancel/')}`,
			studentProof: selected.student ? loadStudentProof() : undefined
		});
		busy = false;
		if (!result.ok) {
			if (result.code === 'student_required') {
				error = 'Student verification required. Complete verification, then try again.';
			} else if (result.code === 'not_configured') {
				error =
					'Commerce is reachable, but Stripe/PayPal price IDs are not set on the Appwrite function yet.';
			} else {
				error = result.error;
			}
			return;
		}
		message = 'Redirecting to payment…';
		window.location.href = result.checkoutUrl;
	}
</script>

<SeoHead
	title="Checkout · AGS"
	description="Start an AGS plan checkout. Stripe and PayPal connect through the commerce Appwrite function."
	image="/media/pricing-hero.jpg"
/>

<section class="mx-auto max-w-xl space-y-6">
	<div>
		<h1 class="text-3xl font-semibold text-white">Checkout</h1>
		<p class="mt-2 text-sm text-slate-400">
			After payment you get an activate link — paste one prompt into your AI agent. No env-file
			hunting.
		</p>
	</div>

	<GlassPanel>
		<label class="block text-sm text-slate-400" for="plan">Plan</label>
		<select
			id="plan"
			class="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
			bind:value={planId}
			onchange={() => {
				studentMode = false;
			}}
		>
			{#each selectable as opt (opt.id)}
				<option value={opt.id}>{opt.name} — {opt.priceLabel}</option>
			{/each}
		</select>

		{#if plan.tier !== 'free'}
			<div class="mt-4 flex gap-3 text-sm">
				<label class="flex items-center gap-2 text-slate-300">
					<input type="radio" bind:group={cadenceChoice} value="monthly" />
					Monthly
				</label>
				<label class="flex items-center gap-2 text-slate-300">
					<input type="radio" bind:group={cadenceChoice} value="yearly" />
					Yearly
				</label>
			</div>
		{/if}

		{#if plan.pricingCardId === 'personal' && plan.tier !== 'free'}
			<label class="mt-4 flex items-start gap-2 text-sm text-slate-300">
				<input type="checkbox" bind:checked={studentMode} class="mt-1" />
				<span>
					Student pricing (75% off) —
					{#if studentOk}
						<span class="text-cyan-300">verified on this device</span>
					{:else}
						<a class="text-cyan-300 underline" href={href('/students/')}>verify first</a>
					{/if}
				</span>
			</label>
		{/if}

		{#if plan.pricingCardId === 'enterprise'}
			<label class="mt-4 block text-sm text-slate-400" for="seats">Seats</label>
			<input
				id="seats"
				type="number"
				min="1"
				bind:value={seats}
				class="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
			/>
		{/if}

		<label class="mt-4 block text-sm text-slate-400" for="email">Email</label>
		<input
			id="email"
			type="email"
			autocomplete="email"
			bind:value={email}
			placeholder="you@company.com"
			class="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
		/>

		<div class="mt-6 flex flex-wrap gap-2">
			<button
				type="button"
				disabled={busy}
				onclick={onCheckout}
				class="inline-flex items-center justify-center rounded-xl border border-fuchsia-400/30 bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-fuchsia-500/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
			>
				{plan.tier === 'free' ? 'Continue to install' : busy ? 'Starting…' : 'Continue to payment'}
			</button>
			<Button href={href('/pricing/')} variant="ghost">Back to pricing</Button>
		</div>

		{#if !isCommerceConfigured()}
			<p class="mt-4 text-xs leading-relaxed text-amber-200/90">
				Commerce URL not configured — connect providers under
				<code class="text-amber-100">appwrite/functions/ags-commerce</code>.
			</p>
		{/if}
		{#if error}
			<p class="mt-4 text-sm text-rose-300">{error}</p>
		{/if}
		{#if message}
			<p class="mt-4 text-sm text-cyan-300">{message}</p>
		{/if}
	</GlassPanel>
</section>
