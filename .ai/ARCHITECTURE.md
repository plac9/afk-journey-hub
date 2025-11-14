# AFK Journey Hub - Architecture

**Last Updated**: 2025-11-13
**Version**: v0.1.0

## System Overview
### High-Level Architecture
1. **Next.js Web App** (`src/app/`): Server Components delivering statically-generated hero/event list + detail pages with per-route metadata.
2. **Content Pipeline** (`content/` + Contentlayer config): MDX/YAML files compiled into typed JSON at build time, fueling lists, filters, and calculators.
3. **Data Sync Jobs** (`scripts/maintenance/` + GitHub Actions): Optional scheduled tasks that fetch official patch notes, redemption codes, and event timers, storing normalized JSON under `data/imports/`.
4. **Deployment Edge**: Vercel builds triggered from GitHub, cached globally with Cloudflare or Vercel Edge Network. Preview deployments map to feature branches.

### Design Principles
1. **Content-first**: All critical data must reside in versioned Markdown/JSON for easy review and rollback.
2. **Mobile-priority**: Layouts, interactions, and image weights optimized for small screens because AFK Journey players primarily browse guides on phones.
3. **Automation-ready**: Scripts for syncing official news/codes should be idempotent and runnable locally or via CI, minimizing manual edits.

## Components
### Web Application
- **Purpose**: Render hero encyclopedia, events tracker, calculators, and news feed
- **Location**: `src/app/`
- **Technology**: Next.js 16, React Server Components, Tailwind CSS v4, Radix UI, Framer Motion
- **UI Components**: `src/components/*` exports hero/event/news cards reused by landing + section routes

### Contentlayer Config
- **Purpose**: Transform MDX under `content/` into typed data for the web app
- **Location**: `contentlayer.config.ts`
- **Technology**: Contentlayer + remark-gfm + rehype-slug

### Data Sync Scripts
- **Purpose**: Pull official RSS/news/patch data, normalize hero stats, and keep redemption codes fresh
- **Location**: `scripts/maintenance/` + GitHub Actions workflows (planned)
- **Technology**: Bash/Node scripts with `curl` today, move to scheduled GitHub Actions later
- **Data Utilities**: `src/data/calculators/*` + `src/lib/calculators/*` provide shared calculator logic for AFK timers + Dream Realm scoring

## Technology Decisions
### Decision 1: Next.js + App Router
- **Date**: 2025-11-13
- **Rationale**: Provides automatic image optimization, streaming server components, SEO metadata, and built-in Vercel deployment path
- **Trade-offs**: Requires familiarity with RSC constraints; SSR/resume boundaries must be managed carefully for calculators

### Decision 2: MDX + Contentlayer for Source of Truth
- **Date**: 2025-11-13
- **Rationale**: Contributors can open PRs to edit hero/event Markdown; Contentlayer delivers typed data and catches schema regressions
- **Trade-offs**: Build time scales with number of files; no real-time editing without additional CMS

### Decision 3: Optional Supabase for Persistence
- **Date**: 2025-11-13
- **Rationale**: Future feature to store personalized teams or loadouts; Supabase offers quick Postgres + auth without heavy ops
- **Trade-offs**: Adds an external dependency and secrets management; not required for MVP

## Future Architecture
### Planned Changes
- [ ] Build dynamic hero/event/news detail pages (currently list-only)
- [ ] Implement Contentlayer-driven calculators + YAML-backed data utilities beyond AFK/Dream Realm
- [ ] Add calculators powered by shared `packages/calc` utilities

### Technical Debt
- [ ] No CI pipeline defined yet (needs GitHub Actions for lint/test/build)
- [ ] Scripts only cover local automation; scheduler + Supabase integration missing
- [ ] Homepage + list routes use sample data until official feeds or Supabase sync land

For operational/deployment procedures, refer to `docs/DEPLOYMENT.md`.
