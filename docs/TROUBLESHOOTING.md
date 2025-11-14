# AFK Journey Hub - TROUBLESHOOTING

**Last Updated**: 2025-11-13

## Common Issues

### 1. `npm run dev` fails because Contentlayer cannot find `content/`
**Symptoms**: Console shows `ENOENT: no such file or directory, open content/heroes/*.mdx`
**Fix**:
1. Run `mkdir -p content/heroes content/events content/news`
2. Add at least one sample MDX file following `docs/guides/content-modeling.md`
3. Re-run `npm run dev`

### 2. Contentlayer schema errors during build
**Symptoms**: `ValidationError: Required field 'rarity' missing` when importing hero files.
**Fix**:
- Run `npm run content:lint` (planned) to list offending files
- Ensure frontmatter matches the schema; use VS Code snippets to avoid typos

### 3. Preview deployment missing environment variables
**Symptoms**: Vercel preview renders fallback UI for countdowns or promo codes.
**Fix**:
1. Check Vercel Project Settings → Environment Variables
2. Add required keys from `docs/CONFIGURATION.md`
3. Trigger redeploy from the Vercel UI or push an empty commit

### 4. Cached data appears stale after release
**Symptoms**: Production still shows previous events even after merging updates.
**Fix**:
1. Confirm `npm run content:sync` ran and committed new JSON/MDX
2. Clear Cloudflare/Vercel cache (Dashboard → Cache → Purge Everything)
3. If using ISR, hit the `/api/revalidate` endpoint (planned) with the shared secret

### 5. Contentlayer CLI throws `ERR_INVALID_ARG_TYPE`
**Symptoms**: After `contentlayer build`, Node prints `TypeError: The "code" argument must be of type number. Received an instance of Object`.
**Fix**:
1. Use Node 20.x (LTS) via `nvm use 20`; the bug shows up on Node 22+/25.
2. The build still succeeds, but downgrading silences the stack trace.

### 6. Playwright tests exit immediately
**Symptoms**: `npm run test:e2e` fails with a message asking you to set `PLAYWRIGHT_BASE_URL`.
**Fix**:
1. Start the dev server separately: `npm run dev`
2. Run `PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e`
3. Alternatively, deploy to Vercel and point the base URL to the preview environment

### 7. Supabase connection errors (future)
**Symptoms**: `Error: fetch failed` for personalization features.
**Fix**:
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Ensure Row Level Security policies allow the desired access pattern
- Check Supabase status page for outages

### 8. `/api/health` fails inside Docker
**Symptoms**: `docker compose` marks the container as unhealthy and restarts it repeatedly.
**Fix**:
1. Ensure the container can reach port 3000 locally. Run `docker logs afk-journey-hub` for stack traces.
2. Confirm `npm run build` completed during the Docker image build (run `./scripts/deploy/homelab-up.sh` again to force a rebuild).
3. If Supabase or analytics env vars are missing, the endpoint still returns `status: ok`, so investigate missing MDX/content instead.

### 9. Calculator APIs log Supabase errors
**Symptoms**: `/api/tools/*` responses succeed but server logs show `[telemetry] failed to log calculator usage`.
**Fix**:
1. Supply `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (local `.env` or Vercel env settings).
2. Create a `calculator_usage` table with `tool text`, `params jsonb`, `result jsonb`, `created_at timestamptz default now()` in Supabase.
3. If you don’t want telemetry yet, leave the env vars unset and the logger will no-op.

Log newly discovered issues here with clear reproduction steps and fixes.
