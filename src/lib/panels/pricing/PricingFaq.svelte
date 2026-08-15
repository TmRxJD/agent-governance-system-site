<script lang="ts">
	const faqs = [
		{
			q: 'What do I receive after checkout?',
			a: 'A license key and access to install the private AGS package. Activate the key in your project config to unlock the tier you bought.'
		},
		{
			q: 'Can I upgrade or downgrade later?',
			a: 'Yes. Checkout issues a new key for the new tier. Your previous key stops applying once you switch.'
		},
		{
			q: 'Can I switch between monthly and yearly billing?',
			a: 'Yes at renewal, or sooner by checking out the other cadence and using the new key. Unused time on the old plan is handled in Stripe.'
		},
		{
			q: 'Is the student discount only on Personal?',
			a: 'Yes. Students get 75% off Personal. Enterprise seats are full price.'
		},
		{
			q: 'Does AGS upload my source code?',
			a: 'No. It runs on your machine against your repo. Checkout and license checks do not send project files.'
		},
		{
			q: 'Do I need internet while coding?',
			a: 'Day-to-day use is local. You only need network for install, license refresh, or optional online validation.'
		},
		{
			q: 'What happens if I cancel?',
			a: 'Access continues through the paid period, then falls back to Free entitlements. You keep your project; paid features lock until you renew.'
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
