<script lang="ts">
	import Button from '$lib/ui/Button.svelte';
	import { href } from '$lib/paths';
	import { base } from '$app/paths';

	const tiers = [
		{
			id: 'free',
			name: 'Free',
			image: '/media/pricing-free.jpg',
			pricePrimary: '$0',
			priceSecondary: null as string | null,
			description: 'Core governance for agents and repos.',
			useCase: 'Exploration and small personal projects.',
			cta: { label: 'Get Free', href: '/get/', variant: 'ghost' as const }
		},
		{
			id: 'personal',
			name: 'Personal',
			image: '/media/pricing-personal.jpg',
			pricePrimary: '$12/mo',
			priceSecondary: '$120/year - Students 75% off',
			description: 'Full agent and repo intelligence for individual developers.',
			useCase: 'Solo developers.',
			cta: { label: 'Buy license', href: '/get/', variant: 'neon' as const }
		},
		{
			id: 'enterprise',
			name: 'Enterprise',
			image: '/media/pricing-enterprise.jpg',
			pricePrimary: '$49/mo per seat',
			priceSecondary: '$499/yr seat - $2,500/yr unlimited',
			description: 'Full governance across agents, repos, and delivery pipelines.',
			useCase: 'Teams and companies.',
			cta: { label: 'Buy license', href: '/get/', variant: 'primary' as const }
		}
	];
</script>

<section id="tiers" class="scroll-mt-16 pb-12 pt-6 sm:pb-14 sm:pt-8">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 items-stretch gap-4 min-[720px]:grid-cols-3 min-[720px]:gap-5">
			{#each tiers as tier (tier.id)}
				<article
					class={`flex min-w-0 flex-col overflow-hidden rounded-2xl border ${
						tier.id === 'personal'
							? 'border-cyan-400/35 bg-gradient-to-b from-cyan-950/30 to-[#0a1018] shadow-[0_20px_50px_rgba(34,211,238,0.1)]'
							: 'border-white/10 bg-white/[0.02]'
					}`}
				>
					<div class="relative h-28 shrink-0 sm:h-32">
						<img
							src={`${base}${tier.image}`}
							alt=""
							class="h-full w-full object-cover opacity-80"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-[#0a1018] via-[#0a1018]/40 to-transparent"
						></div>
					</div>

					<div class="flex flex-1 flex-col p-5">
						<h2 class="text-lg font-semibold text-white">{tier.name}</h2>

						<div class="mt-3 flex h-[3.25rem] flex-col justify-start gap-0.5">
							<p class="text-xl font-semibold tracking-tight text-white">{tier.pricePrimary}</p>
							{#if tier.priceSecondary}
								<p class="text-xs leading-snug text-slate-400">{tier.priceSecondary}</p>
							{/if}
						</div>

						<p class="mt-4 text-sm leading-snug text-slate-300">{tier.description}</p>
						<p class="mt-1.5 text-sm text-slate-500">{tier.useCase}</p>

						<div class="mt-auto pt-6">
							<Button href={href(tier.cta.href)} variant={tier.cta.variant} class="w-full"
								>{tier.cta.label}</Button
							>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
