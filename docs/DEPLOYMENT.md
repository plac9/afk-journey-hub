# AFK Journey Hub - DEPLOYMENT

**Status**: Draft complete
**Last Updated**: 2025-11-13

## Hosting Strategy
- **Primary**: Vercel (Next.js first-class support, preview deployments per PR)
- **Caching**: Cloudflare in front of the production domain for global latency + custom rules
- **Monitoring**: Vercel Analytics, optional Sentry for errors, Cron monitors for data-sync scripts

## Branching Model
| Branch | Purpose | Deployment |
| --- | --- | --- |
| `main` | Production-ready | Auto deploy to Vercel production |
| `preview/*` or feature branches | Active development | Auto deploy to Vercel preview URLs |

## Deployment Checklist
1. `npm run lint && npm test && npm run build`
2. `npm run content:sync` (if data sources changed) and commit updated JSON/MDX
   - Use `scripts/maintenance/prepare-sync-commit.sh` to stage `data/imports/` quickly after running the sync
3. Update `.ai/HANDOFF.md` with release context
4. Push to GitHub; verify Vercel build + preview logs
5. Promote preview → production (merge or trigger deploy)
6. Run smoke tests:
   - Home page loads < 2s on 3G throttle
   - `/heroes`, `/events`, `/tools` render without hydration warnings
   - Countdown timers show correct timezone offsets
   - Promo codes list matches official feed
7. Invalidate Cloudflare cache (API or dashboard) if assets changed
8. (Optional) `./scripts/deploy/homelab-up.sh` to refresh the on-prem Docker preview and ping `NOTIFY_WEBHOOK_URL`

`scripts/deploy/deploy.sh [preview|production]` wraps steps 1–5 locally and optionally calls the Vercel CLI (if installed).

## Rollback Plan
1. Use Vercel UI to redeploy the last good build
2. Rollback associated Contentlayer data by reverting the commit
3. If Supabase migrations are in play, run `scripts/maintenance/rollback.sh <migration>` (planned)

## Secrets & Access
- Configure env vars via Vercel Project Settings → Environment Variables
- Cloudflare + Supabase credentials stored in 1Password; never commit tokens
- Document new integrations in `docs/CONFIGURATION.md`

## Automation Roadmap
- `ci.yml` runs lint/typecheck/content validation + build on every push/PR, then executes Playwright smoke tests against a local dev server (via `wait-on`)
- `content-sync.yml` runs `scripts/maintenance/sync-official.sh` every 12 hours, auto-commits `data/imports` changes (using `scripts/maintenance/prepare-sync-commit.sh` + git-auto-commit), and uploads the JSON as a build artifact
- Slack/Discord webhook notifications when production deploys complete (future)
- `docker-compose.homelab.yml` maintains the homelab preview with health checks hitting `/api/health`

## Homelab Preview
Use the included Docker assets to run a long-lived preview inside the lab network:
1. Ensure Docker Engine + Compose v2 are available on the target host.
2. Copy `.env.local` (minus secrets you don’t want on-prem) and fill analytics/Supabase keys as needed.
3. Run `./scripts/deploy/homelab-up.sh` from the repo root. The script:
   - Builds the production image via `Dockerfile`
   - Applies `docker-compose.homelab.yml` (maps port 4000 → 3000)
   - Triggers `/api/health` for health checks
   - Sends a webhook if `NOTIFY_WEBHOOK_URL` points at Slack/Discord
4. Browse `http://<homelab-host>:4000` to validate the deployed bundle.
5. If you want the friendly DNS (`afk.home.laclair.us`), route that host through Traefik/NGINX to `docker.home.laclair.us:4000` so the portal is reachable across the lab network.
6. Verify Traefik by running `curl -k -I https://afk.home.laclair.us` and confirming an HTTP 200 response.

Re-run the script anytime content or code changes land; Compose handles rolling the container.

Add detailed steps and commands here once the CI/CD automation is in place.
