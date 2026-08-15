<script lang="ts">
	import Button from '$lib/ui/Button.svelte';
	import { href } from '$lib/paths';

	const tiers = [
		{
			id: 'free',
			name: 'Free',
			priceLines: ['$0'],
			description: 'Core governance for agents and repos.',
			useCase: 'For exploration and small personal projects.',
			note: null as string | null,
			cta: { label: 'Get Free', href: '/get/', variant: 'ghost' as const }
		},
		{
			id: 'personal',
			name: 'Personal',
			priceLines: ['$12/month', 'or $120/year'],
			description: 'Full agent and repo intelligence for individual developers.',
			useCase: 'For solo developers.',
			note: 'Students receive 75% off Personal.',
			cta: { label: 'Buy license', href: '/get/', variant: 'neon' as const }
		},
		{
			id: 'enterprise',
			name: 'Enterprise',
			priceLines: ['$49/month per seat', '$499/year per seat', '$2,500/year unlimited seats'],
			description: 'Full governance across agents, repos, and delivery pipelines.',
			useCase: 'For teams and companies.',
			note: null as string | null,
			cta: { label: 'Buy license', href: '/get/', variant: 'primary' as const }
		}
	];
</script>

<section id="tiers" class="scroll-mt-20 pb-14 pt-8 sm:pb-16 sm:pt-10">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<!-- Force three columns from tablet up; stack only on narrow phones -->
		<div class="grid grid-cols-1 gap-4 min-[720px]:grid-cols-3 min-[720px]:gap-5">
			{#each tiers as tier (tier.id)}
				<article
					class={`flex min-w-0 flex-col rounded-2xl border p-5 sm:p-6 ${
						tier.id === 'personal'
							? 'border-cyan-400/35 bg-gradient-to-b from-cyan-950/40 to-[#0a1018] shadow-[0_24px_60px_rgba(34,211,238,0.08)]'
							: 'border-white/10 bg-white/[0.02]'
					}`}
				>
					<h2 class="text-lg font-semibold text-white">{tier.name}</h2>
					<div class="mt-3 space-y-1">
						{#each tier.priceLines as line, i (line)}
							<p
								class={i === 0
									? 'text-xl font-semibold tracking-tight text-white sm:text-2xl'
									: 'text-sm text-slate-400'}
							>
								{line}
							</p>
						{/each}
					</div>
					{#if tier.note}
						<p class="mt-3 text-xs text-cyan-300/90" title={tier.note}>{tier.note}</p>
					{/if}
					<p class="mt-4 text-sm leading-snug text-slate-300">{tier.description}</p>
					<p class="mt-2 text-sm text-slate-500">{tier.useCase}</p>
					<div class="mt-6 flex-1"></div>
					<Button href={href(tier.cta.href)} variant={tier.cta.variant} class="w-full"
						>{tier.cta.label}</Button
					>
				</article>
			{/each}
		</div>
	</div>
</section>
