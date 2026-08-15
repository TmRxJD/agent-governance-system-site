# Agent Governance System — public showcase

Interactive **SvelteKit** site for **Agent Governance System (AGS)**.

**No proprietary engine source** lives here — only simulations, docs, diagrams, and install/licensing guides.

| Resource | URL |
|---|---|
| Private code | https://github.com/TmRxJD/agent-governance-system |
| Package | `@tmrxjd/agent-governance-system` on GitHub Packages |
| Pages | GitHub Pages (`/agent-governance-system-site`) |

## Stack

- SvelteKit 2 + Svelte 5 + TypeScript
- Tailwind CSS 4
- D3 · Mermaid · GSAP (movie modes)
- `@sveltejs/adapter-static` → `build/`

## Scripts

```bash
pnpm install
pnpm dev
pnpm build          # BASE_PATH defaults for project Pages
pnpm inventory      # source inventory gate
pnpm inventory:build
pnpm test:unit
pnpm test:e2e
pnpm check
```

## Dual licensing (summary)

- **Commercial** — paid license for commercial/production use
- **Tower Community** — free, non-commercial, Tower-only

See `/licensing`, `/buy`, `/get`.

## Legacy

Prior static HTML scaffold is archived under `legacy/` for reference and will be removed after Pages cutover verification.
