# AFK Journey Hub - Session Context

**Last Updated**: 2025-11-14 18:20
**Status**: Development
**Version**: v0.2.0

## Quick Status
- **Current Phase**: Content/data enrichment + deployment automation
- **Active Work**: YAML-driven hero tiers + event cadence, Supabase telemetry hooks, analytics, Docker homelab packaging, and test coverage
- **Blockers**: `contentlayer build` prints a harmless Node 25 stack trace—use Node 20 to silence it
- **Next Steps**: Flesh out advanced calculators/search, provision GitHub/Vercel/Supabase resources (see `docs/maintenance/TODO.md`), and keep the homelab preview monitored

## Project Overview
### Purpose
AFK Journey Hub will provide a mobile-friendly strategy site for the AFK Journey community, aggregating hero guides, live event timelines, calculator tools, and patch intelligence sourced from https://afkjourney.farlightgames.com/official/ and curated notes from the LaClair team.

### Technology Stack
- **Language**: TypeScript
- **Framework**: Next.js 16 (App Router) with React 19 + Contentlayer (MDX)
- **Styling**: Tailwind CSS v4, Radix UI (planned), Framer Motion for hero spotlights
- **Data**: Markdown/MDX stored in `content/`, optional Supabase for persistent player preferences later
- **Infrastructure**: Vercel (primary) with Cloudflare CDN cache; GitHub Actions for CI

### Repository Info
- **GitHub**: https://github.com/plac9/afk-journey-hub (to be created)
- **Brand**: LaClair Technologies

## Current State
### What's Working
- Portfolio-standard repo structure with `.ai/`, `docs/`, `scripts/`, and `releases/`
- Next.js 16 + Tailwind 4 landing page plus `/heroes`, `/events`, `/news`, `/tools`, `/heroes/[slug]`, `/events/[slug]`, `/news/[slug]`
- Search/filter UX on heroes/events/news pages, calculator forms (AFK, Dream Realm, ARC, Pity), API routes for `/api/tools/*`, promo codes, hero tiers (`data/hero-tiers.yaml`), and event rotations (`data/event-rotations.yaml`)
- Supabase-backed telemetry helper logs calculator usage (no-op when env vars unset), analytics snippet auto-injects Plausible, `/api/health` exposes status for Docker health checks
- Documentation now covers Docker homelab workflow, health endpoint, YAML data model, and webhook notifications; Playwright suite asserts hero tier + event rotation rendering
- Automation scripts + GitHub Actions (`ci` runs Playwright + uploads artifacts, `content-sync` auto-commits JSON snapshots) ready for remotes; `scripts/deploy/homelab-up.sh` refreshes the self-hosted instance + optional webhook
- Homelab deployment is live behind Traefik with DNS (`https://afk.home.laclair.us`) for internal testing

### Known Issues
- [ ] Advanced calculators (ARC tiers, Dream Realm combos) + richer YAML data still pending
- [ ] Deployment credentials/env vars not provisioned for GitHub/Vercel/Supabase; Supabase table `calculator_usage` must be created before telemetry stores rows
- [ ] Docker homelab assumes `docker compose` v2 and a host capable of running Node 20-alpine images

### Recent Changes
- **2025-11-14**: Added hero tier + event rotation YAML datasets surfaced on `/heroes` + `/events`, analytics snippet, Supabase telemetry helper logging calculator usage, `/api/health`, Dockerfile + `docker-compose.homelab.yml`, webhook notifier, and additional Playwright coverage for YAML-driven views

## Key Files & Locations
- `.ai/SESSION_CONTEXT.md` – living project status (use `pcontext`)
- `.ai/ARCHITECTURE.md` – high-level system design & rationale
- `.ai/HANDOFF.md` – running session notes for agents
- `docs/README.md` – documentation index and links
- `docs/guides/content-modeling.md` – hero/event content schema definitions
- `content/` – MDX source for heroes/events/news featured on the landing page, list routes, and `[slug]` detail pages
- `src/lib/calculators/*` & `src/data/calculators/*` – AFK timer + Dream Realm calculator scaffolds powering `/tools` + `/api/tools/*`
- `.github/workflows/ci.yml` – GitHub Actions pipeline for lint/typecheck/build
- `.github/workflows/content-sync.yml` – Scheduled job running `scripts/maintenance/sync-official.sh`

## Development Workflow
### Setup (First Time)
```bash
nvm install 20 && nvm use 20
scripts/dev/bootstrap.sh
cp .env.example .env.local && fill secrets
npm run dev
```

### Common Tasks (planned)
```bash
npm run dev             # Contentlayer watcher + Next dev server
npm run check           # ESLint, type-checking, content validation
npm run build           # Production bundle for Vercel
npm run content:lint    # Validate MDX/content output only
npm run content:sync    # Pull official news/codes into data files
```

## Deployment
### Environments
- **Development**: Local Next.js dev server
- **Preview**: Vercel preview deployments on pull requests
- **Production**: Vercel production branch (`main`) -> optional Cloudflare cache warm

### Release Checklist (planned)
1. `npm run check && npm run build`
2. `npm run content:sync` if feeds changed
3. Tag release (`vX.Y.Z`) and push; Vercel auto-deploys main
4. Warm Cloudflare cache + smoke test key pages/event countdowns

## Resources
- **Official Game Site**: https://afkjourney.farlightgames.com/official/
- **Community Feeds**: Official Discord announcements, Reddit `/r/AFK_Journey`, and in-game events
- **Comparable Projects**: `laclair/got-legends-com` for Next.js patterns, `laclair/patrick-laclair-me` for Vercel workflows

Keep this file updated every session so agents understand current priorities and blockers.
