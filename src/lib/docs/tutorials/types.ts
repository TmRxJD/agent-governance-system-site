/** Tutorial curriculum — one entry per learnable SDK surface. */

export type TutorialCode = { title: string; lang: string; code: string };

export type TutorialSection = {
	heading: string;
	paragraphs: string[];
	code?: TutorialCode;
	steps?: string[];
};

export type Tutorial = {
	slug: string;
	title: string;
	summary: string;
	trackId: string;
	prerequisites: string[];
	goals: string[];
	imports?: string[];
	mcpTools?: string[];
	cli?: string[];
	config?: string[];
	sections: TutorialSection[];
	relatedDocs?: { href: string; label: string }[];
};

export type TutorialTrack = {
	id: string;
	title: string;
	blurb: string;
};

export const tutorialTracks: TutorialTrack[] = [
	{
		id: 'setup',
		title: 'Setup & host',
		blurb: 'Install the package, mount MCP, and wire hooks so agents can call AGS.'
	},
	{
		id: 'commit',
		title: 'Commit loop',
		blurb: 'CAP, staging, enforcement, confidence, and legal agent commits.'
	},
	{
		id: 'structure',
		title: 'Structure graphs',
		blurb: 'Schema, pointer, and semantic graphs that keep meaning and paths aligned.'
	},
	{
		id: 'quality',
		title: 'Quality gates',
		blurb: 'Testing plans, performance budgets, and Sentinel halt/remediate.'
	},
	{
		id: 'singularity',
		title: 'Singularity & lists',
		blurb: 'Canonical SoT, ordered arrays, and dependency integrity.'
	},
	{
		id: 'delivery',
		title: 'Versioning & delivery',
		blurb: 'Semver bumps, environment ladders, promotion, release, health, rollback.'
	},
	{
		id: 'intelligence',
		title: 'Token intelligence',
		blurb: 'Efficiency, impact, and optimization — spend less, prove outcomes.'
	},
	{
		id: 'ops',
		title: 'Ops & trust',
		blurb: 'Policy, observability, artifacts, registry, identity, access, security.'
	},
	{
		id: 'support',
		title: 'Supporting engines',
		blurb: 'Persistence, tracking, builder, coordination, formatting, drift, gates, doctor.'
	},
	{
		id: 'licensing',
		title: 'Licensing',
		blurb: 'Dual-license sidecars and product tier entitlements.'
	}
];
