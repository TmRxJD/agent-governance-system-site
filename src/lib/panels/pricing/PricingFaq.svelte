<script lang="ts">
	const faqs = [
		{
			q: 'How do I get a license key?',
			a: 'Free uses install docs without a paid key. Personal and Enterprise go through Checkout — when payment succeeds you get an activate link (email) with a paste-to-AI prompt. You should not need to hunt for env files.'
		},
		{
			q: 'What do I receive after checkout?',
			a: 'An activate page link, a one-time setup token, and a signed license key. Open Activate, copy the activation prompt, paste it into your AI coding agent, and wait for “AGS ready.”'
		},
		{
			q: 'Where do I manage an existing license?',
			a: 'Use Account to check a key, look up licenses by email, or open the Stripe billing portal when commerce is connected. Re-open Activate anytime from your email link.'
		},
		{
			q: 'Which payment providers are supported?',
			a: 'The commerce layer is provider-agnostic. Stripe and PayPal adapters are scaffolded — enable one (or both) via Appwrite function env vars when you are ready to take payments.'
		},
		{
			q: 'Can I upgrade or downgrade later?',
			a: 'Yes once billing is live. A new checkout or portal session updates the license record and issues a replacement key for the new tier.'
		},
		{
			q: 'Is the student discount only on Personal?',
			a: 'Yes — 75% off Personal after verification. Verify via GitHub Student Developer Pack (preferred) or a school email at /students/, then checkout with the student toggle.'
		},
		{
			q: 'Does AGS upload my source code?',
			a: 'No. It runs on your machine against your repo. License authorize calls send only the key (and optional machine fingerprint), never project files.'
		},
		{
			q: 'Do I need internet while coding?',
			a: 'Day-to-day use is local. You need network for install, optional online authorize/refresh, or checkout.'
		},
		{
			q: 'What’s the difference between per-seat and unlimited Enterprise?',
			a: 'Per-seat bills each active seat monthly or yearly. Unlimited is a flat yearly option when you don’t want to count seats.'
		}
	];
</script>

<section id="faq" class="scroll-mt-16 border-t border-white/[0.06] bg-black/25 py-12 sm:py-14">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<h2 class="text-xl font-semibold tracking-tight text-white">FAQ</h2>
		<dl class="mt-6 space-y-5">
			{#each faqs as item (item.q)}
				<div class="border-b border-white/[0.06] pb-6 last:border-b-0">
					<dt class="text-sm font-semibold text-white">{item.q}</dt>
					<dd class="mt-2 text-sm leading-snug text-slate-400">{item.a}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
