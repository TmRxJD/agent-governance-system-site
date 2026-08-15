# Commerce & license keys (operator guide)

Public site is static (GitHub Pages). **Payments and key issuance run in Appwrite**, not in SvelteKit.

## Architecture

```
Pricing / Checkout (site)
    → POST PUBLIC_AGS_COMMERCE_URL/checkout
        → Stripe Checkout Session or PayPal Subscription
Webhook (provider)
    → POST …/webhook/stripe|paypal  (signature verified)
        → sign ags_live_1.* key
        → store keyHash in ags_licenses
        → email key once (Resend)
Account (site)
    → /status · /lookup · /portal (Stripe Customer Portal)
SDK / MCP host
    → POST …/authorize { licenseKey }
```

| Area | Path |
|------|------|
| Catalog | `src/lib/licensing/catalog.ts` |
| Key crypto | `src/lib/licensing/key-crypto.ts` |
| Site client | `src/lib/licensing/client.ts` |
| Function | `appwrite/functions/ags-commerce/` |
| Collections | `appwrite/collections/ags-commerce.md` |

## Function modules

- `stripe.js` — Checkout Sessions, webhook `constructEvent`, Billing Portal
- `paypal.js` — Subscriptions create + webhook signature verify
- `email.js` — Resend delivery (`RESEND_API_KEY`)
- `keys.js` / `db.js` / `catalog.js`

## Site env

```bash
PUBLIC_APPWRITE_ENDPOINT=https://appwrite.athyen.pl/v1
PUBLIC_APPWRITE_PROJECT_ID=68190de700097b8f59df
PUBLIC_AGS_COMMERCE_FUNCTION_ID=ags-commerce
PUBLIC_AGS_PAYMENT_PROVIDER=stripe
# Optional custom domain instead of Appwrite executions:
# PUBLIC_AGS_COMMERCE_URL=https://…
```

The static site calls the function via **guest Appwrite executions** (`execute: any`) — no API key in the browser.
## Function env (minimum to go live)

```bash
LICENSE_SIGNING_SECRET=...
APPWRITE_ENDPOINT=...
APPWRITE_PROJECT_ID=...
APPWRITE_API_KEY=...
APPWRITE_DATABASE_ID=ags_commerce
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PERSONAL_MONTHLY=price_...
STRIPE_PRICE_PERSONAL_YEARLY=price_...
STRIPE_PRICE_ENTERPRISE_SEAT_MONTHLY=price_...
# …one STRIPE_PRICE_<PLANID> per catalog SKU
RESEND_API_KEY=re_...
LICENSE_EMAIL_FROM="AGS Licenses <licenses@yourdomain>"
COMMERCE_ADMIN_TOKEN=...   # /issue and /revoke
AUTHORIZE_REQUIRE_DB=1     # harden authorize
```

Re-run additive provisioner anytime (never deletes):

```bash
node scripts/provision-ags-commerce-db.mjs
```

Deploy / update the function (create-only vars; never deletes):

```bash
node scripts/deploy-ags-commerce.mjs
```

Logo: `static/media/ags-logo.png` (transparent; nav, favicon, default OG).

PayPal alternate:

```bash
DEFAULT_PAYMENT_PROVIDER=paypal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_WEBHOOK_ID=...
PAYPAL_PLAN_PERSONAL_MONTHLY=P-...
```

## Activate & students

- Site: `/activate/?t=…` (setup token) or `/activate/?k=…` (one-shot key)
- Students: `/students/` — GitHub Student Developer Pack (primary) or `.edu` magic link
- Checkout student SKUs require `studentProof` from verification
- Email includes activate URL + paste-to-AI prompt (no env-hunting instructions as primary path)

Env extras for student OAuth:

```bash
GITHUB_OAUTH_CLIENT_ID=…
GITHUB_OAUTH_CLIENT_SECRET=…
GITHUB_OAUTH_REDIRECT_URI=https://…/students/?provider=github
PUBLIC_SITE_ORIGIN=https://tmrxjd.github.io/agent-governance-system-site
RESEND_API_KEY=…   # edu magic links + license email
```

## Connect checklist

1. Create Appwrite DB + collections (`node scripts/provision-ags-commerce-db.mjs`).
2. Deploy function (`node scripts/deploy-ags-commerce.mjs`).
3. Create Stripe Prices matching catalog amounts; map env names.
4. Point Stripe webhook to `/webhook/stripe` for `checkout.session.completed`.
5. Set site `PUBLIC_APPWRITE_*` (Pages workflow already includes defaults).
6. Optional: `GITHUB_OAUTH_*` + Resend for student verify + email.
7. Smoke: Checkout → pay test card → email → `/activate/` → paste prompt → agent says AGS ready.
