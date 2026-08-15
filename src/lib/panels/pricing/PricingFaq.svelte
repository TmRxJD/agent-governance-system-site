<script lang="ts">
	const faqs = [
		{
			q: 'Can I use AGS commercially on the Free tier?',
			a: 'Free is for exploration and small personal projects. Commercial production use requires Personal or Enterprise.'
		},
		{
			q: 'What happens if I upgrade from Free to Personal?',
			a: 'You receive a new license key with Personal entitlements. Existing Free keys remain valid until you switch.'
		},
		{
			q: 'How is Enterprise billed?',
			a: 'Monthly or yearly per seat, or a yearly unlimited-seat option — paid through Stripe checkout.'
		},
		{
			q: 'Can I cancel at any time?',
			a: 'Yes. Cancel anytime. Access continues through the paid period, then reverts to Free entitlements.'
		},
		{
			q: 'Does AGS store my code?',
			a: 'No. AGS runs against your repo locally. Licensing validates entitlement — it does not upload source.'
		},
		{
			q: 'How do student discounts work?',
			a: 'Verified students receive 75% off Personal. Apply the student option during Stripe checkout.'
		}
	];
</script>

<section id="faq" class="scroll-mt-16 border-t border-white/[0.06] bg-black/25 py-12 sm:py-14">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<h2 class="text-xl font-semibold tracking-tight text-white">FAQ</h2>
		<dl class="mt-6 space-y-5">
			{#each faqs as item (item.q)}
				<div class="border-b border-white/[0.06] pb-6">
					<dt class="text-sm font-semibold text-white">{item.q}</dt>
					<dd class="mt-2 text-sm leading-snug text-slate-400">{item.a}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

