import type { Tutorial } from './types';

export const tutorials: Tutorial[] = [
	{
		slug: "install-sdk",
		title: "Install the AGS SDK",
		summary: "Add @tmrxjd/agent-governance-system, configure GitHub Packages auth, and verify subpath imports.",
		trackId: "setup",
		prerequisites: [],
		goals: ["Install from the @tmrxjd registry","Configure .npmrc with AGS_NPM_TOKEN","Smoke-test commit-msg and product-licensing imports"],
		imports: ["@tmrxjd/agent-governance-system","@tmrxjd/agent-governance-system/commit-msg","@tmrxjd/agent-governance-system/product-licensing"],
		cli: ["pnpm add @tmrxjd/agent-governance-system"],
		config: [".npmrc","AGS_NPM_TOKEN","AGS_LICENSE_KEY"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"AGS is the `@tmrxjd/agent-governance-system` package: CAP, staging, enforcement, confidence, structure graphs, delivery engines, intelligence, and MCP tool factories. Install the package first; unlock Personal/Enterprise features with `AGS_LICENSE_KEY` via `product-licensing`.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: .npmrc, AGS_NPM_TOKEN, AGS_LICENSE_KEY.",
				]
				,
				code: {
					title: ".npmrc",
					lang: "ini",
					code: `@tmrxjd:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${AGS_NPM_TOKEN}`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Import from: @tmrxjd/agent-governance-system, @tmrxjd/agent-governance-system/commit-msg, @tmrxjd/agent-governance-system/product-licensing.",
				]
				,
				code: {
					title: "smoke.mjs",
					lang: "javascript",
					code: `import { validateAgentCommitMessage } from '@tmrxjd/agent-governance-system/commit-msg'
import { entitlementsForTier } from '@tmrxjd/agent-governance-system/product-licensing'

console.log(validateAgentCommitMessage('x').ok)
console.log(entitlementsForTier('free').features.agent_core)`
				}
				,
				steps: ["Export AGS_NPM_TOKEN","pnpm add @tmrxjd/agent-governance-system","Optional: export AGS_LICENSE_KEY","Run smoke import"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Package resolves under node_modules/@tmrxjd/agent-governance-system",
					"Subpath imports type-check",
					"validateAgentCommitMessage returns a structured { ok, errors } object",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"401 from npm.pkg.github.com → fix AGS_NPM_TOKEN scopes (read:packages)",
					"ERR_PACKAGE_PATH_NOT_EXPORTED → use documented exports only",
					"Node < 20 → upgrade runtime",
				]
			},
		],
		relatedDocs: [{"href":"/docs/install-commercial/","label":"Install"},{"href":"/docs/licensing/","label":"Licensing"},{"href":"/pricing/","label":"Pricing"},{"href":"/checkout/","label":"Checkout"}]
	},
	{
		slug: "plugin-host",
		title: "Mount PluginHost and merge MCP tools",
		summary: "Create PluginHost, merge create*Tools factories, and expose governance MCP tools to the IDE.",
		trackId: "setup",
		prerequisites: ["install-sdk"],
		goals: ["Bootstrap createPluginHost","Merge MCP factories with merge-host-tools","Connect .mcp.json to the host"],
		imports: ["@tmrxjd/agent-governance-system/plugin","@tmrxjd/agent-governance-system/mcp/merge-host-tools.mjs"],
		mcpTools: ["governance_toc","commit_authorize","staging_enforce","enforcement_begin"],
		config: [".mcp.json","GOVERNANCE_REPO_ROOT","AGS_LICENSE_KEY"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"`createPluginHost` registers graphs, probes, DiffRules, and MCP tool names. Runtime `run` handlers come from `src/mcp/*-tools.mjs` and are merged via `buildGovernanceMcpModules` / merge-host-tools. Inject `monorepoRoot`, `runRepoTsx`, and `parseCliJson` so tools can invoke mechanics-trust CLIs.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: .mcp.json, GOVERNANCE_REPO_ROOT, AGS_LICENSE_KEY.",
				]
				,
				code: {
					title: ".mcp.json",
					lang: "json",
					code: `{
  "mcpServers": {
    "ags-gov": {
      "command": "node",
      "args": ["./scripts/ags-mcp-host.mjs"],
      "env": {
        "AGS_LICENSE_KEY": "\${AGS_LICENSE_KEY}",
        "GOVERNANCE_REPO_ROOT": "\${workspaceFolder}"
      }
    }
  }
}`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: governance_toc, commit_authorize, staging_enforce, enforcement_begin.",
				]
				,
				code: {
					title: "host bootstrap",
					lang: "typescript",
					code: `import { createPluginHost } from '@tmrxjd/agent-governance-system/plugin'
import { buildGovernanceMcpModules } from '@tmrxjd/agent-governance-system/mcp/merge-host-tools.mjs'

const host = createPluginHost({ repoRoot: process.env.GOVERNANCE_REPO_ROOT! })
const modules = buildGovernanceMcpModules({
  monorepoRoot: process.env.GOVERNANCE_REPO_ROOT!,
  runRepoTsx,
  parseCliJson,
  host,
})`
				}
				,
				steps: ["Implement host entry script","Add .mcp.json","Reload MCP servers","Call governance_toc"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"IDE shows ags-gov / tower-gov Connected",
					"governance_toc lists commit_checkpoint and staging_enforce",
					"commit_authorize {} returns CAP state",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Tool names without run → factory not merged",
					"CLI not found → monorepoRoot wrong",
					"Empty catalog → plugins never loaded",
				]
			},
		],
		relatedDocs: [{"href":"/docs/configuration/","label":"Configuration"},{"href":"/docs/api/","label":"API surface"},{"href":"/docs/engine-registry/","label":"Engine registry"}]
	},
	{
		slug: "install-hooks",
		title: "Install git and IDE enforcement hooks",
		summary: "Wire commit-msg validation and beforeShellExecution denials so raw git commit cannot bypass MCP.",
		trackId: "setup",
		prerequisites: ["install-sdk"],
		goals: ["Install commit-msg hook","Sync Cursor hooks denying raw git commit","Prove illegal messages fail"],
		imports: ["@tmrxjd/agent-governance-system/commit-msg"],
		mcpTools: ["commit_validate","sentinel_status"],
		cli: ["git config core.hooksPath .githooks"],
		config: [".githooks/commit-msg",".cursor/hooks.json"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Hooks close the gap between MCP policy and shell reality. `validateAgentCommitMessage` rejects schema-illegal messages; IDE hooks deny `git commit` unless issued through `commit_checkpoint` (TOWER_MCP_COMMIT=1).",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: .githooks/commit-msg, .cursor/hooks.json.",
				]
				,
				code: {
					title: ".githooks/commit-msg",
					lang: "javascript",
					code: `#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { validateAgentCommitMessage } from '@tmrxjd/agent-governance-system/commit-msg'
const msg = readFileSync(process.argv[2], 'utf8')
const result = validateAgentCommitMessage(msg)
if (!result.ok) {
  console.error(result.errors.join('\\n'))
  process.exit(1)
}`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: commit_validate, sentinel_status.",
				]
				,
				code: {
					title: "MCP: commit_validate",
					lang: "json",
					code: `{ "message": "status/checkpoint(demo): add helper\\n\\nStatus: checkpoint\\n…" }`
				}
				,
				steps: ["Write commit-msg hook","git config core.hooksPath .githooks","Sync .cursor/hooks.json","Reload IDE window"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"One-line commit messages are rejected by the hook",
					"Raw agent git commit is denied by beforeShellExecution",
					"commit_checkpoint still works when CAP and attestations pass",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"core.hooksPath unset",
					"Agent uses --no-verify",
					"Stale hooks.json after package upgrade",
				]
			},
		],
		relatedDocs: [{"href":"/docs/configuration/","label":"Configuration"},{"href":"/docs/api/","label":"API surface"}]
	},
	{
		slug: "governance-toc",
		title: "Explore the governance TOC",
		summary: "Call governance_toc to inventory graphs, probes, DiffRules, scopes, and MCP tool names.",
		trackId: "setup",
		prerequisites: ["plugin-host"],
		goals: ["Invoke governance_toc","Map tools to engines","Detect missing factories"],
		imports: ["@tmrxjd/agent-governance-system/mcp/toc-tools.mjs"],
		mcpTools: ["governance_toc"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"`governance_toc` is the session inventory. Use it before enabling CAP and whenever an engine tool seems missing — especially after license or plugin changes.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: governance_toc.",
				]
				,
				code: {
					title: "MCP: governance_toc",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["Call governance_toc","Search for commit_checkpoint","Note efficiency_* / impact_* vs tier","Save dump under temp/ for the session"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Response includes MCP tool names",
					"commit_*, staging_*, *_enforce families present for your tier",
					"Graphs/probes sections non-empty when plugins loaded",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Empty tools → merge-host-tools not applied",
					"CLI parse errors → wrong monorepoRoot",
					"Entitlement-gated tools absent on free tier",
				]
			},
		],
		relatedDocs: [{"href":"/docs/api/","label":"API surface"},{"href":"/docs/engine-registry/","label":"Engine registry"}]
	},
	{
		slug: "cap",
		title: "Commit Authorization Protocol (CAP)",
		summary: "Read/set CAP with commit_authorize: off, on, or close-only.",
		trackId: "commit",
		prerequisites: ["install-sdk","plugin-host"],
		goals: ["Read CAP","Enable on","Disable with CAP-OFF confirm"],
		imports: ["@tmrxjd/agent-governance-system/commit-cap"],
		mcpTools: ["commit_authorize","commit_get"],
		cli: ["pnpm commit-cap -- get","pnpm commit-cap -- set on"],
		config: ["temp/commit-cap/state.json"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"CAP gates whether agents may create commits. Default `off`. `on` requires micro-commits per staging category. `close-only` is for milestone `awaiting-user` then `user-approved` via `commit_close`.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: temp/commit-cap/state.json.",
				]
				,
				code: {
					title: "temp/commit-cap/state.json",
					lang: "json",
					code: `{ "state": "on", "note": "feature work session" }`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: commit_authorize, commit_get.",
				]
				,
				code: {
					title: "MCP: commit_authorize",
					lang: "json",
					code: `{ "state": "on", "note": "feature work session" }`
				}
				,
				steps: ["commit_authorize {}","User enables commit mode → state on","Work + micro-commits","End session → confirm CAP-OFF"]
			},
			{
				heading: "Disable safely",
				paragraphs: [
					"Setting CAP off via MCP requires an explicit confirm string to prevent accidental disable mid-session.",
				]
				,
				code: {
					title: "Disable",
					lang: "json",
					code: `{ "state": "off", "confirm": "CAP-OFF", "note": "session complete" }`
				}
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"commit_get reflects new state",
					"commit_checkpoint allowed when on",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"checkpoint while off",
					"state off without confirm: CAP-OFF",
					"close-only used for ordinary checkpoints",
				]
			},
		],
		relatedDocs: [{"href":"/docs/overview/","label":"Overview"},{"href":"/docs/staging-scopes/","label":"Staging scopes"}]
	},
	{
		slug: "commit-msg",
		title: "Agent commit message schema",
		summary: "Author status/<status>(<scope>) messages with required trailers; validate via commit-msg.",
		trackId: "commit",
		prerequisites: ["install-sdk"],
		goals: ["Write a legal checkpoint","Validate with API/MCP","Fix trailer errors"],
		imports: ["@tmrxjd/agent-governance-system/commit-msg"],
		mcpTools: ["commit_validate"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Messages start with `status/<status>(<scope>): <imperative>`. Trailers must include Status, Scope, Commit-Scope, Not-done, Next, Evidence, Token, Graph-ids, User-approved. Prefer `Enforcement: mcp`. Never claim finished unless `user-approved`.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Apply the following configuration in your repo.",
				]
				,
				code: {
					title: "Legal checkpoint message",
					lang: "text",
					code: `status/checkpoint(auth-middleware): add session refresh helper

Status: checkpoint
Scope: auth-middleware
Commit-Scope: function-create
Not-done: wire helper into request pipeline
Next: module-wire for refresh on 401
Evidence: vitest packages/auth/src/session.test.ts
Token: mid
Graph-ids: none (infra)
User-approved: no
Enforcement: mcp`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: commit_validate.",
				]
				,
				code: {
					title: "validateAgentCommitMessage",
					lang: "typescript",
					code: `import { validateAgentCommitMessage } from '@tmrxjd/agent-governance-system/commit-msg'
const result = validateAgentCommitMessage(message)
if (!result.ok) process.exit(1)`
				}
				,
				steps: ["Draft trailers first","commit_validate","Fix errors","Pass to commit_checkpoint"]
			},
			{
				heading: "Milestone checks",
				paragraphs: [
					"`awaiting-user` requires `Commit-Scope: milestone-close` and `Milestone-checks: unit=pass; integration=pass; regression=pass; ui=pass|n/a; governance=pass; docs=pass; confidence=pass`.",
				]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"commit_validate ok:true",
					"Hook accepts the message",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Missing Commit-Scope / User-approved",
					"Multiple categories batched",
					"user-approved status outside close-only",
					"Subject says done while User-approved: no",
				]
			},
		],
		relatedDocs: [{"href":"/docs/api/","label":"API surface"},{"href":"/docs/staging-scopes/","label":"Staging scopes"}]
	},
	{
		slug: "commit-checkpoint",
		title: "Atomic commits with commit_checkpoint",
		summary: "Create CAP-gated checkpoints through MCP with dryRun, files list, and commit_close for milestones.",
		trackId: "commit",
		prerequisites: ["cap","commit-msg","staging","enforcement"],
		goals: ["Dry-run checkpoint","Write SHA","Use commit_close only after approval"],
		mcpTools: ["commit_checkpoint","commit_close","commit_validate","enforcement_check"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Prefer `commit_checkpoint` over raw git. Pipeline: enforcement_begin → staging_enforce → confidence_enforce → commit_checkpoint. `dryRun` defaults true.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: commit_checkpoint, commit_close, commit_validate, enforcement_check.",
				]
				,
				code: {
					title: "MCP: commit_checkpoint",
					lang: "json",
					code: `{
  "message": "status/checkpoint(staging): classify auth diff\\n\\n…trailers…",
  "files": ["src/auth/session.ts", "src/auth/session.test.ts"],
  "dryRun": false
}`
				}
				,
				steps: ["commit_validate","enforcement_check","dryRun true","dryRun false"]
			},
			{
				heading: "commit_close",
				paragraphs: [
					"Under CAP close-only, after explicit user approval, call commit_close with User-approved: yes and Approved-by: user. Never for ordinary checkpoints.",
				]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Returns new commit SHA",
					"Message survives commit-msg hook",
					"Enforcement trailer present",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"CAP off",
					"enforcement_check not ok",
					"files span multiple Commit-Scopes",
				]
			},
		],
		relatedDocs: [{"href":"/docs/api/","label":"API surface"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "staging",
		title: "Staging Engine — one Commit-Scope per commit",
		summary: "Classify diffs, enforce one staging category, split/stash mixed indexes.",
		trackId: "commit",
		prerequisites: ["plugin-host"],
		goals: ["Classify","Enforce one scope","Split mixed indexes"],
		mcpTools: ["staging_classify","staging_validate","staging_diff","staging_enforce","staging_split","staging_stash"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Staging turns a dirty tree into atomic Commit-Scope units (`function-create`, `single-change`, `module-wire`, `milestone-close`, …). One scope per SHA — no Gate-override for mixed batches.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: staging_classify, staging_validate, staging_diff, staging_enforce, staging_split, staging_stash.",
				]
				,
				code: {
					title: "MCP: staging_enforce",
					lang: "json",
					code: `{
  "commitScope": "function-create",
  "message": "status/checkpoint(auth): add refresh\\n\\nCommit-Scope: function-create\\n…"
}`
				}
				,
				steps: ["staging_classify { includeUnstaged: true }","Pick one scope","staging_stash others if needed","staging_enforce → commit"]
			},
			{
				heading: "Classify first",
				paragraphs: [
					"Always classify before writing Commit-Scope into the message.",
				]
				,
				code: {
					title: "MCP: staging_classify",
					lang: "json",
					code: `{ "includeUnstaged": true }`
				}
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"staging_enforce ok for declared scope",
					"classify agrees with message",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Message scope ≠ staged paths",
					"Docs+code mixed illegally",
					"Ignoring staging_diff graph drift",
				]
			},
		],
		relatedDocs: [{"href":"/docs/staging-scopes/","label":"Staging scopes"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "enforcement",
		title: "Enforcement sessions",
		summary: "Begin sessions, record MCP tools, pass enforcement_check before checkpoints.",
		trackId: "commit",
		prerequisites: ["plugin-host","cap"],
		goals: ["enforcement_begin","Record staging+confidence","Pass enforcement_check"],
		mcpTools: ["enforcement_begin","enforcement_status","enforcement_record","enforcement_check"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Enforcement mode `enforce` requires an active session. afterMCPExecution hooks should call enforcement_record. Minimum: one staging_* and one confidence_* tool recorded.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: enforcement_begin, enforcement_status, enforcement_record, enforcement_check.",
				]
				,
				code: {
					title: "MCP: enforcement_begin",
					lang: "json",
					code: `{ "mode": "enforce", "note": "auth middleware slice" }`
				}
				,
				steps: ["enforcement_begin","staging_enforce","confidence_enforce","enforcement_check","commit_checkpoint"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"enforcement_status non-null",
					"enforcement_check ok:true",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Checkpoint without begin",
					"Only one of staging/confidence recorded",
					"Wrong repo root → status null",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"},{"href":"/docs/api/","label":"API surface"}]
	},
	{
		slug: "confidence",
		title: "Confidence Engine",
		summary: "Evaluate, raise, and enforce confidence until ok before mutating commits.",
		trackId: "commit",
		prerequisites: ["enforcement"],
		goals: ["confidence_evaluate","confidence_raise","confidence_enforce ok"],
		imports: ["@tmrxjd/agent-governance-system/confidence"],
		mcpTools: ["confidence_evaluate","confidence_get","confidence_raise","confidence_enforce"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Confidence is a checklist gate: schemas consulted, risks named, evidence present. Raise until enforce returns ok (or mayAskUser).",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: confidence_evaluate, confidence_get, confidence_raise, confidence_enforce.",
				]
				,
				code: {
					title: "MCP: confidence_enforce",
					lang: "json",
					code: `{ "intent": "add session refresh helper", "paths": ["src/auth/session.ts"] }`
				}
				,
				steps: ["confidence_evaluate","Close gaps (schema_enforce, testing_plan, …)","confidence_raise","confidence_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"confidence_enforce ok:true",
					"Recorded in enforcement session",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Enforce once and ignore gaps",
					"Raise without evidence",
					"Skip confidence → enforcement_check fails",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"},{"href":"/docs/api/","label":"API surface"}]
	},
	{
		slug: "first-governed-commit",
		title: "First governed commit end-to-end",
		summary: "Full path: CAP on → classify → enforce → confidence → commit_checkpoint.",
		trackId: "commit",
		prerequisites: ["install-hooks","cap","commit-msg","staging","enforcement","confidence","commit-checkpoint"],
		goals: ["Land one legal SHA","Keep single scope","Leave CAP intentional"],
		mcpTools: ["commit_authorize","enforcement_begin","staging_classify","staging_enforce","confidence_enforce","commit_validate","commit_checkpoint"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Use a single-scope edit for the first success. Do not mix protocol docs with code. Follow the attestation pipeline exactly once.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: commit_authorize, enforcement_begin, staging_classify, staging_enforce, confidence_enforce, commit_validate, commit_checkpoint.",
				]
				,
				code: {
					title: "commit_checkpoint payload",
					lang: "json",
					code: `{
  "message": "status/checkpoint(demo): add governed helper\\n\\nStatus: checkpoint\\nScope: demo\\nCommit-Scope: function-create\\nNot-done: wire caller\\nNext: module-wire\\nEvidence: vitest\\nToken: mid\\nGraph-ids: none (infra)\\nUser-approved: no\\nEnforcement: mcp",
  "files": ["src/demo/helper.ts"],
  "dryRun": false
}`
				}
				,
				steps: ["commit_authorize state on","enforcement_begin","staging_classify → staging_enforce","confidence_enforce","commit_checkpoint"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"git log -1 shows status/checkpoint",
					"Hook accepted message",
					"No false “done” claim",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Multi-scope dirty tree",
					"Raw git commit after MCP failure",
					"Missing User-approved trailer",
				]
			},
		],
		relatedDocs: [{"href":"/docs/tutorials/","label":"Tutorials"},{"href":"/docs/staging-scopes/","label":"Staging scopes"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "schema",
		title: "Schema Engine",
		summary: "Scan, get, validate, diff, and enforce the Schema graph before adding MCP tools or DiffRules.",
		trackId: "structure",
		prerequisites: ["plugin-host","governance-toc"],
		goals: ["schema_get family","schema_enforce pass","Register new schemas correctly"],
		imports: ["@tmrxjd/agent-governance-system"],
		mcpTools: ["schema_scan","schema_get","schema_validate","schema_diff","schema_enforce"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Schema Engine owns Zod/JSON shapes for staging categories, enforcement sessions, confidence reports, version policy, deployment policy, arrays, canonical registry, and more. Call schema_get before inventing fields; schema_enforce before commit when schemas change.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: schema_scan, schema_get, schema_validate, schema_diff, schema_enforce.",
				]
				,
				code: {
					title: "MCP: schema_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["schema_scan / schema_get","Edit registered schema module","schema_validate","schema_enforce"]
			},
			{
				heading: "Get a family",
				paragraphs: [
					"Fetch a schema id before extending it.",
				]
				,
				code: {
					title: "MCP: schema_get",
					lang: "json",
					code: `{ "id": "schema:staging-category" }`
				}
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"schema_enforce ok",
					"schema_diff clean or explained",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"New MCP tool without schema node",
					"Hand-edited graph artifact drift",
					"Skipping schema_get then failing confidence checklist",
				]
			},
		],
		relatedDocs: [{"href":"/docs/api/","label":"API surface"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "pointer",
		title: "Pointer Engine",
		summary: "Map repo paths to homes and catch documentation/structure drift with pointer_enforce.",
		trackId: "structure",
		prerequisites: ["plugin-host"],
		goals: ["Define pointer homes","pointer_diff drift","pointer_enforce"],
		mcpTools: ["pointer_scan","pointer_get","pointer_validate","pointer_diff","pointer_enforce"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Pointers declare where classes of files live (docs/, .ags/, src/). pointer_enforce fails when docs claim missing paths or governed files lack a home.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Apply the following configuration in your repo.",
				]
				,
				code: {
					title: "Pointer homes (conceptual)",
					lang: "yaml",
					code: `rules:
  - id: gov-docs
    roots: [docs/, .ags/]
  - id: eng-src
    roots: [packages/agent-governance-system/src/]`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: pointer_scan, pointer_get, pointer_validate, pointer_diff, pointer_enforce.",
				]
				,
				code: {
					title: "MCP: pointer_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["pointer_scan","pointer_get","Fix homes / docs","pointer_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"pointer_enforce ok",
					"pointer_diff empty or planned",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Moved protocol file without updating pointers",
					"Docs link to deleted path",
					"Orphan governed file outside roots",
				]
			},
		],
		relatedDocs: [{"href":"/docs/pointer-domains/","label":"Pointer domains"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "semantic",
		title: "Semantic Engine",
		summary: "Enforce meaning constraints — e.g. done requires user_approved — via semantic_enforce.",
		trackId: "structure",
		prerequisites: ["plugin-host","commit-msg"],
		goals: ["Load semantic graph","Detect contradictions","Pass semantic_enforce"],
		mcpTools: ["semantic_scan","semantic_get","semantic_validate","semantic_diff","semantic_enforce"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Semantic domains encode constraints across CAP, staging, sentinel, versioning, deployment, efficiency, and impact. Contradictions (status done + User-approved: no) hold the path.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: semantic_scan, semantic_get, semantic_validate, semantic_diff, semantic_enforce.",
				]
				,
				code: {
					title: "MCP: semantic_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["semantic_get for domains you touch","Align commit trailers / ledger status","semantic_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"No contradiction issues",
					"semantic_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Claiming finished without approval",
					"Conflicting domain assertions in one change",
					"Skipping semantic_diff after graph edits",
				]
			},
		],
		relatedDocs: [{"href":"/docs/semantic-domains/","label":"Semantic domains"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "testing",
		title: "Testing Engine",
		summary: "Plan required suites, run/validate evidence, scaffold missing tests before commit.",
		trackId: "quality",
		prerequisites: ["plugin-host"],
		goals: ["testing_plan paths","testing_validate","testing_enforce"],
		mcpTools: ["testing_plan","testing_run","testing_validate","testing_diff","testing_enforce","testing_scaffold"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Testing Engine maps changed paths to suiteIds / vitest paths. Agents must run those suites; testing_enforce refuses commit evidence gaps.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: testing_plan, testing_run, testing_validate, testing_diff, testing_enforce, testing_scaffold.",
				]
				,
				code: {
					title: "MCP: testing_plan",
					lang: "json",
					code: `{ "paths": ["packages/app/src/auth/session.ts"] }`
				}
				,
				steps: ["testing_plan","testing_run (or local vitest)","testing_validate","testing_enforce"]
			},
			{
				heading: "Scaffold",
				paragraphs: [
					"When coverage is missing, testing_scaffold creates planted-fault capable stubs — then you must fill assertions that can fail.",
				]
				,
				code: {
					title: "MCP: testing_scaffold",
					lang: "json",
					code: `{ "paths": ["packages/app/src/auth/session.ts"] }`
				}
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Plan lists concrete vitest paths",
					"testing_validate ok after runs",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Validate without running listed suites",
					"Scaffold then skip execute",
					"Broad path set → under-specified plan",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"},{"href":"/docs/api/","label":"API surface"}]
	},
	{
		slug: "performance",
		title: "Performance Engine",
		summary: "Scan budgets, validate measurements, enforce performance gates on hot paths.",
		trackId: "quality",
		prerequisites: ["plugin-host"],
		goals: ["performance_scan","performance_validate","performance_enforce"],
		mcpTools: ["performance_scan","performance_get","performance_validate","performance_diff","performance_enforce"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Performance Engine tracks budgets for critical operations. Use before merging changes that touch hot loops, MCP host latency, or pack algorithms.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: performance_scan, performance_get, performance_validate, performance_diff, performance_enforce.",
				]
				,
				code: {
					title: "MCP: performance_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["performance_get budgets","Measure changed path","performance_validate","performance_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Budgets met",
					"performance_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"No baseline measurement",
					"Validate against synthetic no-op fixtures",
					"Ignoring performance_diff regressions",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "sentinel",
		title: "Sentinel reflex arcs",
		summary: "Read sentinel_status, enforce reflex policies, clear pain only after remediation.",
		trackId: "quality",
		prerequisites: ["install-hooks","enforcement"],
		goals: ["Inspect status","Understand pain→reflex","sentinel_enforce / clear"],
		mcpTools: ["sentinel_status","sentinel_get","sentinel_enforce","sentinel_clear"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Sentinel maps pains (raw git commit, license fail, doctor broken) to reflexes that block or remediate. Agents clear pain only after the underlying violation is fixed.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: sentinel_status, sentinel_get, sentinel_enforce, sentinel_clear.",
				]
				,
				code: {
					title: "MCP: sentinel_status",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["sentinel_status","Remediate cited pain","sentinel_enforce","sentinel_clear if required"]
			},
			{
				heading: "Example reflex",
				paragraphs: [
					"Raw git commit pain routes to gate.commit_msg deny + MCP redirect.",
				]
				,
				code: {
					title: "Conceptual reflex",
					lang: "yaml",
					code: `pain: commit:raw_git
reflex: gate.commit_msg
action: deny`
				}
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"No active blocking pains",
					"sentinel_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"sentinel_clear without fix",
					"Ignoring reflex.license_enforce",
					"Fighting hooks instead of using commit_checkpoint",
				]
			},
		],
		relatedDocs: [{"href":"/docs/overview/","label":"Overview"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "canonical",
		title: "Canonicalization Engine",
		summary: "Declare one SoT per concept in .ags/canonical.yml; detect and plan fixes for mirror drift.",
		trackId: "singularity",
		prerequisites: ["plugin-host"],
		goals: ["Author concepts","canon_enforce","canon_plan_fix"],
		mcpTools: ["canon_get","canon_validate","canon_enforce","canon_drift","canon_plan_fix"],
		config: [".ags/canonical.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Each concept has one canonicalPath. Mirrors (docs) may reference it but must not diverge silently. canon_drift lists mismatches; canon_plan_fix proposes repairs.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: .ags/canonical.yml.",
				]
				,
				code: {
					title: ".ags/canonical.yml",
					lang: "yaml",
					code: `schemaVersion: 1
concepts:
  - id: versioning-config
    label: Versioning policy
    canonicalPath: .ags/versioning.yml
    kind: config
    mirrors:
      - docs/AGENT_VERSIONING_PROTOCOL.md
graphArtifact: docs/canonical-map/latest.json`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: canon_get, canon_validate, canon_enforce, canon_drift, canon_plan_fix.",
				]
				,
				code: {
					title: "MCP: canon_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["Add concept to .ags/canonical.yml","canon_validate","canon_drift","canon_enforce"]
			},
			{
				heading: "Plan a fix",
				paragraphs: [
					"When drift is real, plan before editing mirrors.",
				]
				,
				code: {
					title: "MCP: canon_plan_fix",
					lang: "json",
					code: `{ "conceptId": "versioning-config" }`
				}
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"canon_enforce ok",
					"canon_drift empty or accepted",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Two SoTs for one concept",
					"Docs rewritten as authority",
					"Missing graphArtifact update",
				]
			},
		],
		relatedDocs: [{"href":"/docs/canonical/","label":"Canonicalization"},{"href":"/docs/configuration/","label":"Configuration"}]
	},
	{
		slug: "data-array",
		title: "Data Array Engine",
		summary: "Govern ordered, deduped arrays with array_enforce and array_plan_normalize.",
		trackId: "singularity",
		prerequisites: ["plugin-host"],
		goals: ["Declare arrays in .ags/data-arrays.yml","Enforce order/unique","Normalize"],
		mcpTools: ["array_get","array_validate","array_enforce","array_plan_normalize"],
		config: [".ags/data-arrays.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Arrays like staging-categories and deployment-order must stay unique and ordered. Locators point at TS exports or YAML keys.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: .ags/data-arrays.yml.",
				]
				,
				code: {
					title: ".ags/data-arrays.yml",
					lang: "yaml",
					code: `schemaVersion: 1
arrays:
  - id: deployment-order
    path: .ags/deployment.yml
    locator:
      yamlKey: deploymentOrder
    order: asDeclared
    uniqueBy: "$value"
    itemKind: string
    domain: deployment
graphArtifact: docs/data-array-map/latest.json`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: array_get, array_validate, array_enforce, array_plan_normalize.",
				]
				,
				code: {
					title: "MCP: array_enforce",
					lang: "json",
					code: `{ "arrayId": "deployment-order" }`
				}
				,
				steps: ["Declare array","array_validate","array_plan_normalize if dirty","array_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"array_enforce ok",
					"Order matches policy",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Duplicates under uniqueBy",
					"Alpha sort when asDeclared required",
					"Wrong locator → empty read",
				]
			},
		],
		relatedDocs: [{"href":"/docs/data-array/","label":"Data arrays"},{"href":"/docs/configuration/","label":"Configuration"}]
	},
	{
		slug: "dependency",
		title: "Dependency Engine",
		summary: "Validate dependency graphs for cycles and compatibility; enforce and plan fixes.",
		trackId: "singularity",
		prerequisites: ["plugin-host"],
		goals: ["dep_get graph","dep_enforce","dep_plan_fix"],
		mcpTools: ["dep_get","dep_validate","dep_enforce","dep_plan_fix"],
		config: [".ags/dependency.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Dependency Engine tracks package/service edges, cycle detection, and compatibility constraints declared in `.ags/dependency.yml`.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: .ags/dependency.yml.",
				]
				,
				code: {
					title: ".ags/dependency.yml (sketch)",
					lang: "yaml",
					code: `schemaVersion: 1
enabled: true
forbidCycles: true
graphArtifact: docs/dependency-map/latest.json`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: dep_get, dep_validate, dep_enforce, dep_plan_fix.",
				]
				,
				code: {
					title: "MCP: dep_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["dep_get","dep_validate","dep_plan_fix if needed","dep_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"No cycles",
					"dep_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"New import cycle",
					"Compat edge violated after bump",
					"Plan fix then skip apply",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"},{"href":"/docs/configuration/","label":"Configuration"}]
	},
	{
		slug: "versioning",
		title: "Versioning Engine",
		summary: "Map Commit-Scopes to semver bumps via .ags/versioning.yml and version_plan_bump / version_enforce.",
		trackId: "delivery",
		prerequisites: ["staging","plugin-host"],
		goals: ["Configure bumpRules","version_plan_bump","version_enforce"],
		mcpTools: ["version_get","version_validate","version_enforce","version_plan_bump"],
		config: [".ags/versioning.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Bump rules bind staging categories to major/minor/patch/none. Agents plan bumps before release commits; version_enforce checks package.json vs policy.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: .ags/versioning.yml.",
				]
				,
				code: {
					title: ".ags/versioning.yml",
					lang: "yaml",
					code: `schemaVersion: 1
scheme: semver
packages:
  - name: "@acme/app"
    path: packages/app/package.json
    previousVersion: "1.0.0"
bumpRules:
  file-create: minor
  function-create: minor
  module-wire: minor
  single-change: patch
  single-fix: patch
  breaking-change: major
  milestone-close: none
changelog:
  path: CHANGELOG.md
graphArtifact: docs/version-map/latest.json`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: version_get, version_validate, version_enforce, version_plan_bump.",
				]
				,
				code: {
					title: "MCP: version_plan_bump",
					lang: "json",
					code: `{ "commitScope": "function-create", "packageName": "@acme/app" }`
				}
				,
				steps: ["version_get","version_plan_bump","Apply version in package.json","version_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Plan matches bumpRules",
					"version_enforce ok after bump",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Forgot to bump package.json",
					"breaking-change committed as patch",
					"CAP off when enforce expects commit session",
				]
			},
		],
		relatedDocs: [{"href":"/docs/versioning/","label":"Versioning"},{"href":"/docs/staging-scopes/","label":"Staging scopes"}]
	},
	{
		slug: "deployment",
		title: "Deployment Engine",
		summary: "Define environment ladders, required checks/tests, and enforce deploy order.",
		trackId: "delivery",
		prerequisites: ["plugin-host"],
		goals: ["Author .ags/deployment.yml","deploy_status","deploy_enforce"],
		mcpTools: ["deploy_get","deploy_validate","deploy_enforce","deploy_status","deploy_plan_rollback"],
		config: [".ags/deployment.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Environments declare requiredChecks, requiredTests, and approvals. deploymentOrder is authoritative; requireBeforeMerge lists envs that must be green before mergeTarget.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: .ags/deployment.yml.",
				]
				,
				code: {
					title: ".ags/deployment.yml",
					lang: "yaml",
					code: `schemaVersion: 1
environments:
  - id: local
    requiredChecks: []
    requiredTests: [unit]
    requiredApprovals: 0
  - id: staging
    requiredChecks: [build]
    requiredTests: [unit]
    requiredApprovals: 0
  - id: production
    requiredChecks: [build, publish-dry-run]
    requiredTests: [unit]
    requiredApprovals: 1
deploymentOrder: [local, staging, production]
mergeTarget: master
requireBeforeMerge: [staging]
graphArtifact: docs/deployment-map/latest.json`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: deploy_get, deploy_validate, deploy_enforce, deploy_status, deploy_plan_rollback.",
				]
				,
				code: {
					title: "MCP: deploy_enforce",
					lang: "json",
					code: `{ "environment": "staging" }`
				}
				,
				steps: ["deploy_get","Satisfy checks/tests","deploy_status","deploy_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"deploy_status shows ladder progress",
					"deploy_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Skipping staging into production",
					"Missing requiredTests evidence",
					"Approvals < requiredApprovals",
				]
			},
		],
		relatedDocs: [{"href":"/docs/deployment/","label":"Deployment"},{"href":"/docs/configuration/","label":"Configuration"}]
	},
	{
		slug: "promotion",
		title: "Promotion Engine",
		summary: "Gate promotions across environments with promote_plan / promote_enforce.",
		trackId: "delivery",
		prerequisites: ["deployment"],
		goals: ["Configure promotion ladder","promote_plan","promote_enforce"],
		mcpTools: ["promote_get","promote_validate","promote_enforce","promote_plan"],
		config: [".ags/promotion.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Promotion Engine consumes deployment order plus promotion-specific items/approvals. Agents plan a promotion, attach evidence, then enforce.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: .ags/promotion.yml.",
				]
				,
				code: {
					title: ".ags/promotion.yml (sketch)",
					lang: "yaml",
					code: `schemaVersion: 1
enabled: true
items: []
graphArtifact: docs/promotion-map/latest.json`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: promote_get, promote_validate, promote_enforce, promote_plan.",
				]
				,
				code: {
					title: "MCP: promote_enforce",
					lang: "json",
					code: `{ "from": "staging", "to": "production" }`
				}
				,
				steps: ["promote_get","promote_plan","Collect check evidence","promote_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"promote_enforce ok with evidence",
					"Ladder step advances",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Promote without health_check",
					"Wrong from/to pair",
					"Missing approval on production",
				]
			},
		],
		relatedDocs: [{"href":"/docs/deployment/","label":"Deployment"}]
	},
	{
		slug: "release",
		title: "Release Engine",
		summary: "Plan and enforce release artifacts, tags, and notes against .ags/release.yml.",
		trackId: "delivery",
		prerequisites: ["versioning"],
		goals: ["release_plan","release_enforce","Attach changelog evidence"],
		mcpTools: ["release_get","release_validate","release_enforce","release_plan"],
		config: [".ags/release.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Release Engine validates tags, artifacts, and changelog sections required by versioning policy before a release is considered legal.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: release_get, release_validate, release_enforce, release_plan.",
				]
				,
				code: {
					title: "MCP: release_plan",
					lang: "json",
					code: `{ "packageName": "@acme/app", "version": "1.1.0" }`
				}
				,
				steps: ["version_enforce","release_plan","Create tag/notes/artifacts","release_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"release_enforce ok",
					"Notes + tag consistent",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Tag without changelog section",
					"Artifact path missing",
					"Version mismatch vs version_enforce",
				]
			},
		],
		relatedDocs: [{"href":"/docs/versioning/","label":"Versioning"},{"href":"/docs/deployment/","label":"Deployment"}]
	},
	{
		slug: "health",
		title: "Health Engine",
		summary: "Define health checks and run health_check / health_enforce before promotion.",
		trackId: "delivery",
		prerequisites: ["deployment"],
		goals: ["Configure .ags/health.yml","health_check","health_enforce"],
		mcpTools: ["health_get","health_validate","health_enforce","health_check"],
		config: [".ags/health.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Health Engine probes endpoints or scripts declared in policy. Production promotion should require health_enforce green.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: health_get, health_validate, health_enforce, health_check.",
				]
				,
				code: {
					title: "MCP: health_check",
					lang: "json",
					code: `{ "environment": "staging" }`
				}
				,
				steps: ["health_get","health_check","Fix failing targets","health_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"All checks pass",
					"health_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Stale success cache",
					"Wrong environment id",
					"Skipping health before promote_enforce",
				]
			},
		],
		relatedDocs: [{"href":"/docs/deployment/","label":"Deployment"}]
	},
	{
		slug: "rollback",
		title: "Rollback Engine",
		summary: "Plan and enforce rollbacks with version tracking when health or promotion fails.",
		trackId: "delivery",
		prerequisites: ["deployment","health"],
		goals: ["rollback_plan","rollback_enforce","Use deploy_plan_rollback"],
		mcpTools: ["rollback_get","rollback_validate","rollback_enforce","rollback_plan","deploy_plan_rollback"],
		config: [".ags/rollback.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Rollback Engine records prior known-good versions and required verification after revert. Pair with deploy_plan_rollback for environment-aware plans.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: rollback_get, rollback_validate, rollback_enforce, rollback_plan, deploy_plan_rollback.",
				]
				,
				code: {
					title: "MCP: rollback_plan",
					lang: "json",
					code: `{ "environment": "production", "toVersion": "1.0.0" }`
				}
				,
				steps: ["rollback_get","rollback_plan / deploy_plan_rollback","Execute revert","health_check → rollback_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Plan cites prior version",
					"rollback_enforce ok after verify",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Rollback without health re-check",
					"Unknown toVersion",
					"Skipping integrity_enforce on artifacts",
				]
			},
		],
		relatedDocs: [{"href":"/docs/deployment/","label":"Deployment"}]
	},
	{
		slug: "efficiency",
		title: "Efficiency Engine — token budgets and loops",
		summary: "Track tokens, predict waste, block loops with efficiency_enforce profiles.",
		trackId: "intelligence",
		prerequisites: ["plugin-host","product-licensing"],
		goals: ["Configure .ags/efficiency.yml","efficiency_track/predict","efficiency_enforce"],
		mcpTools: ["efficiency_get","efficiency_validate","efficiency_enforce","efficiency_plan","efficiency_track","efficiency_predict","efficiency_compress","efficiency_hotspots","efficiency_analytics","efficiency_forecast","efficiency_orchestrate"],
		config: [".ags/efficiency.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Efficiency Engine budgets tokens per operation, detects repeated fix loops, and can compress context. Profiles: free | personal | enterprise via entitlements.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: .ags/efficiency.yml.",
				]
				,
				code: {
					title: ".ags/efficiency.yml",
					lang: "yaml",
					code: `schemaVersion: 1
enabled: true
profile: personal
loopPrevention: true
loopRepeatThreshold: 3
loopWindowMs: 900000
organicGuardrails: true
contextCompression: true
trackHotspots: true
budgets:
  - id: default-operation
    maxTokens: 40000
    wasteWarnRatio: 0.35
  - id: commit-checkpoint
    maxTokens: 12000
    wasteWarnRatio: 0.4
graphArtifact: docs/efficiency-map/latest.json`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: efficiency_get, efficiency_validate, efficiency_enforce, efficiency_plan, efficiency_track, efficiency_predict, efficiency_compress, efficiency_hotspots, efficiency_analytics, efficiency_forecast, efficiency_orchestrate.",
				]
				,
				code: {
					title: "MCP: efficiency_enforce",
					lang: "json",
					code: `{ "budgetId": "default-operation" }`
				}
				,
				steps: ["efficiency_get","efficiency_track during tools","efficiency_predict before bursts","efficiency_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Under budget",
					"No loop hold",
					"efficiency_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Loop threshold exceeded",
					"Entitlement lacks token_efficiency_full",
					"Track without enforce on hot sessions",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"},{"href":"/docs/licensing/","label":"Licensing"},{"href":"/pricing/","label":"Pricing"}]
	},
	{
		slug: "impact",
		title: "Impact Engine — prove growth",
		summary: "Run impact snapshots, scores, stress, and reports to prove the agent is getting smarter.",
		trackId: "intelligence",
		prerequisites: ["efficiency"],
		goals: ["impact_run","impact_score/reports","impact_enforce"],
		mcpTools: ["impact_get","impact_validate","impact_enforce","impact_plan","impact_run","impact_compare","impact_score","impact_reports","impact_stress","impact_feed_efficiency"],
		config: [".ags/impact.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Impact Engine audits growth across dependency maps, builders, semantic constraints, and guardrails. Plateaus can be maturity (optimal_plateau), not failure. Adversarial stress proves learning is real.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: impact_get, impact_validate, impact_enforce, impact_plan, impact_run, impact_compare, impact_score, impact_reports, impact_stress, impact_feed_efficiency.",
				]
				,
				code: {
					title: "MCP: impact_reports",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["impact_plan","impact_run","impact_stress","impact_score → impact_enforce","impact_feed_efficiency when coupling budgets"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"ImpactScore produced",
					"impact_enforce ok",
					"No silent no-op verdict",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Treating plateau as hard fail",
					"Skipping impact_stress",
					"Entitlement lacks impact_full for deep reports",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"},{"href":"/docs/licensing/","label":"Licensing"}]
	},
	{
		slug: "optimization",
		title: "Optimization Engine",
		summary: "Enforce MCP/cost and performance optimization policies with optimize_* tools.",
		trackId: "intelligence",
		prerequisites: ["efficiency","performance"],
		goals: ["optimize_plan","optimize_enforce","Tie to budgets"],
		mcpTools: ["optimize_get","optimize_validate","optimize_enforce","optimize_plan"],
		config: [".ags/optimization.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Optimization Engine turns efficiency + performance signals into enforceable optimization plans (tool batching, cache, budget reallocations).",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: optimize_get, optimize_validate, optimize_enforce, optimize_plan.",
				]
				,
				code: {
					title: "MCP: optimize_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["optimize_get","optimize_plan","Apply changes","optimize_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Plan applied",
					"optimize_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Optimize without efficiency baseline",
					"Plan conflicts with testing_enforce",
					"Ignoring optimize_validate warnings",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "policy",
		title: "Policy Engine",
		summary: "Browse and enforce .ags/policy.yml registries that bind engines to required files.",
		trackId: "ops",
		prerequisites: ["plugin-host"],
		goals: ["policy_get","policy_plan","policy_enforce"],
		mcpTools: ["policy_get","policy_validate","policy_enforce","policy_plan"],
		config: [".ags/policy.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Policy Engine is the registry of governance policies and requiredFiles. Use it to discover which .ags/*.yml must exist before other enforces.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: .ags/policy.yml.",
				]
				,
				code: {
					title: ".ags/policy.yml",
					lang: "yaml",
					code: `schemaVersion: 1
enabled: true
requiredFiles: []
items: []
graphArtifact: docs/policy-map/latest.json`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: policy_get, policy_validate, policy_enforce, policy_plan.",
				]
				,
				code: {
					title: "MCP: policy_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["policy_get","policy_plan","Apply remediation","policy_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"policy_enforce ok",
					"Policy matches live state",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Config enabled but requiredFiles missing",
					"Enforce without validate",
					"Plan ignored",
				]
			},
		],
		relatedDocs: [{"href":"/docs/configuration/","label":"Configuration"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "observability",
		title: "Observability Engine",
		summary: "Enforce log/metric/anomaly policies with observe_* tools.",
		trackId: "ops",
		prerequisites: ["plugin-host"],
		goals: ["observe_get","observe_plan","observe_enforce"],
		mcpTools: ["observe_get","observe_validate","observe_enforce","observe_plan"],
		config: [".ags/observability.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Observability Engine requires telemetry contracts for governed services — agents must attach observe evidence when policies demand it.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: observe_get, observe_validate, observe_enforce, observe_plan.",
				]
				,
				code: {
					title: "MCP: observe_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["observe_get","observe_plan","Apply remediation","observe_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"observe_enforce ok",
					"Policy matches live state",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Config enabled but requiredFiles missing",
					"Enforce without validate",
					"Plan ignored",
				]
			},
		],
		relatedDocs: [{"href":"/docs/configuration/","label":"Configuration"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "artifact",
		title: "Artifact Engine",
		summary: "Validate release/build artifact structure with artifact_enforce.",
		trackId: "ops",
		prerequisites: ["plugin-host"],
		goals: ["artifact_get","artifact_plan","artifact_enforce"],
		mcpTools: ["artifact_get","artifact_validate","artifact_enforce","artifact_plan"],
		config: [".ags/artifact.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Artifact Engine checks declared artifact layouts, checksums hooks, and required paths before release_enforce.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: artifact_get, artifact_validate, artifact_enforce, artifact_plan.",
				]
				,
				code: {
					title: "MCP: artifact_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["artifact_get","artifact_plan","Apply remediation","artifact_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"artifact_enforce ok",
					"Policy matches live state",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Config enabled but requiredFiles missing",
					"Enforce without validate",
					"Plan ignored",
				]
			},
		],
		relatedDocs: [{"href":"/docs/configuration/","label":"Configuration"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "registry",
		title: "Registry Engine",
		summary: "Govern private package registry publish flows with registry_enforce.",
		trackId: "ops",
		prerequisites: ["plugin-host"],
		goals: ["registry_get","registry_plan","registry_enforce"],
		mcpTools: ["registry_get","registry_validate","registry_enforce","registry_plan"],
		config: [".ags/registry.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Registry Engine encodes publish targets, auth requirements, and dry-run rules for npm/GitHub Packages style registries.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: registry_get, registry_validate, registry_enforce, registry_plan.",
				]
				,
				code: {
					title: "MCP: registry_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["registry_get","registry_plan","Apply remediation","registry_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"registry_enforce ok",
					"Policy matches live state",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Config enabled but requiredFiles missing",
					"Enforce without validate",
					"Plan ignored",
				]
			},
		],
		relatedDocs: [{"href":"/docs/install-commercial/","label":"Install"},{"href":"/docs/configuration/","label":"Configuration"}]
	},
	{
		slug: "integrity",
		title: "Integrity Engine",
		summary: "Checksum and tamper detection via integrity_enforce.",
		trackId: "ops",
		prerequisites: ["plugin-host"],
		goals: ["integrity_get","integrity_plan","integrity_enforce"],
		mcpTools: ["integrity_get","integrity_validate","integrity_enforce","integrity_plan"],
		config: [".ags/integrity.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Integrity Engine verifies hashes for critical artifacts and config sidecars; use after download/publish and before promote.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: integrity_get, integrity_validate, integrity_enforce, integrity_plan.",
				]
				,
				code: {
					title: "MCP: integrity_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["integrity_get","integrity_plan","Apply remediation","integrity_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"integrity_enforce ok",
					"Policy matches live state",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Config enabled but requiredFiles missing",
					"Enforce without validate",
					"Plan ignored",
				]
			},
		],
		relatedDocs: [{"href":"/docs/configuration/","label":"Configuration"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "identity",
		title: "Identity Engine",
		summary: "Map agents, users, and environments in the identity graph; enforce identity_policy.",
		trackId: "ops",
		prerequisites: ["plugin-host"],
		goals: ["identity_get","identity_plan","identity_enforce"],
		mcpTools: ["identity_get","identity_validate","identity_enforce","identity_plan"],
		config: [".ags/identity.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Identity Engine binds who/what may act: agent ids, human approvers, environment principals.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: identity_get, identity_validate, identity_enforce, identity_plan.",
				]
				,
				code: {
					title: "MCP: identity_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["identity_get","identity_plan","Apply remediation","identity_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"identity_enforce ok",
					"Policy matches live state",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Config enabled but requiredFiles missing",
					"Enforce without validate",
					"Plan ignored",
				]
			},
		],
		relatedDocs: [{"href":"/docs/configuration/","label":"Configuration"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "access",
		title: "Access Engine",
		summary: "Permission matrices and access gating with access_enforce.",
		trackId: "ops",
		prerequisites: ["plugin-host"],
		goals: ["access_get","access_plan","access_enforce"],
		mcpTools: ["access_get","access_validate","access_enforce","access_plan"],
		config: [".ags/access.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Access Engine evaluates permission matrices for tools, environments, and secrets. Pair with identity principals.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: access_get, access_validate, access_enforce, access_plan.",
				]
				,
				code: {
					title: "MCP: access_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["access_get","access_plan","Apply remediation","access_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"access_enforce ok",
					"Policy matches live state",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Config enabled but requiredFiles missing",
					"Enforce without validate",
					"Plan ignored",
				]
			},
		],
		relatedDocs: [{"href":"/docs/configuration/","label":"Configuration"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "security",
		title: "Security Engine",
		summary: "Secret scanning and secure deploy cues via security_enforce.",
		trackId: "ops",
		prerequisites: ["plugin-host"],
		goals: ["security_get","security_plan","security_enforce"],
		mcpTools: ["security_get","security_validate","security_enforce","security_plan"],
		config: [".ags/security.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Security Engine scans for secrets and enforces secure deployment constraints. Blocks commits/publishes when findings remain.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: security_get, security_validate, security_enforce, security_plan.",
				]
				,
				code: {
					title: "MCP: security_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["security_get","security_plan","Apply remediation","security_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"security_enforce ok",
					"Policy matches live state",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Config enabled but requiredFiles missing",
					"Enforce without validate",
					"Plan ignored",
				]
			},
		],
		relatedDocs: [{"href":"/docs/licensing/","label":"Licensing"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "agent-surface",
		title: "Agent Surface Engine",
		summary: "Constrain which MCP tools/paths agents may use with surface_enforce.",
		trackId: "ops",
		prerequisites: ["plugin-host"],
		goals: ["surface_get","surface_plan","surface_enforce"],
		mcpTools: ["surface_get","surface_validate","surface_enforce","surface_plan"],
		config: [".ags/agent-surface.yml"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Agent Surface declares allow/deny lists for tools and filesystem roots. Hosts should surface_enforce before broad tool access in untrusted sessions.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: surface_get, surface_validate, surface_enforce, surface_plan.",
				]
				,
				code: {
					title: "MCP: surface_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["surface_get","surface_plan","Apply remediation","surface_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"surface_enforce ok",
					"Policy matches live state",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Config enabled but requiredFiles missing",
					"Enforce without validate",
					"Plan ignored",
				]
			},
		],
		relatedDocs: [{"href":"/docs/configuration/","label":"Configuration"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "persistence",
		title: "Persistence Engine",
		summary: "Scan and enforce persistence contracts so durable state stays on canonical paths.",
		trackId: "support",
		prerequisites: ["plugin-host"],
		goals: ["persistence_scan","persistence_enforce","Diff illegal stores"],
		imports: ["@tmrxjd/agent-governance-system/persistence"],
		mcpTools: ["persistence_scan","persistence_get","persistence_validate","persistence_diff","persistence_enforce"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Persistence Engine detects ad-hoc durable writes (rogue localStorage, duplicate stores) against registered persistence graphs.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: persistence_scan, persistence_get, persistence_validate, persistence_diff, persistence_enforce.",
				]
				,
				code: {
					title: "MCP: persistence_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["persistence_scan","persistence_diff","Move writes to canonical module","persistence_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"No illegal persistence paths",
					"persistence_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"New store bypassing canonical module",
					"Scan clean but enforce skipped",
					"Diff ignored after relocate",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"},{"href":"/docs/api/","label":"API surface"}]
	},
	{
		slug: "tracking",
		title: "Tracking Engine",
		summary: "Track work items / ledger alignment with tracking_enforce.",
		trackId: "support",
		prerequisites: ["plugin-host"],
		goals: ["tracking_scan","tracking_enforce","Keep ledger honest"],
		imports: ["@tmrxjd/agent-governance-system/tracking"],
		mcpTools: ["tracking_scan","tracking_get","tracking_validate","tracking_diff","tracking_enforce"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Tracking Engine aligns agent work status with tracked records — prevents “implementing” forever or false user_approved.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: tracking_scan, tracking_get, tracking_validate, tracking_diff, tracking_enforce.",
				]
				,
				code: {
					title: "MCP: tracking_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["tracking_scan","Update ledger","tracking_validate","tracking_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Ledger status matches commits",
					"tracking_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Status done/complete language",
					"user_approved without user",
					"Orphan tracking ids",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "familiarity",
		title: "Familiarity / style Engine",
		summary: "Enforce house style with style_scan / style_enforce so agents match repo conventions.",
		trackId: "support",
		prerequisites: ["plugin-host"],
		goals: ["style_get","style_enforce","Reduce style thrash"],
		imports: ["@tmrxjd/agent-governance-system/familiarity"],
		mcpTools: ["style_scan","style_get","style_validate","style_enforce"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Familiarity Engine captures naming, file layout, and stylistic invariants. style_enforce blocks alien patterns that pass tests but fight the codebase.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: style_scan, style_get, style_validate, style_enforce.",
				]
				,
				code: {
					title: "MCP: style_enforce",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["style_scan","style_get","Align change","style_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"style_enforce ok",
					"No foreign layout markers",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"New folder taxonomy without style update",
					"Copy-paste from another repo’s patterns",
					"Validate skipped",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "builder",
		title: "Builder Engine",
		summary: "Scan builder graphs and create/enforce build plans with builder_* tools.",
		trackId: "support",
		prerequisites: ["plugin-host"],
		goals: ["builder_scan","builder_create","builder_enforce"],
		imports: ["@tmrxjd/agent-governance-system/builder"],
		mcpTools: ["builder_scan","builder_get","builder_validate","builder_diff","builder_enforce","builder_create"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Builder Engine manages generative/build plans tied to governance graphs — use builder_create for new nodes, builder_enforce before accepting generated output.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: builder_scan, builder_get, builder_validate, builder_diff, builder_enforce, builder_create.",
				]
				,
				code: {
					title: "MCP: builder_create",
					lang: "json",
					code: `{ "kind": "module", "name": "auth-refresh" }`
				}
				,
				steps: ["builder_scan","builder_create","builder_validate","builder_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"builder_enforce ok",
					"Diff explained",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Create without enforce",
					"Orphan builder nodes",
					"Diff drift ignored",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"},{"href":"/docs/api/","label":"API surface"}]
	},
	{
		slug: "coordination",
		title: "Coordination Engine",
		summary: "Plan multi-domain work with coord_plan / coord_run / coord_enforce.",
		trackId: "support",
		prerequisites: ["staging","enforcement","confidence"],
		goals: ["coord_plan intent","coord_run","coord_enforce"],
		imports: ["@tmrxjd/agent-governance-system/coordination"],
		mcpTools: ["coord_plan","coord_run","coord_get","coord_validate","coord_enforce"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Coordination Engine sequences cross-domain pipelines (staging → schema → confidence → commit). Use when a change spans multiple engines.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: coord_plan, coord_run, coord_get, coord_validate, coord_enforce.",
				]
				,
				code: {
					title: "MCP: coord_plan",
					lang: "json",
					code: `{
  "intent": "add auth refresh and bump minor",
  "domains": ["staging", "schema", "versioning", "confidence"]
}`
				}
				,
				steps: ["coord_plan","coord_run attempt 1","Follow nextActions","coord_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Plan lists nextActions",
					"coord_enforce ok when consulted",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Run without plan",
					"Ignoring nextActions staging_split",
					"Skipping coord_enforce before checkpoint",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"},{"href":"/docs/staging-scopes/","label":"Staging scopes"}]
	},
	{
		slug: "formatting",
		title: "Formatting Engine",
		summary: "Scan, diff, apply, and enforce formatting contracts with format_* tools.",
		trackId: "support",
		prerequisites: ["plugin-host"],
		goals: ["format_scan","format_apply","format_enforce"],
		imports: ["@tmrxjd/agent-governance-system/formatting"],
		mcpTools: ["format_scan","format_get","format_validate","format_diff","format_apply","format_enforce"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Formatting Engine keeps generated and hand-edited governance artifacts in canonical format. Prefer format_apply then format_enforce before docs/chore commits.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: format_scan, format_get, format_validate, format_diff, format_apply, format_enforce.",
				]
				,
				code: {
					title: "MCP: format_apply",
					lang: "json",
					code: `{ "paths": [".ags/versioning.yml"] }`
				}
				,
				steps: ["format_scan","format_diff","format_apply","format_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"format_diff clean",
					"format_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Enforce without apply",
					"Mixed indentation in YAML policies",
					"Formatting unrelated files into wrong Commit-Scope",
				]
			},
		],
		relatedDocs: [{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "drift",
		title: "Drift Engine",
		summary: "Detect cross-artifact drift with drift_scan / drift_check / drift_enforce.",
		trackId: "support",
		prerequisites: ["canonical","pointer"],
		goals: ["drift_scan","drift_check","drift_enforce"],
		imports: ["@tmrxjd/agent-governance-system/drift"],
		mcpTools: ["drift_scan","drift_get","drift_validate","drift_diff","drift_enforce","drift_check"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Drift Engine aggregates pointer, canonical, schema, and docs mismatches into a single report. drift_check is the quick gate; drift_enforce is hard.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: drift_scan, drift_get, drift_validate, drift_diff, drift_enforce, drift_check.",
				]
				,
				code: {
					title: "MCP: drift_check",
					lang: "json",
					code: `{}`
				}
				,
				steps: ["drift_scan","drift_diff","Repair via canon_plan_fix / pointer fixes","drift_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"No error-level drift",
					"drift_enforce ok",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Docs updated without canonical",
					"Graph artifact stale",
					"Check pass misread when only warnings scanned",
				]
			},
		],
		relatedDocs: [{"href":"/docs/canonical/","label":"Canonicalization"},{"href":"/docs/pointer-domains/","label":"Pointer domains"}]
	},
	{
		slug: "gates",
		title: "Gates API",
		summary: "Run DiffRules via runGates / PluginHost gates for path classification and mutation holds.",
		trackId: "support",
		prerequisites: ["plugin-host","semantic"],
		goals: ["Import gates","runGates on a diff","Interpret GateReport"],
		imports: ["@tmrxjd/agent-governance-system/gates","@tmrxjd/agent-governance-system/plugin"],
		mcpTools: ["governance_toc"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"`runGates(host, opts)` evaluates DiffRules registered on PluginHost. Gates classify paths, block illegal mutations, and feed semantic-diff reports. MCP hosts expose gate results through engine enforces; call runGates in custom integrations and hooks.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: governance_toc.",
				]
				,
				code: {
					title: "runGates",
					lang: "typescript",
					code: `import { createPluginHost } from '@tmrxjd/agent-governance-system/plugin'
import { runGates } from '@tmrxjd/agent-governance-system/gates'

const host = createPluginHost({ repoRoot })
const report = runGates(host, {
  paths: ['src/auth/session.ts'],
  intent: 'add refresh helper',
})
if (!report.ok) throw new Error(report.issues.map(i => i.message).join('\\n'))`
				}
				,
				steps: ["Load host with plugins","runGates on changed paths","Fix issues","Proceed to staging_enforce"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"GateReport.ok true",
					"Issues empty or warnings only",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Empty diffRules on host",
					"Ignoring mutation-gate holds",
					"Running gates after commit instead of before",
				]
			},
		],
		relatedDocs: [{"href":"/docs/api/","label":"API surface"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "gov-lsp",
		title: "Governance LSP helpers",
		summary: "Use gov_lsp_diagnostics and gov_lsp_hover for in-editor governance feedback.",
		trackId: "support",
		prerequisites: ["plugin-host"],
		goals: ["gov_lsp_diagnostics","gov_lsp_hover","Wire into editor"],
		imports: ["@tmrxjd/agent-governance-system/lsp","@tmrxjd/agent-governance-system/mcp/lsp-tools.mjs"],
		mcpTools: ["gov_lsp_diagnostics","gov_lsp_hover"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"LSP tools expose diagnostics and hover for commit messages, .ags YAML, and graph ids. Agents and editors call gov_lsp_diagnostics on a path/range before commit.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: gov_lsp_diagnostics, gov_lsp_hover.",
				]
				,
				code: {
					title: "MCP: gov_lsp_diagnostics",
					lang: "json",
					code: `{ "path": "temp/commit-cap/state.json" }`
				}
				,
				steps: ["gov_lsp_diagnostics on message or config","Fix reported issues","gov_lsp_hover on unknown field","Re-validate"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Diagnostics list actionable issues",
					"Hover returns schema docs",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Wrong path → empty",
					"Host without lsp-tools merged",
					"Ignoring error severity diagnostics",
				]
			},
		],
		relatedDocs: [{"href":"/docs/api/","label":"API surface"}]
	},
	{
		slug: "doctor",
		title: "Governance Doctor",
		summary: "Run doctor reports over PluginHost probes to classify healthy / degraded / broken.",
		trackId: "support",
		prerequisites: ["plugin-host","gates"],
		goals: ["Import doctor","Produce GovernanceDoctorReport","Repair to healthy"],
		imports: ["@tmrxjd/agent-governance-system/doctor","@tmrxjd/agent-governance-system/plugin"],
		mcpTools: ["governance_toc","sentinel_status"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Doctor aggregates probe + invariant issues into a status: healthy | degraded | broken. Use before claiming a host ready; Sentinel may reflex on doctor broken.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: governance_toc, sentinel_status.",
				]
				,
				code: {
					title: "Doctor (API)",
					lang: "typescript",
					code: `import { createPluginHost } from '@tmrxjd/agent-governance-system/plugin'
import {
  runDoctorCore,
  summarizeGovernanceDoctorStatus,
} from '@tmrxjd/agent-governance-system/doctor'

const host = createPluginHost({ repoRoot })
const report = runDoctorCore(host)
console.log(report.status, report.summary)
// broken if any error-severity issues`
				}
				,
				steps: ["Load plugins","runDoctorCore","Fix error issues","Re-run until healthy","sentinel_status"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"status healthy",
					"errorCount 0",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Ignoring degraded warnings until broken",
					"Probes not registered on host",
					"Clearing sentinel without doctor repair",
				]
			},
		],
		relatedDocs: [{"href":"/docs/api/","label":"API surface"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "commit-graph",
		title: "Commit graph sidecar",
		summary: "Load and validate the commit graph that links agent SHAs, scopes, and edges.",
		trackId: "support",
		prerequisites: ["commit-checkpoint"],
		goals: ["loadCommitGraph","validateCommitGraph","Annotate after checkpoints"],
		imports: ["@tmrxjd/agent-governance-system/commit-graph"],
		mcpTools: ["commit_checkpoint","commit_get"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Commit graph JSON records nodes (SHAs, subjects, scopes) and edges. validateCommitGraph catches dangling-from, key-mismatch, and missing-sha issues. Prefer annotation via governed checkpoints — not history rewrites.",
				]
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Primary MCP tools: commit_checkpoint, commit_get.",
				]
				,
				code: {
					title: "validateCommitGraph",
					lang: "typescript",
					code: `import {
  loadCommitGraph,
  validateCommitGraph,
} from '@tmrxjd/agent-governance-system/commit-graph'

const graph = loadCommitGraph(process.env.GOVERNANCE_REPO_ROOT)
const result = validateCommitGraph(graph)
if (result.errors.length) console.error(result.issues)`
				}
				,
				steps: ["loadCommitGraph","validateCommitGraph","commit_checkpoint (annotates)","Re-validate"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"validateCommitGraph returns empty errors",
					"New checkpoint appears as node",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"dangling-from ghost edges",
					"key-mismatch node ids",
					"missing-sha on commit nodes",
					"Manual JSON edits without schema",
				]
			},
		],
		relatedDocs: [{"href":"/docs/api/","label":"API surface"},{"href":"/docs/architecture/","label":"Architecture"}]
	},
	{
		slug: "licensing-sidecars",
		title: "Package LICENSE file",
		summary: "Keep the proprietary LICENSE with distributions and align install docs with your plan.",
		trackId: "licensing",
		prerequisites: ["install-sdk"],
		goals: ["Locate the package LICENSE","Follow Install + Pricing for access","Keep LICENSE with redistributed artifacts you are allowed to ship"],
		imports: ["@tmrxjd/agent-governance-system"],
		config: ["LICENSE","package.json#license"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"The package ships a proprietary LICENSE. Install from the registry using `/docs/install-commercial/`, then unlock tiers with `AGS_LICENSE_KEY` from Pricing/Checkout. Do not strip LICENSE from any allowed redistribution.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary surfaces: LICENSE at package root, package.json license field, AGS_LICENSE_KEY for product entitlements.",
				]
				,
				code: {
					title: "package.json license field",
					lang: "json",
					code: `{
  "license": "UNLICENSED",
  "private": true
}`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Import from: @tmrxjd/agent-governance-system.",
				]
				,
				code: {
					title: "license enforce (API)",
					lang: "typescript",
					code: `import { createPluginHost } from '@tmrxjd/agent-governance-system/plugin'
import { enforceLicense } from '@tmrxjd/agent-governance-system'

const host = createPluginHost({ repoRoot })
const report = enforceLicense(host.ctx)
if (!report.ok) console.error(report.issues, report.nextActions)`
				}
				,
				steps: ["Read /docs/licensing/","Install via /docs/install-commercial/","Retain LICENSE in publish","sentinel_status / license checks"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"LICENSE present in published tarball",
					"Install docs match your plan",
					"Sentinel license reflex quiet",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Stripping LICENSE files from redistrib",
					"Sharing registry tokens outside your org",
					"Mixing license obligations across forks",
				]
			},
		],
		relatedDocs: [{"href":"/docs/licensing/","label":"Licensing"},{"href":"/docs/install-commercial/","label":"Install"},{"href":"/pricing/","label":"Pricing"},{"href":"/checkout/","label":"Checkout"}]
	},
	{
		slug: "product-licensing",
		title: "Product licensing and entitlements",
		summary: "Set AGS_LICENSE_KEY, resolve tier entitlements, and unlock efficiency/impact/delivery features.",
		trackId: "licensing",
		prerequisites: ["install-sdk"],
		goals: ["Load key at startup","Read entitlementsForTier","Match tools to free/personal/enterprise"],
		imports: ["@tmrxjd/agent-governance-system/product-licensing"],
		config: ["AGS_LICENSE_KEY"],
		sections: [
			{
				heading: "What this feature does",
				paragraphs: [
					"Product licensing maps public tiers (free, personal, student, enterprise) — plus aliased entitlement ids in the SDK — to feature flags: agent_core, repo_core, token_efficiency_*, impact_*, delivery_governance, security_governance. Hosts call startup helpers with AGS_LICENSE_KEY. Online checkout is not required to study this surface; Free defaults apply without a key.",
				]
			},
			{
				heading: "Configuration",
				paragraphs: [
					"Primary config surfaces: AGS_LICENSE_KEY.",
				]
				,
				code: {
					title: "Entitlement sketch",
					lang: "typescript",
					code: `import { entitlementsForTier } from '@tmrxjd/agent-governance-system/product-licensing'

const free = entitlementsForTier('free')
// free.features.agent_core === true
// free.features.delivery_governance === false

const personal = entitlementsForTier('personal')
// personal.features.token_efficiency_full === true
// personal.features.impact_full === true`
				}
			},
			{
				heading: "How to call it",
				paragraphs: [
					"Import from: @tmrxjd/agent-governance-system/product-licensing.",
				]
				,
				code: {
					title: "Env",
					lang: "bash",
					code: `export AGS_LICENSE_KEY=ags_live_...
# MCP host env passes the key through .mcp.json`
				}
				,
				steps: ["Complete checkout on /pricing/ or /checkout/","Export AGS_LICENSE_KEY","Restart MCP host","governance_toc → confirm entitled tools"]
			},
			{
				heading: "What success looks like",
				paragraphs: [
					"Startup reports tier",
					"efficiency_enforce / impact_* available per entitlements",
					"Missing key → free defaults",
				]
			},
			{
				heading: "Common failure modes",
				paragraphs: [
					"Expecting enterprise tools on free",
					"Key in git",
					"Host started without env passthrough",
				]
			},
		],
		relatedDocs: [{"href":"/docs/licensing/","label":"Licensing"},{"href":"/pricing/","label":"Pricing"},{"href":"/docs/configuration/","label":"Configuration"}]
	}
];

export function getTutorial(slug: string): Tutorial | undefined {
	return tutorials.find((t) => t.slug === slug);
}

export function tutorialsInTrack(trackId: string): Tutorial[] {
	return tutorials.filter((t) => t.trackId === trackId);
}
