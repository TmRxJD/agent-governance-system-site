<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { href } from '$lib/paths';
	import {
		checkStudentProof,
		completeStudentGithub,
		confirmStudentEdu,
		isCommerceConfigured,
		loadStudentProof,
		requestStudentEdu,
		saveStudentProof,
		startStudentGithub
	} from '$lib/licensing';

	let status = $state<'idle' | 'working' | 'verified' | 'error'>('idle');
	let message = $state('');
	let eduEmail = $state('');
	let proofEmail = $state('');
	let method = $state('');

	async function finishProof(proof: string, email: string, m: string) {
		saveStudentProof(proof);
		proofEmail = email;
		method = m;
		status = 'verified';
		message = 'Student verification saved on this device. Continue to student checkout.';
	}

	onMount(async () => {
		const existing = loadStudentProof();
		if (existing) {
			const check = await checkStudentProof(existing);
			if (check.ok) {
				status = 'verified';
				message = 'You already have a valid student proof on this device.';
				const claims = check.claims as { email?: string; method?: string } | undefined;
				proofEmail = claims?.email || '';
				method = claims?.method || '';
			}
		}

		const code = page.url.searchParams.get('code');
		const state = page.url.searchParams.get('state');
		const edu = page.url.searchParams.get('edu');
		const provider = page.url.searchParams.get('provider');

		if (edu) {
			status = 'working';
			const conf = await confirmStudentEdu(edu);
			if (conf.ok) await finishProof(conf.studentProof, conf.email, conf.method);
			else {
				status = 'error';
				message = conf.error || 'School email confirmation failed.';
			}
			return;
		}

		if (code && (provider === 'github' || state)) {
			status = 'working';
			const done = await completeStudentGithub(code, state || undefined);
			if (done.ok) await finishProof(done.studentProof, done.email, done.method);
			else {
				status = 'error';
				message = done.error || 'GitHub student verification failed.';
			}
		}
	});

	async function onGithub() {
		status = 'working';
		message = '';
		const started = await startStudentGithub(
			`${window.location.origin}${href('/checkout/?plan=personal_student_monthly')}`
		);
		if (!started.ok || !started.authUrl) {
			status = 'error';
			message =
				started.error ||
				'GitHub Student Pack verification is not configured yet (needs GITHUB_OAUTH_CLIENT_ID on the commerce function).';
			return;
		}
		if (started.state) sessionStorage.setItem('ags_gh_oauth_state', started.state);
		window.location.href = started.authUrl;
	}

	async function onEdu() {
		status = 'working';
		message = '';
		const res = await requestStudentEdu(eduEmail.trim().toLowerCase());
		if (!res.ok) {
			status = 'error';
			message = res.error || 'Could not send confirmation.';
			return;
		}
		status = 'idle';
		message = `Check ${res.email} for a confirmation link (valid 2 hours).`;
	}
</script>

<SeoHead
	title="Student verification · AGS"
	description="Verify GitHub Student Developer Pack or a school email to unlock the AGS student plan."
/>

<section class="mx-auto max-w-xl space-y-6">
	<header>
		<p class="text-sm font-medium tracking-wide text-cyan-300/90">Students</p>
		<h1 class="mt-2 text-3xl font-semibold text-white">Verify for student pricing</h1>
		<p class="mt-3 text-sm leading-relaxed text-slate-400">
			Primary: GitHub Student Developer Pack. Fallback: school email (.edu / academic domains)
			with a magic link. Proof lasts on this device for months — then re-verify.
		</p>
	</header>

	{#if !isCommerceConfigured()}
		<GlassPanel>
			<p class="text-sm text-amber-200/90">Commerce is not configured in this build.</p>
		</GlassPanel>
	{/if}

	{#if status === 'verified'}
		<GlassPanel>
			<p class="text-sm text-cyan-200">Verified{method ? ` · ${method}` : ''}</p>
			{#if proofEmail}
				<p class="mt-1 text-xs text-slate-500">{proofEmail}</p>
			{/if}
			<p class="mt-3 text-sm text-slate-300">{message}</p>
			<div class="mt-5 flex flex-wrap gap-2">
				<Button href={href('/checkout/?plan=personal_student_monthly')} variant="neon"
					>Student checkout</Button
				>
				<Button href={href('/pricing/')} variant="ghost">Pricing</Button>
			</div>
		</GlassPanel>
	{:else}
		<GlassPanel>
			<h2 class="text-lg font-semibold text-white">GitHub Student Pack</h2>
			<p class="mt-2 text-sm text-slate-400">
				Sign in with GitHub. We call GitHub’s education API — you must already be in the Student
				Developer Pack.
			</p>
			<button
				type="button"
				class="mt-4 inline-flex items-center justify-center rounded-xl border border-fuchsia-400/30 bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-fuchsia-500/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
				disabled={status === 'working'}
				onclick={onGithub}
			>
				{status === 'working' ? 'Working…' : 'Continue with GitHub'}
			</button>
		</GlassPanel>

		<GlassPanel>
			<h2 class="text-lg font-semibold text-white">School email fallback</h2>
			<p class="mt-2 text-sm text-slate-400">
				Use if you have a .edu (or equivalent) address but not GitHub Student Pack yet.
			</p>
			<label class="mt-4 block text-sm text-slate-400" for="edu">School email</label>
			<input
				id="edu"
				type="email"
				bind:value={eduEmail}
				placeholder="you@university.edu"
				class="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
			/>
			<button
				type="button"
				class="mt-4 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10 disabled:opacity-50"
				disabled={status === 'working' || !eduEmail.includes('@')}
				onclick={onEdu}
			>
				Send confirmation link
			</button>
		</GlassPanel>
	{/if}

	{#if message && status !== 'verified'}
		<p class={`text-sm ${status === 'error' ? 'text-rose-300' : 'text-slate-400'}`}>{message}</p>
	{/if}

	<p class="text-xs text-slate-500">
		Abuse of student pricing can revoke the license. Pack membership or school email must be
		legitimate.
	</p>
</section>
