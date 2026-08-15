# AGS commerce function (Appwrite)

HTTP function for checkout, webhooks, license issue/authorize, account lookup, and Stripe portal.

## Routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | Health |
| POST | `/checkout` | Stripe Session or PayPal Subscription |
| POST | `/webhook/stripe` | Verify sig → issue key → email |
| POST | `/webhook/paypal` | Verify sig → issue key → email |
| POST | `/authorize` | HMAC + DB status → entitlements |
| POST | `/status` | Public-safe license status |
| POST | `/lookup` | Licenses by email |
| POST | `/portal` | Stripe Customer Portal URL |
| POST | `/issue` | Admin issue (`x-ags-admin-token`) |
| POST | `/revoke` | Admin revoke |

## Modules

`catalog.js` · `keys.js` · `db.js` · `email.js` · `stripe.js` · `paypal.js` · `main.js`

See repo `docs/COMMERCE.md` for full env + connect checklist.
