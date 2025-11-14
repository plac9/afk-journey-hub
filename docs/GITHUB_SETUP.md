# GitHub Repository Setup Guide

This document provides step-by-step instructions for creating the remote GitHub repository and completing the deployment pipeline.

## Prerequisites

- GitHub account with access to `plac9` organization
- GitHub CLI (`gh`) installed and authenticated
- Git SSH key configured for GitHub
- Vercel CLI installed (`npm i -g vercel`)
- Vercel account linked to GitHub

## Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)

```bash
cd /Users/patricklaclair/dev/laclair/afk-journey-hub

# Create the repository
gh repo create plac9/afk-journey-hub \
  --public \
  --description "Community knowledge base and event tracker for AFK Journey" \
  --homepage "https://afk.laclair.us"

# Add the remote
git remote add origin git@github.com:plac9/afk-journey-hub.git

# Push all commits
git push -u origin main

# Verify
gh repo view plac9/afk-journey-hub
```

### Option B: Using GitHub Web UI

1. Go to https://github.com/organizations/plac9/repositories/new
2. Repository name: `afk-journey-hub`
3. Description: `Community knowledge base and event tracker for AFK Journey`
4. Visibility: Public
5. Do NOT initialize with README, .gitignore, or license
6. Click "Create repository"
7. Add remote and push:

```bash
cd /Users/patricklaclair/dev/laclair/afk-journey-hub
git remote add origin git@github.com:plac9/afk-journey-hub.git
git push -u origin main
```

## Step 2: Configure Repository Settings

### Branch Protection

```bash
# Protect main branch
gh api repos/plac9/afk-journey-hub/branches/main/protection \
  --method PUT \
  --field required_status_checks[strict]=true \
  --field required_status_checks[contexts][]=ci \
  --field enforce_admins=false \
  --field required_pull_request_reviews[required_approving_review_count]=0 \
  --field required_pull_request_reviews[dismiss_stale_reviews]=true
```

Or via web UI:
1. Go to Settings > Branches
2. Add branch protection rule for `main`
3. Enable "Require status checks to pass before merging"
4. Select `ci` check
5. Enable "Require branches to be up to date before merging"

### GitHub Actions Permissions

1. Go to Settings > Actions > General
2. Workflow permissions: "Read and write permissions"
3. Enable "Allow GitHub Actions to create and approve pull requests"
4. Save

### Topics (Tags)

```bash
gh repo edit plac9/afk-journey-hub \
  --add-topic afk-journey \
  --add-topic game-guide \
  --add-topic nextjs \
  --add-topic community
```

Or via web UI: Settings > Topics

## Step 3: Link to Vercel

### Using Vercel CLI

```bash
cd /Users/patricklaclair/dev/laclair/afk-journey-hub

# Link to Vercel (creates new project or links existing)
vercel link

# When prompted:
# - Set up and deploy? Y
# - Which scope? (Select your account/org)
# - Link to existing project? N (create new)
# - Project name: afk-journey-hub
# - Directory: ./ (press Enter)

# Deploy to production
vercel --prod

# Get project ID
vercel inspect
```

### Configure Vercel Project Settings

Via web UI (https://vercel.com/dashboard):

1. Go to Project Settings
2. **General**:
   - Framework Preset: Next.js
   - Node Version: 20.x
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Git**:
   - Connect to `plac9/afk-journey-hub`
   - Production Branch: `main`
   - Enable auto-deploy for main

4. **Domains**:
   - Add custom domain: `afk.laclair.us`
   - Configure DNS per Vercel instructions

## Step 4: Configure Environment Variables

### Vercel Environment Variables

Add via CLI:

```bash
# Production + Preview environments
vercel env add NEXT_PUBLIC_SITE_URL production
# Enter: https://afk.laclair.us

vercel env add NEXT_PUBLIC_ANALYTICS_ID production
# Enter: your-plausible-id (or leave blank)

vercel env add AFK_OFFICIAL_FEED_URL production
# Enter: https://afkjourney.farlightgames.com/api/news

vercel env add AFK_CODES_SOURCE_URL production
# Enter: your-codes-source-url (or leave blank)

# Add Supabase credentials (after Step 5)
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Optional: Notifications
vercel env add NOTIFY_WEBHOOK_URL production
# Enter: your-slack-or-discord-webhook-url
```

Or via web UI: Project Settings > Environment Variables

**Required Variables**:
- `NEXT_PUBLIC_SITE_URL` - Production URL
- `AFK_OFFICIAL_FEED_URL` - Official news feed

**Recommended Variables**:
- `NEXT_PUBLIC_ANALYTICS_ID` - Plausible analytics
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase admin key
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase public key

**Optional Variables**:
- `AFK_CODES_SOURCE_URL` - Promo codes source
- `NOTIFY_WEBHOOK_URL` - Webhook for notifications
- `SENTRY_DSN` - Error tracking
- `ALGOLIA_APP_ID` / `ALGOLIA_ADMIN_KEY` - Search

## Step 5: Set Up Supabase

### Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name: `afk-journey-hub`
4. Database Password: (generate strong password)
5. Region: (choose nearest to users)
6. Plan: Free tier is sufficient to start
7. Wait for provisioning (~2 minutes)

### Run Bootstrap SQL

1. Go to SQL Editor in Supabase dashboard
2. Click "New Query"
3. Paste contents of `scripts/maintenance/bootstrap-supabase.sql`
4. Click "Run"
5. Verify table created: Go to Table Editor, see `calculator_usage`

### Get Credentials

1. Go to Project Settings > API
2. Copy the following:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (click "Reveal")

3. Add to local `.env.local`:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Add same variables to Vercel (see Step 4)

### Verify Telemetry

```bash
# Start local dev server
npm run dev

# Test calculator endpoint
curl -X POST http://localhost:3000/api/tools/afk \
  -H "Content-Type: application/json" \
  -d '{"idleHours": 8, "stage": 12}'

# Check Supabase Table Editor
# Go to calculator_usage table, verify row inserted
```

## Step 6: Verify GitHub Actions

### Trigger CI Workflow

```bash
# Make a small change
echo "# Test" >> README.md
git add README.md
git commit -m "test: verify CI workflow"
git push origin main
```

### Check Workflow Status

```bash
gh run list --limit 5
gh run view  # shows latest run
gh run watch  # watch in real-time
```

Or via web UI: Actions tab on GitHub

### Verify Content Sync Workflow

The content-sync workflow runs every 12 hours automatically. To test manually:

```bash
gh workflow run content-sync.yml
gh run list --workflow=content-sync.yml
```

Or via web UI: Actions > content-sync > Run workflow

## Step 7: Configure DNS (Optional)

If using custom domain `afk.laclair.us`:

### Cloudflare DNS

1. Go to Cloudflare dashboard
2. Select domain `laclair.us`
3. DNS > Records > Add record
4. Type: `CNAME`
5. Name: `afk`
6. Target: `cname.vercel-dns.com`
7. Proxy status: Proxied (orange cloud)
8. Save

### Verify DNS Propagation

```bash
dig afk.laclair.us CNAME
nslookup afk.laclair.us
```

### Add Domain in Vercel

1. Go to Vercel Project > Settings > Domains
2. Add `afk.laclair.us`
3. Wait for verification (~1-2 minutes)
4. Should show "Valid Configuration"

## Step 8: Post-Deployment Verification

### Smoke Tests

```bash
# Health check
curl https://afk.laclair.us/api/health

# Homepage
curl -I https://afk.laclair.us

# Heroes page
curl -I https://afk.laclair.us/heroes

# Events page
curl -I https://afk.laclair.us/events

# News page
curl -I https://afk.laclair.us/news

# Tools page
curl -I https://afk.laclair.us/tools
```

All should return `HTTP/2 200`.

### Run E2E Tests Against Production

```bash
PLAYWRIGHT_BASE_URL=https://afk.laclair.us npm run test:e2e
```

### Check Analytics

If Plausible configured:
1. Go to your Plausible dashboard
2. Verify events appearing for afk.laclair.us
3. Test: Visit https://afk.laclair.us, wait 1 minute, check dashboard

### Check Telemetry

If Supabase configured:
1. Use a calculator tool on production site
2. Go to Supabase Table Editor > calculator_usage
3. Verify row inserted with correct data

## Step 9: Update Documentation

After successful deployment:

```bash
cd /Users/patricklaclair/dev/laclair/afk-journey-hub

# Update .ai/SESSION_CONTEXT.md
# - Change status to "Production deployed"
# - Update URLs to production
# - Note deployment date

# Update .ai/HANDOFF.md
# - Record deployment completion
# - List any outstanding issues
# - Document next priorities

# Update .ai/CHANGELOG.md
# Add entry:
# [2025-11-XX] - Production Deployment
# - Created GitHub repository plac9/afk-journey-hub
# - Deployed to Vercel at afk.laclair.us
# - Configured Supabase telemetry
# - Enabled GitHub Actions CI/CD

# Commit updates
git add .ai/
git commit -m "docs: record production deployment"
git push origin main
```

## Troubleshooting

### Issue: Git Push Fails with Authentication Error

**Solution**: Ensure SSH key is added to GitHub account

```bash
ssh -T git@github.com
# Should see: "Hi plac9! You've successfully authenticated"

# If fails, check/add SSH key:
cat ~/.ssh/id_ed25519.pub
# Copy output, add at https://github.com/settings/keys
```

### Issue: Vercel Build Fails

**Common causes**:
1. Missing environment variables
2. Node version mismatch
3. Contentlayer errors

**Solution**:
```bash
# Check Vercel build logs
vercel logs

# Verify environment variables set
vercel env ls

# Test build locally with production env
vercel env pull .env.production
npm run build
```

### Issue: GitHub Actions Fail

**Solution**: Check workflow logs

```bash
gh run view --log-failed

# Common fixes:
# 1. Ensure Actions have write permissions (Step 2)
# 2. Check Node version in ci.yml matches package.json
# 3. Verify npm install succeeds
```

### Issue: Supabase Connection Fails

**Solution**: Verify credentials

```bash
# Test connection
node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
supabase.from('calculator_usage').select('count').then(console.log);
"
```

### Issue: Content Sync Workflow Not Running

**Solution**: Check permissions and schedule

```bash
# Verify workflow exists
gh workflow list

# Check recent runs
gh run list --workflow=content-sync.yml

# Trigger manually
gh workflow run content-sync.yml
```

## Quick Reference Commands

```bash
# Repository status
gh repo view plac9/afk-journey-hub

# Recent deployments
vercel ls afk-journey-hub

# Recent workflow runs
gh run list --limit 10

# Production logs
vercel logs --follow

# Project info
vercel inspect https://afk.laclair.us

# Environment variables
vercel env ls
```

## Checklist

Use this checklist to ensure nothing is missed:

- [ ] GitHub repository created at plac9/afk-journey-hub
- [ ] All commits pushed to main branch
- [ ] Branch protection enabled
- [ ] GitHub Actions permissions configured
- [ ] Vercel project linked
- [ ] Production deployment successful
- [ ] All environment variables set in Vercel
- [ ] Custom domain configured (if applicable)
- [ ] Supabase project created
- [ ] Bootstrap SQL executed
- [ ] Supabase credentials added to Vercel
- [ ] CI workflow passing
- [ ] Content sync workflow tested
- [ ] Smoke tests passing
- [ ] Analytics configured (if applicable)
- [ ] Telemetry verified
- [ ] Documentation updated (.ai/SESSION_CONTEXT.md, HANDOFF.md, CHANGELOG.md)

## Next Steps After Setup

Once remote setup is complete:

1. **Content Enrichment**:
   - Add more hero guides (expand beyond Rowan/Mirael)
   - Document event strategies
   - Add team composition guides
   - Expand news coverage

2. **Calculator Enhancement**:
   - Flesh out ARC tier calculator logic
   - Add Dream Realm boss-specific strategies
   - Implement wish list optimizer
   - Add gear recommendation calculator

3. **Feature Development**:
   - User accounts (save favorites, builds)
   - Community submissions
   - Build sharing
   - Interactive tier list maker

4. **Observability**:
   - Set up Sentry for error tracking
   - Configure webhook notifications for deployments
   - Add uptime monitoring
   - Expand Playwright test coverage

5. **Performance Optimization**:
   - Add Algolia search
   - Implement Cloudflare caching
   - Optimize images with next/image
   - Add service worker for offline support

## Support

- **Documentation**: See `docs/` directory
- **Issues**: https://github.com/plac9/afk-journey-hub/issues (after repo created)
- **Discussions**: https://github.com/plac9/afk-journey-hub/discussions
- **Maintainer**: Patrick LaClair

---

**Document Version**: 1.0
**Last Updated**: 2025-11-14
**Status**: Ready for execution
