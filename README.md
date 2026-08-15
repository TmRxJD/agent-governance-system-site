# Agent Governance System — public showcase

Interactive **SvelteKit** site for **Agent Governance System (AGS)**.

**No proprietary engine source** lives here — only simulations, docs, diagrams, install guides, and commerce scaffolding.

| Resource | URL |
|---|---|
| Private code | https://github.com/TmRxJD/agent-governance-system |
| Package | `@tmrxjd/agent-governance-system` on GitHub Packages |
| Live site | https://tmrxjd.github.io/agent-governance-system-site/ |

## Stack

- SvelteKit 2 + Svelte 5 + TypeScript
- Tailwind CSS 4
- D3 · Mermaid · GSAP (movie modes)
- `@sveltejs/adapter-static` → `build/`
- Commerce: Appwrite function scaffold under `appwrite/functions/ags-commerce/`

## Scripts

```bash
pnpm install
pnpm dev                 # http://localhost:5173 (BASE_PATH empty)
pnpm build               # production base: /agent-governance-system-site
pnpm preview
pnpm inventory
pnpm test:unit
pnpm test:e2e
pnpm check
```

## GitHub Pages

1. Repo Settings → Pages → Source: **GitHub Actions**.
2. Push to `master` (or run **github-pages** workflow manually).
3. Build uses `BASE_PATH=/agent-governance-system-site`.
4. Local production check: `BASE_PATH=/agent-governance-system-site pnpm build && pnpm preview`

Redirects: `/buy/` and `/get/` → `/pricing/`. Older install aliases redirect to Pricing or Install.

## Licensing & payments

- Plans: Free / Personal / Enterprise — see `/pricing/` and `/checkout/`
- Keys: signed `AGS_LICENSE_KEY` (`ags_live_1.…`) — see `src/lib/licensing/` and `docs/COMMERCE.md`
- Providers: Stripe + PayPal adapters scaffolded in the Appwrite commerce function (connect secrets to go live)

## Legacy

Prior static HTML scaffold is archived under `legacy/` for reference.
