/** Docs wiki navigation — single source for sidebar + index. */

export type DocsNavPage = {
	href: string;
	title: string;
	summary: string;
};

export type DocsNavDomain = {
	id: string;
	title: string;
	blurb: string;
	pages: DocsNavPage[];
};

export const docsNav: DocsNavDomain[] = [
	{
		id: 'start',
		title: 'Getting started',
		blurb: 'Who AGS is for, how to install it, and how to configure a repo.',
		pages: [
			{
				href: '/docs/overview/',
				title: 'Overview',
				summary: 'What AGS does for agents, repos, and delivery — and who should use it.'
			},
			{
				href: '/docs/install-commercial/',
				title: 'Install',
				summary: 'Install @tmrxjd/agent-governance-system and wire auth for the package registry.'
			},
			{
				href: '/docs/configuration/',
				title: 'Configuration',
				summary: '`.ags/*.yml` policies, license keys, hooks, and MCP host setup.'
			}
		]
	},
	{
		id: 'product',
		title: 'Product & licensing',
		blurb: 'Plans, versions, and promotion through environments.',
		pages: [
			{
				href: '/docs/licensing/',
				title: 'Licensing',
				summary: 'Free, Personal, Enterprise — what each plan unlocks.'
			},
			{
				href: '/docs/versioning/',
				title: 'Versioning',
				summary: 'Semver bump rules tied to staging scopes and changelogs.'
			},
			{
				href: '/docs/deployment/',
				title: 'Deployment',
				summary: 'Environment order, health gates, and promotion requirements.'
			}
		]
	},
	{
		id: 'architecture',
		title: 'Architecture',
		blurb: 'How engines compose into a governed agent loop.',
		pages: [
			{
				href: '/docs/architecture/',
				title: 'System architecture',
				summary: 'The enforcement → staging → confidence → commit pipeline.'
			},
			{
				href: '/docs/engine-registry/',
				title: 'Engine registry',
				summary: 'Every engine: what it owns and when agents call it.'
			},
			{
				href: '/docs/api/',
				title: 'API surface',
				summary: 'Package exports, MCP tools, and commit-msg validation.'
			}
		]
	},
	{
		id: 'domains',
		title: 'Governance domains',
		blurb: 'The rules layers that keep agents and repos aligned.',
		pages: [
			{
				href: '/docs/semantic-domains/',
				title: 'Semantic domains',
				summary: 'Named meaning spaces agents must stay consistent with.'
			},
			{
				href: '/docs/pointer-domains/',
				title: 'Pointer domains',
				summary: 'Path → home maps that catch doc and structure drift.'
			},
			{
				href: '/docs/staging-scopes/',
				title: 'Staging scopes',
				summary: 'Atomic Commit-Scope categories for safe agent commits.'
			},
			{
				href: '/docs/canonical/',
				title: 'Canonicalization',
				summary: 'One source of truth per concept, with drift detection.'
			},
			{
				href: '/docs/data-array/',
				title: 'Data arrays',
				summary: 'Ordered, deduped lists with enforce + normalize plans.'
			}
		]
	},
	{
		id: 'guides',
		title: 'Guides',
		blurb: 'Copy-paste configs and a full SDK tutorial curriculum.',
		pages: [
			{
				href: '/docs/tutorials/',
				title: 'Tutorials',
				summary: 'Fifty-one hands-on guides covering every AGS SDK surface.'
			},
			{
				href: '/docs/examples/',
				title: 'Examples',
				summary: 'Ready-to-adapt YAML and TypeScript snippets.'
			}
		]
	}
];

/** Flat list for search / active-page lookup. */
export function allDocsPages(): DocsNavPage[] {
	return docsNav.flatMap((d) => d.pages);
}

export function findDocsPage(pathname: string): DocsNavPage | undefined {
	const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
	return allDocsPages().find(
		(p) => normalized.includes(p.href) || normalized.endsWith(p.href.replace(/^\//, ''))
	);
}
