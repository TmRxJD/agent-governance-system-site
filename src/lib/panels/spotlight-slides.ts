export type HeroSpotlightSlide = {
	id: string;
	title: string;
	body: string;
};

/** First-viewport hero copy — token savings + consistent, scalable AI development. */
export const HERO_SPOTLIGHT_SLIDES: HeroSpotlightSlide[] = [
	{
		id: 'budget',
		title: 'Keep AI coding on track — without burning your budget',
		body: 'AGS helps agents follow your project’s real rules, redo less work, and stay consistent from edit to ship.'
	},
	{
		id: 'retry-tax',
		title: 'Stop paying for the same mistake twice',
		body: 'Agents burn tokens retrying broken fixes and chasing the wrong files. AGS remembers how your project works, so less of your bill is waste.'
	},
	{
		id: 'rules-once',
		title: 'Explain the repo once — not every session',
		body: 'Durable project rules travel with the agent. Less re-briefing, more shipping — and a budget that goes further as the codebase grows.'
	},
	{
		id: 'one-contract',
		title: 'Same rules for every agent you run',
		body: 'Cursor, Claude, CI — one contract instead of three house styles. Consistent AI development that scales with your team.'
	},
	{
		id: 'ship-coherent',
		title: 'From edit to ship without drift',
		body: 'Governance keeps agents on the path your humans already trust — fewer shortcuts, cleaner handoffs, coherent delivery at scale.'
	}
];

export const HERO_SPOTLIGHT_INTERVAL_MS = 7000;
