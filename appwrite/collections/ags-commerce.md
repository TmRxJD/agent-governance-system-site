# Appwrite collections — AGS commerce

Database id: **`ags_commerce`** (created in Appwrite project `68190de700097b8f59df`; additive-only provisioner: `scripts/provision-ags-commerce-db.mjs`).

## `ags_customers`

Document id = sanitized email (or generated).

| Attribute | Type | Notes |
|-----------|------|-------|
| email | string | lowercase |
| displayName | string | optional |
| stripeCustomerId | string | optional — Billing Portal |
| paypalPayerId | string | optional |
| createdAt | string (ISO) | |
| updatedAt | string (ISO) | |

Indexes: `email`, `stripeCustomerId`.

## `ags_licenses`

Document id = `keyId` (`lic_…`).

| Attribute | Type | Notes |
|-----------|------|-------|
| keyId | string | same as `$id` |
| keyHash | string | SHA-256 hex of full key |
| customerId | string | email or customer `$id` |
| email | string | |
| tier | enum | `free` \| `personal` \| `enterprise` |
| planId | string | catalog id |
| status | enum | `active` \| `past_due` \| `canceled` \| `revoked` \| `expired` |
| seats | integer | |
| cadence | string | `monthly` \| `yearly` \| `lifetime` |
| provider | string | `stripe` \| `paypal` \| `manual` |
| providerSubscriptionId | string | optional |
| providerCheckoutId | string | optional |
| periodStart | string | optional ISO |
| periodEnd | string | optional ISO |
| issuedAt | string | ISO |
| revokedAt | string | optional |
| lastAuthorizedAt | string | optional |

Indexes: `keyHash`, `email`, `status`, `providerSubscriptionId`.

## `ags_orders`

| Attribute | Type | Notes |
|-----------|------|-------|
| email | string | |
| customerId | string | optional |
| planId | string | |
| tier | string | |
| cadence | string | |
| seats | integer | |
| amountCents | integer | |
| currency | string | `usd` |
| status | enum | `created` \| `awaiting_payment` \| `paid` \| `fulfilled` \| `failed` \| `refunded` |
| provider | string | |
| providerSessionId | string | optional |
| licenseKeyId | string | optional after fulfill |
| createdAt / updatedAt | string | ISO |

## Security

- Never store the raw `AGS_LICENSE_KEY` after issue (except AES-GCM in `ags_setup_tokens`).
- Authorize updates `lastAuthorizedAt` only.
- Revoke by setting `status=revoked` (signature alone is insufficient when `AUTHORIZE_REQUIRE_DB=1`).
- Student SKUs require signed `studentProof` (GitHub Student Pack or confirmed academic email).

## Activate / student APIs

| Route | Purpose |
|-------|---------|
| POST `/setup-token/redeem` | Redeem activate token → license + agent prompt |
| POST `/student/github/start` | OAuth URL for Student Pack |
| POST `/student/github/complete` | Exchange code → studentProof |
| POST `/student/edu/request` | Magic link to academic email |
| POST `/student/edu/confirm` | Confirm magic link → studentProof |
| POST `/student/proof/check` | Validate browser-held proof |
