# Remote Setup (GitHub + Vercel)

Use this checklist when you are ready to publish the project.

1. **Create GitHub repo**
   ```bash
   git remote add origin git@github.com:plac9/afk-journey-hub.git
   git push -u origin main
   ```
2. **Create Vercel project**
   ```bash
   vercel link  # associate local folder with the new project
   vercel env pull .env.local  # optional, keeps env files in sync
   ```
3. **Configure environment variables** (Vercel dashboard → Settings → Environment Variables)
   - `NEXT_PUBLIC_SITE_URL` (production URL)
   - `NEXT_PUBLIC_ANALYTICS_ID`
   - `AFK_OFFICIAL_FEED_URL`
   - `AFK_CODES_SOURCE_URL`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SENTRY_DSN` / `ALGOLIA_*` (when applicable)
4. **Enable GitHub Actions**
   - `ci.yml` requires `contents: write` (default) to upload artifacts.
   - `content-sync.yml` auto-commits `data/imports/`; grant workflow permission to write (Settings → Actions → General → Workflow permissions → “Read and write”).
5. **Secrets for Actions**
   - If `content-sync` should push tags/branches, add a fine-grained PAT or enable GitHub’s default GITHUB_TOKEN write access.
6. **Optional notifications**
   - Add Slack/Discord webhooks via Vercel integrations once production deploys start.

Once configured, `npm run content:sync` locally then `scripts/maintenance/prepare-sync-commit.sh` to stage imported feeds, and rely on the scheduled workflow to keep JSON snapshots up to date.
