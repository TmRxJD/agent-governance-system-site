/** Concise objective narratives for engine deep pages. */

export type EngineNarrative = {
	watch: { label: string; detail: string; tone?: 'ok' | 'warn' | 'idle' }[];
	diagram: string;
	example: string;
	docsPath: string;
};

export const NARRATIVES: Record<string, EngineNarrative> = {
	staging: {
		watch: [
			{ label: 'Incoming diff', detail: 'Agent edited three paths.', tone: 'idle' },
			{ label: 'Classify', detail: 'Each path gets one Commit-Scope.', tone: 'idle' },
			{ label: 'single-change', detail: 'paths.ts only.', tone: 'ok' },
			{ label: 'Batch blocked', detail: 'Mixed scopes cannot share a commit.', tone: 'warn' }
		],
		diagram: `flowchart LR
  diff[Diff] --> classify[Classify]
  classify --> scope[Commit-Scope]
  scope --> gate{One scope?}
  gate -->|yes| pass[Checkpoint]
  gate -->|no| block[Block]`,
		example: `Commit-Scope: single-change
Status: checkpoint
User-approved: no`,
		docsPath: '/docs/staging-scopes/'
	},
	'semantic-graph': {
		watch: [
			{ label: 'Load graph', detail: 'Concepts + constraints.', tone: 'ok' },
			{ label: 'Assert', detail: 'done requires user_approved.', tone: 'idle' },
			{ label: 'Contradiction', detail: 'done + User-approved: no.', tone: 'warn' },
			{ label: 'Hold', detail: 'Path stops.', tone: 'warn' }
		],
		diagram: `flowchart TB
  cap[CAP] --- staging[Staging]
  staging --- semantic[Semantic]
  semantic -->|contradiction| hold[Hold]`,
		example: `concept:status-done
constraint: requires user_approved
violation: User-approved: no`,
		docsPath: '/docs/semantic-domains/'
	},
	'pointer-map': {
		watch: [
			{ label: 'Map', detail: 'docs ↔ rule:gov-docs.', tone: 'ok' },
			{ label: 'Edit', detail: 'Protocol file relocated.', tone: 'idle' },
			{ label: 'Drift', detail: 'Pointer miss.', tone: 'warn' },
			{ label: 'Report', detail: 'pain:pointer_drift.', tone: 'warn' }
		],
		diagram: `flowchart LR
  path[Path] --> rule[Pointer rule]
  rule --> ok[Match]
  path --> miss[Drift]`,
		example: `rule: gov-docs
roots:
  - docs/
  - .ags/`,
		docsPath: '/docs/pointer-domains/'
	},
	'reflex-arcs': {
		watch: [
			{ label: 'Pain', detail: 'raw git commit.', tone: 'warn' },
			{ label: 'Arc', detail: 'pain → reflex.', tone: 'idle' },
			{ label: 'Reflex', detail: 'Hook deny + MCP redirect.', tone: 'ok' },
			{ label: 'Clear', detail: 'Legal checkpoint only.', tone: 'ok' }
		],
		diagram: `flowchart LR
  pain[Pain] --> arc[Arc]
  arc --> reflex[Reflex]
  reflex --> block[Block]`,
		example: `pain: commit:raw_git
reflex: gate.commit_msg
action: deny`,
		docsPath: '/docs/overview/'
	},
	versioning: {
		watch: [
			{ label: 'Change set', detail: 'feat + fix landed.', tone: 'idle' },
			{ label: 'Bump', detail: 'minor → 0.2.0.', tone: 'ok' },
			{ label: 'Tag', detail: 'v0.2.0.', tone: 'ok' },
			{ label: 'Notes', detail: 'Changelog section written.', tone: 'ok' }
		],
		diagram: `flowchart LR
  commits[Commits] --> bump[Bump]
  bump --> tag[Tag]
  tag --> notes[Changelog]`,
		example: `versioning:
  scheme: semver
  bumpRules:
    feat: minor
    fix: patch`,
		docsPath: '/docs/versioning/'
	},
	deployment: {
		watch: [
			{ label: 'dev', detail: 'Build green.', tone: 'ok' },
			{ label: 'bench', detail: 'Smoke pass.', tone: 'ok' },
			{ label: 'staging', detail: 'Health + inventory.', tone: 'idle' },
			{ label: 'prod', detail: 'Promote.', tone: 'ok' }
		],
		diagram: `flowchart LR
  dev --> bench --> staging --> prod`,
		example: `deployment:
  environments: [dev, bench, staging, prod]
  gates:
    prod: [health, inventory]`,
		docsPath: '/docs/deployment/'
	}
};

const FALLBACK: EngineNarrative = {
	watch: [
		{ label: 'Input', detail: 'Engine receives a signal.', tone: 'idle' },
		{ label: 'Evaluate', detail: 'Rules apply.', tone: 'idle' },
		{ label: 'Result', detail: 'Pass, hold, or remediate.', tone: 'ok' }
	],
	diagram: `flowchart LR
  in[Input] --> eng[Engine] --> out[Result]`,
	example: `# Simulated example — see docs for live config.`,
	docsPath: '/docs/'
};

export function narrativeFor(slug: string): EngineNarrative {
	return NARRATIVES[slug] ?? FALLBACK;
}
