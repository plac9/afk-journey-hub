# AFK Journey Hub - Session Handoff

**Session Date**: 2025-11-14
**Duration**: 5.0h

## Session Summary
### What Was Accomplished
- Added YAML datasets (`data/hero-tiers.yaml`, `data/event-rotations.yaml`) powering new tier badges on `/heroes`, rotation intel on `/events`, and `/heroes/[slug]` tier callouts
- Introduced Supabase-backed telemetry helper + analytics snippet: `/api/tools/*` now log usage events (gracefully no-op when env vars are blank) and Plausible loads automatically via `NEXT_PUBLIC_ANALYTICS_ID`
- Created `/api/health` along with a Dockerfile, `docker-compose.homelab.yml`, and `scripts/deploy/homelab-up.sh` to spin up a homelab preview with optional webhook notifications
- Added webhook helper `scripts/maintenance/notify-webhook.sh`, documented Docker/telemetry workflows across README + docs, and expanded Playwright coverage (new YAML data assertions + shared test helpers)
- Synced the repo to `placlair-admin@docker.home.laclair.us:~/afk-journey-hub`, generated a `.env.local` targeting `https://afk.home.laclair.us`, relaunched `docker compose -f docker-compose.homelab.yml up -d --build` with Traefik labels/external network, and added DNS so `afk.home.laclair.us` now resolves to the container over HTTPS.
- Created the first local commit (`feat: bootstrap afk journey hub`); push to `git@github.com:plac9/afk-journey-hub.git` is blocked until the remote repo exists.

### What Changed
- **Application**: Hero cards + detail pages display tier metadata, events show rotation cheat sheet, calculators emit telemetry via Supabase, `/api/health` underpins Docker health checks, and analytics snippet now renders for configured domains
- **Tooling**: Added Docker build + Compose config, homelab deploy script with webhook ping, and Playwright tests asserting YAML-driven UI
- **Documentation**: README + docs cover new data files, telemetry, `/api/health`, Docker workflows, troubleshooting for Supabase logging/Docker health, plus the new maintenance log/TODO + deployment steps for `afk.home.laclair.us`

## Current Status
### Working
✅ Repo structure, docs, `.ai/` context, automation scripts, GitHub Actions (`ci`, `content-sync`)
✅ Next.js landing + heroes/events/news/tools pages, detail routes, search filters, calculators (AFK/Dream/ARC/Pity) + telemetry logging, analytics snippet, `/api/health`, YAML promo codes/tiers/rotations, Docker homelab assets

### In Progress
🔄 Advanced calculators (ARC tiers, Dream Realm combos) and richer YAML-driven datasets (tier presets expanded this session; UI still needs richer UX + validation)
🔄 Remote (GitHub/Vercel) provisioning + Supabase project/table creation + secret wiring (`scripts/maintenance/bootstrap-supabase.sql` added; table + keys pending)
🔄 Observability add-ons (Supabase analytics dashboards, Slack/Discord notifications triggered from production deploys)
🔄 Homelab monitoring (Traefik/DNS dashboards) so `afk.home.laclair.us` stays healthy now that the route is live

### Blocked
⚠️ Contentlayer CLI prints a stack trace when run under Node 25+ (build succeeds); stick to Node 20 for clean output

## Next Session Priorities
1. Stand up GitHub remote + Vercel project, configure env vars (including Supabase + analytics + NOTIFY webhooks), and run scheduled workflows end-to-end
2. Flesh out ARC/Dream Realm calculator logic + YAML presets (extend `src/data/calculators/*` and add tests), then expose the data on `/tools`
3. Instrument telemetry dashboards/notifications (create the Supabase `calculator_usage` table via `scripts/maintenance/bootstrap-supabase.sql`, provide keys, hook Slack/Discord webhooks) and wire Supabase client-side when creds exist
4. Ensure `afk.home.laclair.us` DNS/Traefik routes to `docker.home.laclair.us:4000` so the homelab URL works externally

## Resources
- Official AFK Journey site for data validation: https://afkjourney.farlightgames.com/official/
- Use `laclair/got-legends-com` as a reference for Next.js + MDX patterns

Document progress with `pnote` during development and update this handoff before ending each session.
