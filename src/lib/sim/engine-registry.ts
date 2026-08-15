/** Canonical showcase engine registry — public simulations only. */

export type DemoFeature = 'animation' | 'diagram' | 'interaction';

export type EngineMeta = {
	slug: string;
	title: string;
	shortTitle: string;
	blurb: string;
	wave: 'A' | 'B' | 'C' | 'D';
	semanticDomain: string;
	features: DemoFeature[];
	movieMode?: 'pipeline' | 'reflex' | 'deployment' | 'versioning';
};

export const ENGINES: EngineMeta[] = [
	{
		slug: 'staging',
		title: 'Staging Engine',
		shortTitle: 'Staging',
		blurb: 'Classify diffs into atomic Commit-Scopes before an agent commits.',
		wave: 'A',
		semanticDomain: 'staging',
		features: ['animation', 'diagram', 'interaction'],
		movieMode: 'pipeline'
	},
	{
		slug: 'semantic-graph',
		title: 'Semantic Engine',
		shortTitle: 'Semantic',
		blurb: 'Constraint graph over concepts — contradictions surface as animated conflicts.',
		wave: 'A',
		semanticDomain: 'semantic',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'pointer-map',
		title: 'Pointer Engine',
		shortTitle: 'Pointer',
		blurb: 'Map repo paths to rules and detect documentation drift.',
		wave: 'A',
		semanticDomain: 'pointer',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'reflex-arcs',
		title: 'Sentinel Reflex',
		shortTitle: 'Sentinel',
		blurb:
			'Pain signals fire reflex arcs that deny raw git, force MCP commits, and clear only after real remediation — consistency with fewer wasted retries.',
		wave: 'A',
		semanticDomain: 'sentinel',
		features: ['animation', 'diagram', 'interaction'],
		movieMode: 'reflex'
	},
	{
		slug: 'versioning',
		title: 'Versioning Engine',
		shortTitle: 'Versioning',
		blurb: 'Semantic version graphs, bump rules, and changelog animation.',
		wave: 'A',
		semanticDomain: 'versioning',
		features: ['animation', 'diagram', 'interaction'],
		movieMode: 'versioning'
	},
	{
		slug: 'deployment',
		title: 'Deployment Engine',
		shortTitle: 'Deployment',
		blurb: 'Environment pipeline from dev → bench → staging → prod with health gates.',
		wave: 'A',
		semanticDomain: 'deployment',
		features: ['animation', 'diagram', 'interaction'],
		movieMode: 'deployment'
	},
	{
		slug: 'canonicalization',
		title: 'Canonicalization Engine',
		shortTitle: 'Canonical',
		blurb: 'Highlight the canonical source and animate reference drift.',
		wave: 'B',
		semanticDomain: 'canonical',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'data-arrays',
		title: 'Data Array Engine',
		shortTitle: 'Data Arrays',
		blurb: 'Normalize, order, and deduplicate governance arrays.',
		wave: 'B',
		semanticDomain: 'data-array',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'dependency',
		title: 'Dependency Engine',
		shortTitle: 'Dependency',
		blurb: 'Dependency graphs with cycle detection and compatibility cues.',
		wave: 'B',
		semanticDomain: 'dependency',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'policy',
		title: 'Policy Engine',
		shortTitle: 'Policy',
		blurb: 'Browse .ags/*.yml policies and watch enforcement animate.',
		wave: 'B',
		semanticDomain: 'policy',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'release',
		title: 'Release Engine',
		shortTitle: 'Release',
		blurb: 'Inspect release artifacts, tags, and generated notes.',
		wave: 'B',
		semanticDomain: 'release',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'promotion',
		title: 'Promotion Engine',
		shortTitle: 'Promotion',
		blurb: 'Gate promotions across environments with animated checks.',
		wave: 'B',
		semanticDomain: 'promotion',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'health',
		title: 'Health Engine',
		shortTitle: 'Health',
		blurb: 'Live health-check simulation with endpoint status pulses.',
		wave: 'C',
		semanticDomain: 'health',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'observability',
		title: 'Observability Engine',
		shortTitle: 'Observability',
		blurb: 'Logs + metrics viewer with anomaly detection animation.',
		wave: 'C',
		semanticDomain: 'observability',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'rollback',
		title: 'Rollback Engine',
		shortTitle: 'Rollback',
		blurb: 'Rollback flow with version tracking visualization.',
		wave: 'C',
		semanticDomain: 'rollback',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'efficiency',
		title: 'Efficiency Engine',
		shortTitle: 'Efficiency',
		blurb: 'Token budgets, loop prevention, and organic guardrails that make agents cheaper over time.',
		wave: 'A',
		semanticDomain: 'efficiency',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'impact',
		title: 'Impact Engine',
		shortTitle: 'Impact',
		blurb:
			'Growth auditor that proves the agent is getting smarter — curve-aware maturity, adversarial stress, no-op detection.',
		wave: 'A',
		semanticDomain: 'impact',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'optimization',
		title: 'Optimization Engine',
		shortTitle: 'Optimization',
		blurb: 'Performance budgets and MCP cost visualization.',
		wave: 'C',
		semanticDomain: 'optimization',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'artifact',
		title: 'Artifact Engine',
		shortTitle: 'Artifact',
		blurb: 'Artifact inspector with structure validation animation.',
		wave: 'C',
		semanticDomain: 'artifact',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'registry',
		title: 'Registry Engine',
		shortTitle: 'Registry',
		blurb: 'Private npm registry simulation and publish flow.',
		wave: 'C',
		semanticDomain: 'registry',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'integrity',
		title: 'Integrity Engine',
		shortTitle: 'Integrity',
		blurb: 'Checksum visualization and tamper detection.',
		wave: 'D',
		semanticDomain: 'integrity',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'identity',
		title: 'Identity Engine',
		shortTitle: 'Identity',
		blurb: 'Identity graph for agents, users, and environments.',
		wave: 'D',
		semanticDomain: 'identity',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'access',
		title: 'Access Engine',
		shortTitle: 'Access',
		blurb: 'Permission matrix with access-gating animation.',
		wave: 'D',
		semanticDomain: 'access',
		features: ['animation', 'diagram', 'interaction']
	},
	{
		slug: 'security',
		title: 'Security Engine',
		shortTitle: 'Security',
		blurb: 'Secret scanning simulation and secure deploy cues.',
		wave: 'D',
		semanticDomain: 'security',
		features: ['animation', 'diagram', 'interaction']
	}
];

export const ENGINE_SLUGS = ENGINES.map((e) => e.slug);

export function getEngine(slug: string): EngineMeta | undefined {
	return ENGINES.find((e) => e.slug === slug);
}

export function enginesByWave(wave: EngineMeta['wave']): EngineMeta[] {
	return ENGINES.filter((e) => e.wave === wave);
}
