# AFK Journey Hub – TODO

1. **Supabase telemetry**
   - Run `scripts/maintenance/bootstrap-supabase.sql` in the Supabase project
   - Capture `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Populate `.env.local` + Vercel with those values and verify `/api/tools/*` logs rows

2. **Remote plumbing**
   - Commit/push `main` to `git@github.com:plac9/afk-journey-hub.git` (local commit exists; GitHub repo still needs to be created)
   - Link the repo to Vercel (`vercel link`) and mirror prod/staging env vars
   - Enable GitHub Actions (`ci.yml`, `content-sync.yml`) with write permissions

3. **Observability / Notifications**
   - Configure `NOTIFY_WEBHOOK_URL` (Slack/Discord) for homelab deploy pings
   - Hook Traefik/log monitors so `afk.home.laclair.us` health is visible
   - Expand Playwright coverage for calculators once Supabase telemetry is live
