# AFK Journey Hub – TODO

## ✅ Completed

### GitHub Repository & CI/CD
- ✅ Create GitHub repository at `git@github.com:plac9/afk-journey-hub.git` (PUBLIC)
- ✅ Push all commits to main branch
- ✅ Add GitHub community standards (LICENSE, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT)
- ✅ Configure issue and PR templates
- ✅ Set up CODEOWNERS and Dependabot
- ✅ Enable GitHub Actions with write permissions
- ✅ Fix CI workflow (all jobs passing: lint, typecheck, build, e2e)
- ✅ Add status badges to README
- ✅ Configure repository topics and settings

### Homelab Deployment
- ✅ Deploy to homelab at https://afk.home.laclair.us
- ✅ Configure Docker + Traefik routing
- ✅ Set up DNS for afk.home.laclair.us

## 🟡 In Progress / Pending

### 1. Vercel Deployment
- [ ] Run `vercel login` to authenticate Vercel CLI
- [ ] Link repository to Vercel (`vercel link` or via web UI)
- [ ] Set minimum environment variable: `NEXT_PUBLIC_SITE_URL`
- [ ] Deploy to production (`vercel --prod`)
- [ ] Verify all routes work in production
- [ ] Optional: Configure custom domain (afk.laclair.us)
- [ ] Optional: Set up Plausible analytics (`NEXT_PUBLIC_ANALYTICS_ID`)

**Reference**: See `docs/GITHUB_SETUP.md` Step 3-4 for detailed instructions

### 2. Supabase Telemetry
- [ ] Create Supabase project at https://supabase.com/dashboard
- [ ] Run `scripts/maintenance/bootstrap-supabase.sql` in Supabase SQL Editor
- [ ] Copy credentials from Project Settings > API:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Add credentials to `.env.local` for local testing
- [ ] Add credentials to Vercel environment variables
- [ ] Verify `/api/tools/*` endpoints log calculator usage to `calculator_usage` table
- [ ] Test telemetry with production calculator usage

**Reference**: See `docs/GITHUB_SETUP.md` Step 5 and `scripts/maintenance/bootstrap-supabase.sql`

### 3. Content Expansion
- [ ] Add more hero guides (currently have Rowan and Mirael)
- [ ] Expand event documentation and strategies
- [ ] Add team composition guides
- [ ] Keep promo codes updated in `data/promo-codes.yaml`
- [ ] Regular patch note summaries

### 4. Advanced Features
- [ ] Enhance ARC tier calculator logic
- [ ] Add Dream Realm boss-specific strategies
- [ ] Implement search indexing (Algolia - optional)
- [ ] Add user accounts for saved builds (future)
- [ ] Community submissions system (future)

### 5. Observability / Notifications
- [ ] Configure `NOTIFY_WEBHOOK_URL` (Slack/Discord) for deployment notifications
- [ ] Set up uptime monitoring for production site
- [ ] Configure error tracking (Sentry - optional, credentials needed)
- [ ] Hook Traefik/log monitors for `afk.home.laclair.us` health visibility
- [ ] Expand Playwright coverage for calculator edge cases
- [ ] Set up Supabase analytics dashboards for calculator usage

### 6. Performance & Optimization
- [ ] Optimize images with next/image
- [ ] Implement Cloudflare caching rules
- [ ] Add service worker for offline support (optional)
- [ ] Performance testing and optimization

## 📋 Quick Commands

```bash
# Vercel deployment
vercel login
vercel --prod

# Check CI status
gh run list --limit 5
gh run watch

# Update local development
git pull origin main
npm install
npm run dev

# Test production build locally
npm run build
npm run start
```

## 📚 Documentation References

- **GitHub Setup**: `docs/GITHUB_SETUP.md` (complete step-by-step guide)
- **Deployment**: `docs/DEPLOYMENT.md` (deployment checklist)
- **Configuration**: `docs/CONFIGURATION.md` (environment variables)
- **Latest Status**: `.ai/SESSION_CONTEXT.md` (use `pcontext` command)
- **Session Notes**: `.ai/HANDOFF.md`

---

**Last Updated**: 2025-11-14 23:30
**Status**: Production-ready, awaiting Vercel deployment
