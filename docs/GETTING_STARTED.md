# AFK Journey Hub - GETTING_STARTED

**Status**: Ready
**Last Updated**: 2025-11-13

## 1. Prerequisites
| Tool | Version | Notes |
| --- | --- | --- |
| Node.js | 20.x LTS | Use `nvm` or `fnm` to pin; aligns with Vercel runtime |
| npm | 10+ | Bundled with Node 20 | 
| pnpm (optional) | 9+ | Preferred for workspaces once monorepo grows |
| Git | Latest stable | Required for hooks + CI |
| Vercel CLI | Latest | Enables local previews + deployment verification |

## 2. Repo Setup
```bash
cd ~/dev/laclair
# already created locally; clone once GitHub remote exists
git clone git@github.com:plac9/afk-journey-hub.git
cd afk-journey-hub
pcontext
# add the remote later if you started locally
git remote add origin git@github.com:plac9/afk-journey-hub.git
```

## 3. Bootstrap Application Code
`scripts/dev/bootstrap.sh` installs dependencies, creates required directories, copies `.env.example` → `.env.local`, and runs `contentlayer build` so `contentlayer/generated` exists.

```bash
nvm use 20
scripts/dev/bootstrap.sh
npm run dev
```
Visit `http://localhost:3000` to see the hero/event/news dashboard rendered from the MDX files under `content/`. Additional routes already available:
- `/heroes` – faction-filtered encyclopedia (`/heroes/[slug]` for detail views)
- `/events` – countdown-ready tracker (`/events/[slug]`) plus YAML rotation intel
- `/news` – patch + promo updates (detail routes planned next)
- `/tools` – AFK timer and Dream Realm calculator scaffolds + API endpoints
- `/api/health` – JSON health endpoint for Docker + monitors

Hero tiers and event cadence data now live in `data/hero-tiers.yaml` and `data/event-rotations.yaml`. Update those files whenever the meta shifts; the `/heroes` and `/events` routes read them directly without additional wiring.

## 4. Environment Files
1. Copy `.env.example` to `.env.local`
2. Fill in values detailed in `docs/CONFIGURATION.md`
3. Never commit `.env.local`

## 5. Recommended Workflow
1. `pcontext` to read current status
2. `npm run dev` for live preview
3. Update docs/content and log progress with `pnote "message"`
4. Before stopping, run `npm run check && npm run build`, update `.ai/HANDOFF.md`, and `ptouch`

## 6. Helpful Commands
| Command | Purpose |
| --- | --- |
| `npm run dev` | Runs `contentlayer dev` + Next dev server |
| `npm run check` | Lint → type-check → Contentlayer data validation |
| `npm run content:lint` | Runs `contentlayer build` (useful for CI) |
| `npm run content:sync` | Invokes `scripts/maintenance/sync-official.sh` |
| `npm run test:e2e` | Runs Playwright smoke tests (set `PLAYWRIGHT_BASE_URL` to a running dev server before executing) |
| `scripts/troubleshoot/diagnose.sh` | Collects env + build info for debugging |
| `scripts/deploy/homelab-up.sh` | Builds the Docker image + restarts the local homelab container (optional webhook ping) |

Document any deviations or new onboarding steps in this file whenever tooling changes.
