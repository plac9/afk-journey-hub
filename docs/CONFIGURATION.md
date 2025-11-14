# AFK Journey Hub - CONFIGURATION

**Status**: Draft complete
**Last Updated**: 2025-11-13

## Environment Files
1. Duplicate `.env.example` → `.env.local`
2. Provide defaults for developer machines; production secrets live in Vercel project settings
3. Never commit `.env.local` or any secret rotation notes
4. `scripts/dev/bootstrap.sh` will create `.env.local` automatically if it does not exist

## Variables
| Name | Scope | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | all | Canonical site URL used for SEO + OG tags |
| `NEXT_PUBLIC_ANALYTICS_ID` | all | Plausible/GA4 site identifier (optional) |
| `AFK_OFFICIAL_FEED_URL` | server | Official AFK Journey news RSS (`https://afkjourney.farlightgames.com/api/news`) |
| `AFK_CODES_SOURCE_URL` | server | Source for promo codes JSON or spreadsheet export |
| `SUPABASE_URL` | server | Provisioned later if persistent user data is needed |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Secure key stored only in Vercel/1Password, never locally unless testing protected endpoints |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client | Public key for Supabase client-side features |
| `SENTRY_DSN` | server | Error tracking (optional, but add before launch) |
| `ALGOLIA_APP_ID` / `ALGOLIA_ADMIN_KEY` | build | Search index push (optional future improvement) |
| `NOTIFY_WEBHOOK_URL` | server | Optional Slack/Discord webhook for deploy/content notifications |

`scripts/maintenance/sync-official.sh` uses `AFK_OFFICIAL_FEED_URL` and `AFK_CODES_SOURCE_URL` to write JSON snapshots into `data/imports/`.

## Data Sources
- `data/promo-codes.yaml` – canonical list of active promo codes (rendered on `/news` and reused by automation). Update this file when new codes drop.
- `data/hero-tiers.yaml` – YAML tier rankings surfaced on `/heroes`
- `data/event-rotations.yaml` – cadence metadata powering `/events`
- `src/data/calculators/*` – calculator presets (AFK timers, Dream Realm, ARC, Pity); edit these files to tweak requirements.

## Configuration Layers
1. **Local Dev (`.env.local`)** – minimal variables required to run Next.js + Contentlayer
2. **Preview** – Vercel preview envs, no production secrets; uses read-only tokens
3. **Production** – Includes analytics + Supabase credentials and is rotated regularly

## Secret Management
- Use 1Password vault `LaClair/Web` to store API keys and tokens
- Access to Supabase or analytics should be granted via shared vault entries, not direct copy/paste in docs
- Document rotations inside `docs/maintenance/YYYY-MM-DD-secret-rotation.md`
- `src/components/AnalyticsSnippet.tsx` injects analytics when `NEXT_PUBLIC_ANALYTICS_ID` is set, while `src/lib/integrations/supabase.ts` + `src/lib/integrations/telemetry.ts` handle Supabase logging—keep them in sync

## Feature Flags (planned)
| Flag | Default | Purpose |
| --- | --- | --- |
| `feature.calculators` | false | Enables AFK timers + dream realm calculators once validated |
| `feature.eventCountdowns` | true | Toggles event countdown widgets (requires accurate timezone metadata) |
| `feature.codeRedemption` | false | Shows promo code redemption instructions once automation is stable |

## GitHub & Vercel Setup
1. Create the GitHub repo (`git remote add origin git@github.com:plac9/afk-journey-hub.git`)
2. Push `main`, then create the Vercel project and link it locally with `vercel link`
3. Mirror `.env.local` secrets into the Vercel dashboard and enable the `content-sync` + `ci` workflows

## Telemetry & Notifications
- `src/lib/integrations/telemetry.ts` logs calculator usage events to the Supabase table `calculator_usage` (columns: `tool text`, `params jsonb`, `result jsonb`, `created_at timestamptz`).
- Leave Supabase env vars blank if you prefer to disable telemetry; the helper will no-op.
- `scripts/maintenance/bootstrap-supabase.sql` provisions the telemetry table; run it once per Supabase project.
- `scripts/maintenance/notify-webhook.sh` posts JSON payloads to `NOTIFY_WEBHOOK_URL` and is invoked after homelab deploys.

Update this document whenever new integrations are introduced.
