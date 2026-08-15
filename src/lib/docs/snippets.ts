/** Shared sample configs and code for docs pages. */

export const snipVersioningYml = `schemaVersion: 1
scheme: semver
packages:
  - name: "@acme/app"
    path: packages/app/package.json
    previousVersion: "1.0.0"
bumpRules:
  file-create: minor
  module-wire: minor
  single-change: patch
  single-fix: patch
  breaking-change: major
  milestone-close: none
changelog:
  path: CHANGELOG.md`;

export const snipDeploymentYml = `schemaVersion: 1
environments:
  - id: local
    requiredChecks: []
    requiredTests: [unit]
    requiredApprovals: 0
  - id: bench
    requiredChecks: [build]
    requiredTests: [unit]
    requiredApprovals: 0
  - id: staging
    requiredChecks: [build, health]
    requiredTests: [unit, e2e]
    requiredApprovals: 1
  - id: production
    requiredChecks: [build, health]
    requiredTests: [unit, e2e]
    requiredApprovals: 1
deploymentOrder:
  - local
  - bench
  - staging
  - production
mergeTarget: main
requireBeforeMerge:
  - bench
  - staging`;

export const snipDataArraysYml = `schemaVersion: 1
arrays:
  - id: mcp-tools
    path: config/mcp-tools.json
    locator:
      jsonPath: tools
    order: alpha
    uniqueBy: "$value"
    itemKind: string
graphArtifact: docs/data-array-map/latest.json`;

export const snipCanonicalYml = `schemaVersion: 1
concepts:
  - id: versioning-config
    label: Versioning policy
    canonicalPath: .ags/versioning.yml
    kind: config
    mirrors:
      - docs/versioning/
  - id: deployment-config
    label: Deployment policy
    canonicalPath: .ags/deployment.yml
    kind: config
    mirrors:
      - docs/deployment/
graphArtifact: docs/canonical-map/latest.json`;

export const snipNpmrc = `@tmrxjd:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${AGS_NPM_TOKEN}`;

export const snipInstall = `pnpm add @tmrxjd/agent-governance-system`;

export const snipMcpPipeline = `enforcement_begin
staging_enforce
confidence_enforce
schema_enforce / pointer_enforce / semantic_enforce
performance_validate
testing_validate
sentinel_status
commit_checkpoint`;

export const snipCommitMessage = `status/checkpoint(auth-middleware): add session refresh helper

Status: checkpoint
Scope: auth-middleware
Commit-Scope: function-create
Not-done: wire helper into request pipeline
Next: module-wire for refresh on 401
Evidence: vitest packages/auth/src/session.test.ts
Token: mid
Graph-ids: none (infra)
User-approved: no
Enforcement: mcp`;

export const snipValidateCommit = `import { validateAgentCommitMessage } from '@tmrxjd/agent-governance-system/commit-msg';

const result = validateAgentCommitMessage(message);
if (!result.ok) {
  console.error(result.errors);
  process.exit(1);
}`;

export const snipCommitCheckpoint = `// MCP tool: commit_checkpoint
{
  "message": "status/checkpoint(staging): classify auth diff\\n\\n…trailers…",
  "files": ["src/auth/session.ts", "src/auth/session.test.ts"],
  "dryRun": false
}`;

export const snipCapAuthorize = `// MCP tool: commit_authorize
{ "state": "on", "note": "feature work session" }

// Read current CAP
{}`;

export const snipStagingClassify = `// MCP tool: staging_classify
{
  "paths": ["src/auth/session.ts", "src/auth/session.test.ts"]
}
// → Commit-Scope suggestion: function-create | single-change | module-wire`;

export const snipArrayEnforce = `// MCP tool: array_enforce
{ "arrayId": "mcp-tools" }

// MCP tool: array_plan_normalize
{ "arrayId": "mcp-tools" }`;

export const snipCanonEnforce = `// MCP tool: canon_enforce
{}

// MCP tool: canon_drift
{}

// MCP tool: canon_plan_fix
{ "conceptId": "versioning-config" }`;

export const snipTestingPlan = `// MCP tool: testing_plan
{
  "paths": ["packages/app/src/auth/session.ts"]
}
// → suiteIds + vitestPaths the agent must run before commit

// MCP tool: testing_validate
{}`;

export const snipPointerMap = `# Example pointer home map (conceptual)
site:        src/routes/
docs:        docs/
assets:      static/
components:  src/lib/components/
routes:      src/routes/

# pointer_enforce fails when docs claim a path that no longer exists,
# or when a governed file has no declared home.`;

export const snipSemanticDomains = `# Core semantic domains agents reason about
staging | semantic | pointer | sentinel
versioning | deployment | canonical | data-array
efficiency | impact | policy | health`;

export const snipPackageExports = `import {
  /* root plugins + TOC */
} from '@tmrxjd/agent-governance-system';

import { validateAgentCommitMessage } from '@tmrxjd/agent-governance-system/commit-msg';
import { /* CAP helpers */ } from '@tmrxjd/agent-governance-system/commit-cap';
import { /* confidence */ } from '@tmrxjd/agent-governance-system/confidence';
import { /* gates */ } from '@tmrxjd/agent-governance-system/gates';
import { /* product keys */ } from '@tmrxjd/agent-governance-system/product-licensing';`;

export const snipHooksWire = `# .githooks/commit-msg (sketch)
#!/usr/bin/env node
import { validateAgentCommitMessage } from '@tmrxjd/agent-governance-system/commit-msg';
import { readFileSync } from 'node:fs';

const msg = readFileSync(process.argv[2], 'utf8');
const result = validateAgentCommitMessage(msg);
if (!result.ok) {
  console.error(result.errors.join('\\n'));
  process.exit(1);
}`;

export const snipMcpJson = `{
  "mcpServers": {
    "ags-gov": {
      "command": "node",
      "args": ["./node_modules/@tmrxjd/agent-governance-system/…/mcp-host.mjs"],
      "env": {
        "AGS_LICENSE_KEY": "\${AGS_LICENSE_KEY}"
      }
    }
  }
}`;
