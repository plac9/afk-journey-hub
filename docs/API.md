# AFK Journey Hub - API & Data Sources

**Status**: Draft
**Last Updated**: 2025-11-13

The site will primarily consume content stored in-repo, but several enrichments pull from external feeds.

## Internal Data Contracts
- `contentlayer.config.ts` defines Zod schemas for heroes, teams, events, news, and promo codes
- Build output saved under `.contentlayer/generated/` feeds the Next.js app
- Calculators read JSON stored in `data/` (e.g., hero stats, pity tables)
- `/heroes` and `/events` enrich MDX content with YAML stored in `data/hero-tiers.yaml` + `data/event-rotations.yaml`

## External Sources (Read-Only)
| Source | Endpoint | Usage | Notes |
| --- | --- | --- | --- |
| Official news RSS | `https://afkjourney.farlightgames.com/api/news` | Patch notes + announcements | Rate limit manually; cache results |
| Promo codes tracker | Manual Google Sheet / API TBD | Redeemable codes list | Until an official endpoint exists, store exports in `data/imports/` |
| Community tier data | Future community GraphQL endpoint | Reference data for hero rankings | Optional cross-check, not canonical |

## Planned API Surface (Internal)
Although MVP is static, we plan to expose lightweight JSON endpoints generated via Next.js Route Handlers:
| Route | Description |
| --- | --- |
| `/api/events/upcoming` | Returns normalized event metadata for countdown widgets |
| `/api/codes` | Promo codes with expiry + redemption steps |
| `/api/tools/afk` | Returns preset AFK timer configurations from `src/data/calculators/afkTimerPresets.ts` |
| `/api/tools/dream-realm` | Exposes boss thresholds defined in `src/data/calculators/dreamRealmBosses.ts` |
| `/api/tools/pity` | Evaluates remaining pulls before soft/guaranteed pity using `src/data/calculators/pityThresholds.ts` |
| `/api/health` | Lightweight JSON heartbeat used by Docker/monitoring |

Example:
```bash
curl \"https://afkjourney.laclair.dev/api/tools/afk?hours=8&preset=dream\"
```

All internal endpoints will be statically generated or cached via ISR with a generous revalidation window (e.g., 15 minutes) because the underlying data changes slowly.

`scripts/maintenance/sync-official.sh` uses the configured feed URLs to write raw JSON snapshots under `data/imports/` so PRs capture the exact payloads that powered a release.

## Security Considerations
- Do **not** proxy authenticated player APIs; all data is public and curated manually
- If Supabase features ship later, restrict keys to Row Level Security policies and never expose service-role keys client-side
- Use rate limiting middleware for any future write endpoints

Document new API integrations or schema changes here whenever they are introduced.
