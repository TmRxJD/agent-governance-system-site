/** Showcase narratives — usage, token savings, consistency for every engine. */

export type EngineNarrative = {
	watch: { label: string; detail: string; tone?: 'ok' | 'warn' | 'idle' }[];
	diagram: string;
	/** Concrete config / MCP payload visitors can copy. */
	example: string;
	/** How you use it in a real agent session. */
	usage: string;
	/** Why this engine burns fewer tokens (or stops waste). */
	tokenSavings: string;
	/** What consistency rule it hard-enforces. */
	consistency: string;
	docsPath: string;
	mcpTools?: string[];
};

export const NARRATIVES: Record<string, EngineNarrative> = {
	staging: {
		watch: [
			{ label: 'Incoming diff', detail: 'Agent touched auth + docs + a new util in one tree.', tone: 'idle' },
			{ label: 'Classify', detail: 'staging_classify assigns one Commit-Scope per path cluster.', tone: 'idle' },
			{ label: 'single-change', detail: 'paths.ts alone → legal checkpoint.', tone: 'ok' },
			{ label: 'Batch blocked', detail: 'Mixed scopes cannot share a SHA — stash or split.', tone: 'warn' }
		],
		diagram: `flowchart LR
  diff[Dirty tree] --> classify[staging_classify]
  classify --> scope[Commit-Scope]
  scope --> gate{One scope?}
  gate -->|yes| pass[commit_checkpoint]
  gate -->|no| block[staging_enforce deny]`,
		example: `// MCP: staging_enforce
{
  "commitScope": "function-create",
  "message": "status/checkpoint(auth): add refresh\\n\\nCommit-Scope: function-create"
}

// MCP: staging_classify
{ "includeUnstaged": true }`,
		usage:
			'Before every commit: classify → pick one Commit-Scope → stash unrelated paths → staging_enforce → commit_checkpoint. Never invent a scope to match a mixed index.',
		tokenSavings:
			'Stops mega-commits that force the next agent to re-read half the repo. Atomic SHAs mean smaller diffs, cheaper reviews, and fewer “what changed?” rediscovery loops.',
		consistency:
			'Exactly one staging category per commit. Message Commit-Scope must match staged paths — no Gate-override for mixed batches.',
		docsPath: '/docs/staging-scopes/',
		mcpTools: [
			'staging_classify',
			'staging_validate',
			'staging_diff',
			'staging_enforce',
			'staging_split',
			'staging_stash'
		]
	},
	'semantic-graph': {
		watch: [
			{ label: 'Load graph', detail: 'Concepts + constraints from the semantic domain.', tone: 'ok' },
			{ label: 'Assert', detail: 'status-done requires user_approved.', tone: 'idle' },
			{ label: 'Contradiction', detail: 'Agent claims done with User-approved: no.', tone: 'warn' },
			{ label: 'Hold', detail: 'semantic_enforce blocks the path.', tone: 'warn' }
		],
		diagram: `flowchart TB
  claim[Agent claim] --> graph[Semantic graph]
  graph --> check{Constraints OK?}
  check -->|yes| proceed[Continue]
  check -->|no| hold[Hold / remediate]`,
		example: `// MCP: semantic_enforce
{}

// Constraint shape (conceptual)
concept: status-done
requires: user_approved
violation: User-approved: no`,
		usage:
			'Call semantic_enforce before declaring a feature finished or writing status/user-approved. Wire claims (done, shipped, milestone) to the graph — not prose habit.',
		tokenSavings:
			'Kills premature “done” celebrations that trigger long user-correction threads. One failed enforce is cheaper than three rounds of “I thought it was finished.”',
		consistency:
			'Meaning is machine-checked: done ↔ user_approved, CAP states, and related concepts cannot contradict each other in commits or ledger status.',
		docsPath: '/docs/semantic-domains/',
		mcpTools: ['semantic_get', 'semantic_validate', 'semantic_enforce']
	},
	'pointer-map': {
		watch: [
			{ label: 'Map', detail: 'docs/AGENT_*.md ↔ rule:gov-docs.', tone: 'ok' },
			{ label: 'Edit', detail: 'Protocol file moved without updating pointers.', tone: 'idle' },
			{ label: 'Drift', detail: 'pointer_enforce reports miss.', tone: 'warn' },
			{ label: 'Remediate', detail: 'Restore home or update the pointer map.', tone: 'ok' }
		],
		diagram: `flowchart LR
  path[Repo path] --> rule[Pointer rule]
  rule --> ok[Home match]
  path --> miss[Drift pain]
  miss --> fix[Update map / move file]`,
		example: `# .ags / pointer domain (conceptual)
rule: gov-docs
roots:
  - docs/
  - .ags/

# MCP: pointer_enforce
{}`,
		usage:
			'After relocating docs or rules, run pointer_enforce. Treat drift as a first-class defect — fix the map or put the file back before more work.',
		tokenSavings:
			'Agents stop searching for “the contract” in five wrong folders. Pointers keep context packs short and on the right files.',
		consistency:
			'Every governed path has one declared home. Documentation and rule trees cannot silently fork.',
		docsPath: '/docs/pointer-domains/',
		mcpTools: ['pointer_get', 'pointer_validate', 'pointer_enforce', 'pointer_drift']
	},
	'reflex-arcs': {
		watch: [
			{ label: 'Pain', detail: 'Shell tries raw git commit -m …', tone: 'warn' },
			{ label: 'Arc', detail: 'Sentinel maps pain → gate.commit_msg reflex.', tone: 'idle' },
			{ label: 'Reflex', detail: 'Hook deny + redirect to commit_checkpoint.', tone: 'ok' },
			{ label: 'Clear', detail: 'Pain clears only after legal MCP commit.', tone: 'ok' }
		],
		diagram: `flowchart LR
  pain[Pain signal] --> sentinel[Sentinel]
  sentinel --> reflex[Reflex]
  reflex --> block[Deny / remediate]
  block --> clear[sentinel_clear after fix]`,
		example: `# Conceptual reflex
pain: commit:raw_git
reflex: gate.commit_msg
action: deny

# MCP
sentinel_status {}
sentinel_enforce {}
# after remediation:
sentinel_clear { "painId": "commit:raw_git" }`,
		usage:
			'Install hooks so raw git commit cannot bypass MCP. On pain: read sentinel_status, fix the cited violation, then sentinel_enforce / sentinel_clear — never clear-first.',
		tokenSavings:
			'Blocks the most expensive failure mode: ungoverned commits that force rework, doctor repair, and long “how did this land?” sessions. One deny beats a weekend of archaeology.',
		consistency:
			'Violations become reflexes with the same outcome every time — deny, redirect, or remediate — until the underlying rule is satisfied.',
		docsPath: '/docs/overview/',
		mcpTools: ['sentinel_status', 'sentinel_get', 'sentinel_enforce', 'sentinel_clear']
	},
	versioning: {
		watch: [
			{ label: 'Change set', detail: 'feat + fix land under governed scopes.', tone: 'idle' },
			{ label: 'Plan bump', detail: 'version_plan_bump maps scopes → semver.', tone: 'ok' },
			{ label: 'Tag', detail: 'v0.2.0 from declared rules.', tone: 'ok' },
			{ label: 'Notes', detail: 'Changelog section matches the bump.', tone: 'ok' }
		],
		diagram: `flowchart LR
  scopes[Commit-Scopes] --> plan[version_plan_bump]
  plan --> bump[Semver]
  bump --> tag[Tag]
  tag --> notes[Changelog]`,
		example: `# .ags/versioning.yml
scheme: semver
bumpRules:
  feat: minor
  fix: patch
  breaking: major

# MCP: version_enforce
{}`,
		usage:
			'Keep bump rules in .ags/versioning.yml. Before release: version_plan_bump → apply → version_enforce. Do not hand-edit version numbers against the graph.',
		tokenSavings:
			'Removes debate loops about “is this minor or patch?” Agents follow the map; humans review the plan once.',
		consistency:
			'Every release bump is derived from Commit-Scopes — tags and notes stay aligned with what actually shipped.',
		docsPath: '/docs/versioning/',
		mcpTools: ['version_get', 'version_plan_bump', 'version_enforce']
	},
	deployment: {
		watch: [
			{ label: 'dev', detail: 'Build + unit gates green.', tone: 'ok' },
			{ label: 'bench', detail: 'Smoke + inventory.', tone: 'ok' },
			{ label: 'staging', detail: 'Health + promotion prerequisites.', tone: 'idle' },
			{ label: 'prod', detail: 'deploy_enforce allows promote.', tone: 'ok' }
		],
		diagram: `flowchart LR
  dev --> bench --> staging --> prod
  prod --> gates[health + inventory]`,
		example: `# .ags/deployment.yml (conceptual)
environments: [dev, bench, staging, prod]
gates:
  prod: [health, inventory]

# MCP: deploy_enforce
{ "target": "staging" }`,
		usage:
			'Declare the env ladder and required checks. Agents call deploy_enforce for the next environment — never skip straight to prod.',
		tokenSavings:
			'Prevents “deployed broken to prod → all-hands debug” token burn. Failures stay cheap on earlier envs.',
		consistency:
			'Environment order and gates are policy, not tribal knowledge. Same ladder for every agent session.',
		docsPath: '/docs/deployment/',
		mcpTools: ['deploy_get', 'deploy_validate', 'deploy_enforce']
	},
	canonicalization: {
		watch: [
			{ label: 'Declare', detail: 'One SoT per concept in .ags/canonical.yml.', tone: 'ok' },
			{ label: 'Scan', detail: 'canon_drift finds a mirror copy.', tone: 'warn' },
			{ label: 'Plan', detail: 'canon_plan_fix routes callers to the home.', tone: 'idle' },
			{ label: 'Enforce', detail: 'Mirror deleted or rewired.', tone: 'ok' }
		],
		diagram: `flowchart LR
  concept[Concept] --> sot[Canonical home]
  concept --> mirror[Mirror]
  mirror --> drift[canon_drift]
  drift --> fix[canon_plan_fix]`,
		example: `# .ags/canonical.yml
concepts:
  run-persistence:
    home: src/rxdb/run-persistence.ts
    forbid:
      - src/legacy/runs-store.ts

# MCP: canon_enforce
{}`,
		usage:
			'When two modules “both own” a concern, declare the home, run canon_drift, apply canon_plan_fix, then canon_enforce before more edits.',
		tokenSavings:
			'Ends dual-implementation thrash — agents stop patching the wrong copy and re-deriving which one is live.',
		consistency:
			'One canonical module per concept. Mirrors are drift, not options.',
		docsPath: '/docs/canonical/',
		mcpTools: ['canon_get', 'canon_validate', 'canon_enforce', 'canon_drift', 'canon_plan_fix']
	},
	'data-arrays': {
		watch: [
			{ label: 'Load', detail: 'Governed array config + live values.', tone: 'idle' },
			{ label: 'Normalize', detail: 'Order, dedupe, schema shape.', tone: 'ok' },
			{ label: 'Drift', detail: 'Duplicate IDs / unstable order detected.', tone: 'warn' },
			{ label: 'Enforce', detail: 'array_enforce requires the normalized form.', tone: 'ok' }
		],
		diagram: `flowchart LR
  raw[Raw array] --> norm[array_plan_normalize]
  norm --> enforce[array_enforce]
  enforce --> stable[Stable ordered set]`,
		example: `# MCP: array_plan_normalize
{ "arrayId": "engine-slugs" }

# MCP: array_enforce
{}`,
		usage:
			'Register ordered lists (slugs, scopes, envs) as governed arrays. Normalize before commit; never hand-sort differently per session.',
		tokenSavings:
			'Stops flaky diffs from reorder-only noise and duplicate entries that confuse agents into re-processing the same item.',
		consistency:
			'Deduped, ordered, schema-valid arrays across tools and commits.',
		docsPath: '/docs/data-array/',
		mcpTools: ['array_get', 'array_validate', 'array_enforce', 'array_plan_normalize']
	},
	dependency: {
		watch: [
			{ label: 'Graph', detail: 'Package / module edges loaded.', tone: 'idle' },
			{ label: 'Cycles', detail: 'A → B → A flagged.', tone: 'warn' },
			{ label: 'Compat', detail: 'Version range conflict surfaced.', tone: 'warn' },
			{ label: 'Plan', detail: 'dependency_plan_fix breaks the cycle.', tone: 'ok' }
		],
		diagram: `flowchart TB
  A --> B
  B --> C
  C -.->|cycle?| A
  check[dependency_enforce] --> hold[Hold on cycle]`,
		example: `# MCP: dependency_enforce
{}

# MCP: dependency_plan_fix
{ "focus": "packages/sdk" }`,
		usage:
			'Before adding cross-package imports, dependency_enforce. On fail, take the plan — do not paper over cycles with dynamic imports as a permanent habit without recording them.',
		tokenSavings:
			'Cycle hunts and mysterious init-order bugs are legendary token sinks. Catch them at enforce time.',
		consistency:
			'Acyclic (or explicitly allowed) dependency graphs with compatible ranges.',
		docsPath: '/docs/architecture/',
		mcpTools: ['dependency_get', 'dependency_validate', 'dependency_enforce', 'dependency_plan_fix']
	},
	policy: {
		watch: [
			{ label: 'Registry', detail: 'policy_get loads .ags/policy.yml.', tone: 'ok' },
			{ label: 'Bind', detail: 'Engine X requires files Y.', tone: 'idle' },
			{ label: 'Gap', detail: 'Enabled engine missing requiredFiles.', tone: 'warn' },
			{ label: 'Enforce', detail: 'policy_enforce blocks until remediated.', tone: 'ok' }
		],
		diagram: `flowchart LR
  yml[.ags/policy.yml] --> get[policy_get]
  get --> plan[policy_plan]
  plan --> enforce[policy_enforce]`,
		example: `# .ags/policy.yml (conceptual)
engines:
  staging:
    requiredFiles: [.ags/staging.yml]
  sentinel:
    requiredFiles: [.ags/sentinel.yml]

# MCP: policy_enforce
{}`,
		usage:
			'Keep the policy registry as the TOC of what must exist. After enabling an engine, policy_plan → add files → policy_enforce.',
		tokenSavings:
			'Agents do not rediscover missing config through trial-and-error tool failures across a long session.',
		consistency:
			'Enabled engines always have their declared config files present and valid.',
		docsPath: '/docs/configuration/',
		mcpTools: ['policy_get', 'policy_validate', 'policy_enforce', 'policy_plan']
	},
	release: {
		watch: [
			{ label: 'Artifacts', detail: 'release_get lists required outputs.', tone: 'idle' },
			{ label: 'Validate', detail: 'Tags + notes + artifact set.', tone: 'ok' },
			{ label: 'Gap', detail: 'Missing checksum or notes section.', tone: 'warn' },
			{ label: 'Enforce', detail: 'release_enforce passes for ship.', tone: 'ok' }
		],
		diagram: `flowchart LR
  plan[release_plan] --> arts[Artifacts]
  arts --> notes[Notes]
  notes --> tag[Tag]
  tag --> enforce[release_enforce]`,
		example: `# .ags/release.yml
artifacts:
  - dist/**
  - CHANGELOG.md
notesRequired: true

# MCP: release_enforce
{}`,
		usage:
			'Before tagging: release_plan → produce artifacts/notes → release_enforce. Pair with versioning and artifact engines.',
		tokenSavings:
			'Avoids half-shipped releases that bounce between “forgot changelog” and “wrong tag” repair sessions.',
		consistency:
			'Every release matches the declared artifact + notes + tag contract.',
		docsPath: '/docs/architecture/',
		mcpTools: ['release_get', 'release_validate', 'release_enforce', 'release_plan']
	},
	promotion: {
		watch: [
			{ label: 'Candidate', detail: 'Build ready on staging.', tone: 'idle' },
			{ label: 'Checks', detail: 'promote_plan lists health + inventory.', tone: 'ok' },
			{ label: 'Fail', detail: 'Health red — promote_enforce holds.', tone: 'warn' },
			{ label: 'Pass', detail: 'Promote to next env only when green.', tone: 'ok' }
		],
		diagram: `flowchart LR
  build[Build] --> plan[promote_plan]
  plan --> checks{Gates}
  checks -->|fail| hold[Hold]
  checks -->|pass| next[Next env]`,
		example: `# MCP: promote_plan
{ "from": "staging", "to": "prod" }

# MCP: promote_enforce
{ "from": "staging", "to": "prod" }`,
		usage:
			'Never promote on vibe. promote_plan first, satisfy checks, then promote_enforce. Couple with health and deployment.',
		tokenSavings:
			'Bad promotions create the largest incident threads. A held promote is cheaper than a rollback war room.',
		consistency:
			'Same promotion gates for every agent — environments advance only with evidence.',
		docsPath: '/docs/deployment/',
		mcpTools: ['promote_get', 'promote_plan', 'promote_enforce']
	},
	health: {
		watch: [
			{ label: 'Define', detail: 'Endpoints + expected status in policy.', tone: 'ok' },
			{ label: 'Probe', detail: 'health_check hits /healthz.', tone: 'idle' },
			{ label: 'Red', detail: 'Latency / status fail.', tone: 'warn' },
			{ label: 'Gate', detail: 'health_enforce blocks promote.', tone: 'ok' }
		],
		diagram: `flowchart LR
  cfg[Health checks] --> run[health_check]
  run --> ok{Pass?}
  ok -->|no| block[Block promote]
  ok -->|yes| go[Allow]`,
		example: `# .ags/health.yml
checks:
  - id: api
    url: https://example.test/healthz
    expectStatus: 200

# MCP: health_enforce
{}`,
		usage:
			'Run health_check before promote_enforce. Treat failures as promotion blockers, not warnings to ignore.',
		tokenSavings:
			'Detects dead services before agents spend tokens debugging “why is prod empty?”',
		consistency:
			'Promotion and deploy paths share one health contract.',
		docsPath: '/docs/architecture/',
		mcpTools: ['health_get', 'health_check', 'health_enforce']
	},
	observability: {
		watch: [
			{ label: 'Contract', detail: 'Logs + metrics required for service X.', tone: 'ok' },
			{ label: 'Scan', detail: 'observe_get finds missing instrumentation.', tone: 'warn' },
			{ label: 'Plan', detail: 'observe_plan lists remediation.', tone: 'idle' },
			{ label: 'Enforce', detail: 'Ship blocked until telemetry exists.', tone: 'ok' }
		],
		diagram: `flowchart LR
  svc[Service] --> contract[Observe policy]
  contract --> evidence[Logs / metrics]
  evidence --> enforce[observe_enforce]`,
		example: `# MCP: observe_enforce
{}

# MCP: observe_plan
{ "serviceId": "ags-commerce" }`,
		usage:
			'When adding a service path, observe_plan early. Attach evidence before release_enforce on paths that require it.',
		tokenSavings:
			'Blind debugging without logs is pure token waste. Requiring telemetry up front shortens incidents.',
		consistency:
			'Governed services carry the same log/metric obligations.',
		docsPath: '/docs/configuration/',
		mcpTools: ['observe_get', 'observe_validate', 'observe_enforce', 'observe_plan']
	},
	rollback: {
		watch: [
			{ label: 'Trigger', detail: 'Health red after promote.', tone: 'warn' },
			{ label: 'Plan', detail: 'rollback_plan picks prior good version.', tone: 'idle' },
			{ label: 'Track', detail: 'Version graph records the move.', tone: 'ok' },
			{ label: 'Enforce', detail: 'rollback_enforce completes safely.', tone: 'ok' }
		],
		diagram: `flowchart LR
  fail[Health fail] --> plan[rollback_plan]
  plan --> prior[Prior version]
  prior --> enforce[rollback_enforce]`,
		example: `# MCP: rollback_plan
{ "env": "prod" }

# MCP: rollback_enforce
{ "env": "prod", "toVersion": "1.4.2" }`,
		usage:
			'On failed health/promote: rollback_plan → execute → rollback_enforce. Do not improvise git reverts outside the engine when policy owns rollback.',
		tokenSavings:
			'Structured rollbacks beat chaotic “which commit was good?” archaeology under pressure.',
		consistency:
			'Rollback targets and evidence are version-tracked the same way every time.',
		docsPath: '/docs/deployment/',
		mcpTools: ['rollback_get', 'rollback_plan', 'rollback_enforce']
	},
	efficiency: {
		watch: [
			{ label: 'Track', detail: 'Operation tokens land in the session ledger.', tone: 'idle' },
			{ label: 'Predict', detail: 'Pre-flight waste estimate before the next tool burst.', tone: 'idle' },
			{ label: 'Loop', detail: 'Repeated fix pattern crosses the threshold.', tone: 'warn' },
			{ label: 'Block', detail: 'efficiency_enforce holds the wasteful path.', tone: 'ok' }
		],
		diagram: `flowchart LR
  op[Operation] --> track[Track tokens]
  track --> predict[Predict waste]
  predict --> loop{Loop?}
  loop -->|yes| hold[Hold]
  loop -->|no| budget[Budget OK]`,
		example: `# MCP: efficiency_enforce
{
  "commitScope": "efficiency",
  "profile": "personal",
  "loopPrevention": true
}`,
		usage:
			'Keep efficiency_enforce in the pre-commit path. When held for loops: change strategy (read authority, shrink scope) — do not retry the same failing edit.',
		tokenSavings:
			'Directly budgets operations, predicts waste, and stops fix-loops — the primary token-burn failure mode in agent coding.',
		consistency:
			'Profiles (free / personal / enterprise) apply the same loop and budget rules across sessions.',
		docsPath: '/docs/architecture/',
		mcpTools: ['efficiency_track', 'efficiency_predict', 'efficiency_enforce']
	},
	impact: {
		watch: [
			{ label: 'Snapshot', detail: 'Growth map: deps, builders, semantic, guards.', tone: 'ok' },
			{ label: 'Curves', detail: 'Plateau read as maturity — not failure.', tone: 'idle' },
			{ label: 'Stress', detail: 'Adversarial plants prove learning is real.', tone: 'warn' },
			{ label: 'Score', detail: 'ImpactScore + no-op flags for the report.', tone: 'ok' }
		],
		diagram: `flowchart LR
  snap[GrowthSnapshot] --> curves[CurveAware]
  curves -->|plateau| maturity[Maturity]
  curves -->|decline| regression[Regression]
  stress[Adversarial] --> score[ImpactScore]`,
		example: `# MCP: impact_reports
{
  "commitScope": "impact"
}
# verdict example: optimal_plateau (not failure)`,
		usage:
			'Run impact snapshots around milestones. Use stress reports to verify the agent learned — not just that tests stayed green.',
		tokenSavings:
			'Detects no-op thrash and regressions early so you stop paying for sessions that look busy but teach nothing.',
		consistency:
			'Growth is measured with the same curves and adversarial checks — “smarter” is evidence, not marketing.',
		docsPath: '/docs/architecture/',
		mcpTools: ['impact_snapshot', 'impact_score', 'impact_stress', 'impact_reports']
	},
	optimization: {
		watch: [
			{ label: 'Budgets', detail: 'MCP tokens/hr + latency budgets loaded.', tone: 'ok' },
			{ label: 'Measure', detail: 'Current burn vs limits.', tone: 'idle' },
			{ label: 'Over', detail: 'optimize_enforce holds costly tool spam.', tone: 'warn' },
			{ label: 'Plan', detail: 'Shrink context / batch MCP calls.', tone: 'ok' }
		],
		diagram: `flowchart LR
  use[MCP / CPU use] --> budget[Budgets]
  budget --> gate{Within?}
  gate -->|no| hold[optimize_enforce]
  gate -->|yes| proceed[Proceed]`,
		example: `# MCP: optimize_enforce
{}

# MCP: optimize_plan
{ "focus": "mcp-cost" }`,
		usage:
			'Pair with Efficiency. When MCP cost spikes, optimize_plan before continuing a tool-heavy exploration.',
		tokenSavings:
			'Caps MCP/cost burn and forces cheaper strategies when budgets trip — complementary to loop prevention.',
		consistency:
			'Same performance/cost budgets applied to every governed host.',
		docsPath: '/docs/architecture/',
		mcpTools: ['optimize_get', 'optimize_validate', 'optimize_enforce', 'optimize_plan']
	},
	artifact: {
		watch: [
			{ label: 'Layout', detail: 'Declared artifact tree from policy.', tone: 'ok' },
			{ label: 'Scan', detail: 'Missing signature / wrong path.', tone: 'warn' },
			{ label: 'Plan', detail: 'artifact_plan lists fixes.', tone: 'idle' },
			{ label: 'Enforce', detail: 'Structure valid for release.', tone: 'ok' }
		],
		diagram: `flowchart LR
  build[Build] --> tree[Artifact tree]
  tree --> check[artifact_enforce]
  check --> release[release_enforce]`,
		example: `# .ags/artifact.yml
required:
  - dist/index.js
  - signatures/sha256.txt

# MCP: artifact_enforce
{}`,
		usage:
			'After packaging, artifact_enforce before release_enforce. Treat missing checksums as release blockers.',
		tokenSavings:
			'Catches broken packages before publish/debug cycles with customers or downstream agents.',
		consistency:
			'Every release artifact set matches the declared layout and integrity hooks.',
		docsPath: '/docs/configuration/',
		mcpTools: ['artifact_get', 'artifact_validate', 'artifact_enforce', 'artifact_plan']
	},
	registry: {
		watch: [
			{ label: 'Pack', detail: 'Tarball produced for @scope/pkg.', tone: 'idle' },
			{ label: 'Auth', detail: 'Registry token present.', tone: 'ok' },
			{ label: 'Publish', detail: 'Upload + index.', tone: 'ok' },
			{ label: 'Enforce', detail: 'registry_enforce verifies publish contract.', tone: 'ok' }
		],
		diagram: `flowchart LR
  pack[Pack] --> auth[Auth]
  auth --> upload[Upload]
  upload --> index[Registry index]
  index --> enforce[registry_enforce]`,
		example: `# MCP: registry_enforce
{}

# Publish flow (conceptual)
npm pack → auth → publish → registry_enforce`,
		usage:
			'Use the private registry path for AGS packages. registry_enforce after publish; never share org tokens outside the host.',
		tokenSavings:
			'Prevents “works on my machine / wrong tarball” install loops that burn sessions on auth and version mismatch.',
		consistency:
			'Publish auth, packing, and indexing follow one governed path.',
		docsPath: '/docs/install-commercial/',
		mcpTools: ['registry_get', 'registry_validate', 'registry_enforce']
	},
	integrity: {
		watch: [
			{ label: 'Hash', detail: 'Checksums for artifacts / critical files.', tone: 'ok' },
			{ label: 'Compare', detail: 'Live hash vs expected.', tone: 'idle' },
			{ label: 'Tamper', detail: 'Mismatch → integrity pain.', tone: 'warn' },
			{ label: 'Hold', detail: 'integrity_enforce blocks ship.', tone: 'ok' }
		],
		diagram: `flowchart LR
  file[Artifact] --> hash[Checksum]
  hash --> match{Match?}
  match -->|no| hold[Hold]
  match -->|yes| pass[Pass]`,
		example: `# MCP: integrity_enforce
{}

# Expected
sha256: <digest>  path: dist/index.js`,
		usage:
			'Run integrity_enforce on release artifacts and sensitive configs. Investigate mismatches — do not regenerate expected hashes to “make it pass.”',
		tokenSavings:
			'Stops silent corruption and “why does prod disagree?” hunts after bad publishes.',
		consistency:
			'Tamper detection is mandatory on declared integrity targets.',
		docsPath: '/docs/architecture/',
		mcpTools: ['integrity_get', 'integrity_validate', 'integrity_enforce']
	},
	identity: {
		watch: [
			{ label: 'Graph', detail: 'Agents, users, envs, tokens linked.', tone: 'ok' },
			{ label: 'Select', detail: 'mcp-token node highlighted.', tone: 'idle' },
			{ label: 'Risk', detail: 'Orphan token / wrong env edge.', tone: 'warn' },
			{ label: 'Enforce', detail: 'identity_enforce requires clean graph.', tone: 'ok' }
		],
		diagram: `flowchart TB
  agent --> token
  token --> env
  user --> agent`,
		example: `# MCP: identity_enforce
{}

# Conceptual edge
agent:cursor-local → token:mcp → env:staging`,
		usage:
			'Map who/what can act where. Before widening MCP access, identity_enforce so tokens are not ambient and unbound.',
		tokenSavings:
			'Reduces credential confusion and wrong-environment mutations that create expensive cleanup.',
		consistency:
			'Actors, tokens, and environments stay in one identity graph with explicit edges.',
		docsPath: '/docs/architecture/',
		mcpTools: ['identity_get', 'identity_validate', 'identity_enforce']
	},
	access: {
		watch: [
			{ label: 'Matrix', detail: 'Role × resource permissions loaded.', tone: 'ok' },
			{ label: 'Request', detail: 'Agent asks for prod write.', tone: 'idle' },
			{ label: 'Deny', detail: 'access_enforce: role lacks grant.', tone: 'warn' },
			{ label: 'Allow', detail: 'Staging write permitted.', tone: 'ok' }
		],
		diagram: `flowchart LR
  role[Role] --> matrix[Permission matrix]
  matrix --> gate{Allowed?}
  gate -->|no| deny[Deny]
  gate -->|yes| allow[Allow]`,
		example: `# MCP: access_enforce
{
  "role": "agent-dev",
  "action": "deploy:prod"
}
# → deny unless explicitly granted`,
		usage:
			'Keep the permission matrix in policy. Agents call access_enforce for sensitive actions instead of assuming host credentials imply prod rights.',
		tokenSavings:
			'Blocks unauthorized prod touches that create incident response token storms.',
		consistency:
			'Same role/resource matrix for every agent and environment.',
		docsPath: '/docs/architecture/',
		mcpTools: ['access_get', 'access_validate', 'access_enforce']
	},
	security: {
		watch: [
			{ label: 'Scan', detail: 'Diff scanned for secrets / unsafe patterns.', tone: 'idle' },
			{ label: 'Hit', detail: 'API key-shaped string in source.', tone: 'warn' },
			{ label: 'Hold', detail: 'security_enforce blocks commit.', tone: 'ok' },
			{ label: 'Remediate', detail: 'Move to secret store; rotate if needed.', tone: 'ok' }
		],
		diagram: `flowchart LR
  diff[Diff] --> scan[Secret scan]
  scan --> hit{Secret?}
  hit -->|yes| hold[Hold + rotate cue]
  hit -->|no| pass[Pass]`,
		example: `# MCP: security_enforce
{}

# On hit: remove secret from tree, rotate provider key,
# then re-run security_enforce before commit_checkpoint.`,
		usage:
			'Always security_enforce before commit on paths that may hold credentials. Couple with hooks so raw commits cannot skip the scan.',
		tokenSavings:
			'One prevented leak avoids rotation drills, customer trust fires, and multi-agent cleanup.',
		consistency:
			'Secret scanning and secure-deploy cues apply uniformly — no “just this once” exceptions in the enforce path.',
		docsPath: '/docs/architecture/',
		mcpTools: ['security_get', 'security_scan', 'security_enforce']
	}
};

export function narrativeFor(slug: string): EngineNarrative {
	const n = NARRATIVES[slug];
	if (!n) {
		throw new Error(
			`Missing showcase narrative for engine "${slug}". Every ENGINES slug must have a full narrative.`
		);
	}
	return n;
}
