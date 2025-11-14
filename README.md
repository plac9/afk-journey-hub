# AFK Journey Hub

Community-first knowledge base and event tracker for Farlight's **AFK Journey**. This LaClair web project curates hero builds, patch intelligence, and daily checklists into a single responsive experience designed for phones and tablets.

## Why It Exists
- Centralize evergreen data (heroes, gear, arcane cards) with consistent formatting
- Surface live operations (events, banners, codes) with reminders and notifications
- Offer calculators for AFK timers, gacha pity, and dream realm scoring so players can make fast decisions when not in-game

## Planned Tech Stack
- **Framework**: Next.js 15 (App Router) with React 19 + TypeScript
- **Styling/UI**: Tailwind CSS, Radix UI primitives, Framer Motion for hero spotlights
- **Content**: MDX + Contentlayer over Markdown/YAML stored in `content/`
- **State/Data**: TanStack Query backed by JSON exports and optional community GraphQL endpoint
- **Infrastructure**: Vercel for hosting, optional Cloudflare cache + Supabase for persistent user preferences later on

## Project Status
| Area | State |
| --- | --- |
| Repository hygiene | ✅ Standard template applied |
| Documentation | ✅ Context, configuration, deployment, and content modeling guides authored |
| Application code | ✅ Next.js 16 + Tailwind 4 scaffolded with landing + heroes/events/news/tools routes |
| Data model | ✅ Hero, event, and news schemas + sample MDX content committed |
| Automation | ✅ Scripts + GitHub Actions CI + scheduled content sync |

## Quick Start
```bash
# First time
scripts/dev/bootstrap.sh

# Development
npm run dev

# End-to-end smoke test (requires PLAYWRIGHT_BASE_URL=http://localhost:3000)
PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e

# Homelab preview (Docker)
./scripts/deploy/homelab-up.sh
```
The dev server hydrates the Contentlayer-fed landing page that showcases hero spotlights, upcoming events, and patch intel sourced from `content/`. The always-on homelab build lives at **https://afk.home.laclair.us** (Traefik on `docker.home.laclair.us` proxies the container on port 4000) for fast internal reviews.

### Automation
- `npm run content:sync` → pulls official news/codes locally and refreshes `data/imports/latest-*.json`
- `.github/workflows/ci.yml` → lint/typecheck/build on push/PR
- `.github/workflows/content-sync.yml` → scheduled sync every 12h that uploads JSON snapshots; use `scripts/maintenance/prepare-sync-commit.sh` to stage local snapshots
- `npm run test:e2e` → Playwright smoke tests (requires `PLAYWRIGHT_BASE_URL` pointing to a running dev server)
- `scripts/deploy/homelab-up.sh` → builds the Docker image and (optionally) pings `NOTIFY_WEBHOOK_URL` after refreshing the self-hosted instance

## Routes & Documentation Map
- `/` – hero spotlight + events + news highlights
- `/heroes` – faction-filtered encyclopedia sourced from Contentlayer (+ `/heroes/[slug]`) with YAML-driven tier badge highlights
- `/events` – countdown-ready event cards (+ `/events/[slug]`) plus rotation intel from `data/event-rotations.yaml`
- `/news` – patch notes + promo code summaries (+ `/news/[slug]`)
- `/tools` – AFK timer, Dream Realm, and Pity calculators (plus `/api/tools/*`)
- `/api/health` – health endpoint used by Docker health checks + monitors

### Docs
- `docs/GETTING_STARTED.md` – environment expectations and bootstrap plan
- `docs/CONFIGURATION.md` – required env vars (API keys, analytics, preview tokens)
- `docs/DEPLOYMENT.md` – Vercel deployment and smoke-test checklist
- `docs/API.md` – planned ingest sources (official news RSS, manual JSON)
- `docs/TROUBLESHOOTING.md` – known blockers for early builds
- `.ai/SESSION_CONTEXT.md` – living status brief (use `pcontext`)
- `docs/REMOTE_SETUP.md` – GitHub/Vercel linking checklist once you’re ready to publish
- `data/promo-codes.yaml` – editable list of active promo codes shown on `/news`
- `data/hero-tiers.yaml` / `data/event-rotations.yaml` – tier lists and cadence metadata powering `/heroes` + `/events`

### Remote Setup
Create the upstream repo + Vercel project when ready:
```bash
git remote add origin git@github.com:plac9/afk-journey-hub.git
git push -u origin main
vercel link  # once the Vercel project exists
```
Update `.env.local` with production keys, then mirror them inside the Vercel dashboard. CI workflows live under `.github/workflows/` (`ci.yml`, `content-sync.yml`).

## Roadmap Highlights
1. Expand hero/event detail routes plus calculator-specific APIs (in progress on `/heroes/[slug]`, `/events/[slug]`)
2. Build filter/search utilities + YAML-driven data extensions
3. Ship live event tracker with timezone-aware countdown widgets
4. Layer in calculators (AFK timer, dream realm, pity) and embed strategy articles
5. Instrument analytics + SEO metadata, then deploy to Vercel w/ Cloudflare cache

## Contributing Notes
- Always start sessions with `pcontext` inside the repo and log progress via `pnote`
- Keep docs, scripts, and releases structured per `.portfolio/CONVENTIONS.md`
- Use Conventional Commits with the LaClair doc blurb when touching documentation-only PRs
- Validate new code paths with `npm run check && npm run build`; capture coverage expectations in `docs/TESTING.md` once automated tests land

Questions, blockers, or suggestions? Capture them in `.ai/HANDOFF.md` before closing a session so the next teammate can act immediately.
