# AFK Journey Hub - Session Context

**Last Updated**: 2025-11-14 23:30
**Status**: Production-Ready
**Version**: v0.2.0

## Quick Status
- **Current Phase**: Production-ready, CI passing, awaiting Vercel deployment
- **Active Work**: Vercel deployment setup, Supabase integration for telemetry, content expansion
- **Blockers**: None - all CI checks passing, repository fully configured
- **Next Steps**: Deploy to Vercel production, provision Supabase project, expand hero/event content

## Project Overview
### Purpose
AFK Journey Hub provides a mobile-friendly strategy site for the AFK Journey community, aggregating hero guides, live event timelines, calculator tools, and patch intelligence sourced from https://afkjourney.farlightgames.com/official/ and curated notes from the LaClair team.

### Technology Stack
- **Language**: TypeScript
- **Framework**: Next.js 16 (App Router) with React 19 + Contentlayer (MDX)
- **Styling**: Tailwind CSS v4, Radix UI (planned), Framer Motion for hero spotlights
- **Data**: Markdown/MDX stored in `content/`, optional Supabase for persistent player preferences later
- **Infrastructure**: Vercel (primary) with Cloudflare CDN cache; GitHub Actions for CI

### Repository Info
- **GitHub**: https://github.com/plac9/afk-journey-hub ✅ **PUBLIC**
- **Homelab**: https://afk.home.laclair.us ✅ **LIVE**
- **Production**: (pending Vercel deployment)
- **Brand**: LaClair Technologies

## Current State
### What's Working
- ✅ Portfolio-standard repo structure with `.ai/`, `docs/`, `scripts/`, and `releases/`
- ✅ Next.js 16 + Tailwind 4 landing page plus `/heroes`, `/events`, `/news`, `/tools`, `/heroes/[slug]`, `/events/[slug]`, `/news/[slug]`
- ✅ Search/filter UX on heroes/events/news pages, calculator forms (AFK, Dream Realm, ARC, Pity), API routes for `/api/tools/*`, promo codes, hero tiers (`data/hero-tiers.yaml`), and event rotations (`data/event-rotations.yaml`)
- ✅ Supabase-backed telemetry helper logs calculator usage (no-op when env vars unset), analytics snippet auto-injects Plausible, `/api/health` exposes status for Docker health checks
- ✅ Documentation now covers Docker homelab workflow, health endpoint, YAML data model, and webhook notifications; Playwright suite asserts hero tier + event rotation rendering
- ✅ GitHub Actions (`ci` ✅ PASSING: lint, typecheck, build, e2e tests, `content-sync` auto-commits JSON snapshots every 12h)
- ✅ GitHub repository created and public at https://github.com/plac9/afk-journey-hub
- ✅ Complete GitHub community standards (LICENSE, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, issue/PR templates, CODEOWNERS, Dependabot)
- ✅ Enhanced CI workflow with concurrency controls, minimal permissions, separate jobs, artifacts, summary reporting
- ✅ All ESLint errors resolved, TypeScript compilation passing
- ✅ Contentlayer type generation integrated into CI workflow
- ✅ Optimized for Vercel deployment with `.vercelignore`
- ✅ Homelab deployment live behind Traefik with DNS (`https://afk.home.laclair.us`) for internal testing
- ✅ Dependabot automated dependency updates enabled and creating PRs

### Known Issues
- [ ] Advanced calculators (ARC tiers, Dream Realm combos) + richer YAML data still pending
- [ ] Vercel deployment not yet configured (ready to deploy)
- [ ] Supabase project not yet created; `calculator_usage` table must be created via `scripts/maintenance/bootstrap-supabase.sql` before telemetry stores rows

### Recent Changes
- **2025-11-14 (Evening)**: Fixed CI workflow by adding Contentlayer type generation before typecheck, resolved all ESLint errors (Supabase type definitions), updated ESLint config to ignore `.github/` directory, created `.vercelignore` for optimized Vercel deployments, all CI jobs now passing
- **2025-11-14 (Afternoon)**: Added complete GitHub community standards (LICENSE, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, bug report/feature request templates, PR template, CODEOWNERS, Dependabot config), enhanced CI workflow with concurrency controls and permissions, added status badges to README
- **2025-11-14 (Midday)**: Created public GitHub repository at https://github.com/plac9/afk-journey-hub, configured homelab deployment with Docker + Traefik, set up DNS routing for afk.home.laclair.us
- **2025-11-14 (Morning)**: Added hero tier + event rotation YAML datasets surfaced on `/heroes` + `/events`, analytics snippet, Supabase telemetry helper logging calculator usage, `/api/health`, Dockerfile + `docker-compose.homelab.yml`, webhook notifier, and additional Playwright coverage for YAML-driven views

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
