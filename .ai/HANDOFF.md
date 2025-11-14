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

## Pre-Push Checklist

Before pushing to GitHub remote and deploying to Vercel, verify the following:

### Local Repository Status
- [ ] All work committed locally (3 commits: a16cc26, 74ace89, bd28faf + new docs)
- [ ] Working tree clean (`git status` shows no unstaged changes)
- [ ] All documentation files up to date (.ai/, docs/, README.md)
- [ ] .env.example contains all required variables
- [ ] .gitignore excludes sensitive files (.env.local, .vercel, etc.)

### Code Quality
- [ ] Linter passing: `npm run lint`
- [ ] Type check passing: `npm run typecheck`
- [ ] Build succeeds: `npm run build`
- [ ] Content builds: `npm run content:lint`
- [ ] All tests pass: `npm run test:e2e` (with PLAYWRIGHT_BASE_URL set)

### Documentation Complete
- [ ] README.md accurately describes the project
- [ ] docs/GITHUB_SETUP.md provides step-by-step remote setup instructions
- [ ] scripts/maintenance/bootstrap-supabase.sql exists and is valid SQL
- [ ] All .ai/ context files updated (SESSION_CONTEXT.md, HANDOFF.md, CHANGELOG.md)
- [ ] docs/maintenance/TODO.md lists current outstanding tasks
- [ ] SETUP_GUIDE.md at repo root provides quick start reference

### Configuration Files Ready
- [ ] package.json has correct name, version, scripts
- [ ] next.config.ts configured correctly
- [ ] contentlayer.config.ts defines all document types
- [ ] docker-compose.homelab.yml has correct Traefik labels
- [ ] Dockerfile builds successfully
- [ ] GitHub Actions workflows (ci.yml, content-sync.yml) are valid

### Homelab Deployment Verified
- [ ] https://afk.home.laclair.us is accessible
- [ ] /api/health returns 200 OK
- [ ] Key pages load (/, /heroes, /events, /news, /tools)
- [ ] Docker container health checks passing
- [ ] Traefik routing working
- [ ] DNS resolution correct (afk.home.laclair.us → 10.0.44.246)

### Ready for GitHub Push
- [ ] GitHub repo name confirmed: plac9/afk-journey-hub
- [ ] SSH key for GitHub configured and tested
- [ ] Remote URL ready: git@github.com:plac9/afk-journey-hub.git
- [ ] No sensitive data in commit history
- [ ] All binary files necessary (no oversized assets)

### Ready for Vercel Deployment
- [ ] Vercel CLI installed (`vercel --version`)
- [ ] Vercel account linked to GitHub
- [ ] Environment variables documented in docs/CONFIGURATION.md
- [ ] Custom domain planned: afk.laclair.us (optional)
- [ ] Node 20.x specified for builds

### Ready for Supabase Setup
- [ ] scripts/maintenance/bootstrap-supabase.sql verified
- [ ] Supabase account accessible
- [ ] Project name decided: afk-journey-hub
- [ ] Region selected (closest to users)
- [ ] Database password generated

### Post-Push Next Steps
1. Create GitHub repository (see docs/GITHUB_SETUP.md Step 1)
2. Push all commits: `git push -u origin main`
3. Configure repository settings (Step 2)
4. Link to Vercel (Step 3)
5. Set environment variables (Step 4)
6. Create Supabase project and run bootstrap SQL (Step 5)
7. Verify GitHub Actions (Step 6)
8. Configure DNS if using custom domain (Step 7)
9. Run post-deployment verification (Step 8)
10. Update documentation with production URLs (Step 9)

### Emergency Rollback Plan
If deployment fails:
1. Homelab preview remains available at https://afk.home.laclair.us
2. Local development environment still functional
3. Can iterate and re-push as needed
4. No data loss - everything version controlled

---

Document progress with `pnote` during development and update this handoff before ending each session.
