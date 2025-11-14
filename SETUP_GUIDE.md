# AFK Journey Hub - Quick Setup Guide

**Repository Status**: Ready for GitHub push
**Local Commits**: 3 commits ready (a16cc26, 74ace89, bd28faf)
**Homelab Preview**: https://afk.home.laclair.us (LIVE)
**Version**: 0.2.0

---

## 🚀 Quick Start (5 Minutes)

### 1. Create GitHub Repository

```bash
cd /Users/patricklaclair/dev/laclair/afk-journey-hub

# Create repo via GitHub CLI
gh repo create plac9/afk-journey-hub \
  --public \
  --description "Community knowledge base and event tracker for AFK Journey" \
  --homepage "https://afk.laclair.us"

# Add remote and push
git remote add origin git@github.com:plac9/afk-journey-hub.git
git push -u origin main

# Verify
gh repo view plac9/afk-journey-hub --web
```

### 2. Deploy to Vercel

```bash
# Link to Vercel
vercel link

# Deploy to production
vercel --prod

# Get URL
vercel inspect
```

### 3. Configure Environment Variables

**Required in Vercel**:
```bash
vercel env add NEXT_PUBLIC_SITE_URL production
# Enter: https://afk.laclair.us

vercel env add AFK_OFFICIAL_FEED_URL production
# Enter: https://afkjourney.farlightgames.com/api/news
```

**Optional (for full features)**:
```bash
vercel env add NEXT_PUBLIC_ANALYTICS_ID production
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

### 4. Set Up Supabase (Optional - for telemetry)

1. Create project at https://supabase.com/dashboard
2. Go to SQL Editor > New Query
3. Paste contents of `scripts/maintenance/bootstrap-supabase.sql`
4. Run query
5. Copy credentials from Project Settings > API
6. Add to Vercel env vars (see step 3)

### 5. Verify Deployment

```bash
# Check health
curl https://afk.laclair.us/api/health

# Run smoke tests
PLAYWRIGHT_BASE_URL=https://afk.laclair.us npm run test:e2e
```

---

## 📁 Repository Overview

### What This Is

A **Next.js 16** community hub for AFK Journey providing:
- Hero encyclopedia with tier rankings
- Event tracker with countdowns
- News and promo codes
- Calculator tools (AFK Timer, Dream Realm, Pity, ARC)

### Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Content**: Contentlayer (MDX + YAML)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (optional, for telemetry)
- **Hosting**: Vercel + Cloudflare CDN
- **CI/CD**: GitHub Actions

### Key Files

```
afk-journey-hub/
├── SETUP_GUIDE.md              ← You are here
├── README.md                    ← Project overview
├── docs/
│   ├── GITHUB_SETUP.md         ← Detailed setup instructions
│   ├── GETTING_STARTED.md      ← Local development guide
│   ├── DEPLOYMENT.md           ← Deployment procedures
│   └── CONFIGURATION.md        ← Environment variables reference
├── .ai/
│   ├── SESSION_CONTEXT.md      ← Current project status
│   ├── HANDOFF.md              ← Session handoff with Pre-Push Checklist
│   └── CHANGELOG.md            ← Project changelog
├── scripts/maintenance/
│   └── bootstrap-supabase.sql  ← Database initialization
└── src/app/                    ← Next.js application code
```

---

## ✅ Pre-Push Verification

Before pushing to GitHub, verify:

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] `git status` shows clean working tree
- [ ] All documentation up to date
- [ ] Homelab preview working (https://afk.home.laclair.us)

**Full checklist**: See `.ai/HANDOFF.md` → Pre-Push Checklist

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview and features |
| `docs/GITHUB_SETUP.md` | Complete GitHub/Vercel/Supabase setup |
| `docs/GETTING_STARTED.md` | Local development instructions |
| `docs/DEPLOYMENT.md` | Deployment procedures |
| `docs/CONFIGURATION.md` | Environment variables |
| `docs/TROUBLESHOOTING.md` | Common issues and fixes |
| `.ai/SESSION_CONTEXT.md` | Current project status |
| `.ai/HANDOFF.md` | Pre-push checklist and next steps |
| `.ai/CHANGELOG.md` | Feature history |

---

## 🔧 Common Commands

```bash
# Local development
npm run dev                      # Start dev server (http://localhost:3000)
npm run build                    # Build for production
npm run lint                     # Run ESLint
npm run typecheck                # Run TypeScript checks
npm run test:e2e                 # Run Playwright tests

# Content management
npm run content:lint             # Validate MDX/YAML
npm run content:sync             # Sync official feeds

# Git operations
git status                       # Check working tree
git log --oneline -5             # Recent commits
git remote -v                    # View remotes

# GitHub operations (after repo created)
gh repo view plac9/afk-journey-hub
gh run list --limit 5
gh workflow run content-sync.yml

# Vercel operations (after linked)
vercel                           # Deploy to preview
vercel --prod                    # Deploy to production
vercel logs --follow             # Stream logs
vercel env ls                    # List environment variables
```

---

## 🏠 Homelab Deployment

**Status**: LIVE at https://afk.home.laclair.us

**Infrastructure**:
- Host: docker.home.laclair.us (10.0.44.246)
- Container: afk-journey-hub (port 4000 → 3000)
- Reverse Proxy: Traefik with TLS
- DNS: CoreDNS (afk.home.laclair.us → 10.0.44.246)
- Health Check: /api/health every 30s

**Update Homelab**:
```bash
./scripts/deploy/homelab-up.sh
```

---

## 🎯 Current Status

### ✅ Complete
- Full Next.js application with routes for heroes, events, news, tools
- Docker + docker-compose.homelab.yml for local preview
- Comprehensive documentation system
- GitHub Actions workflows (ci.yml, content-sync.yml)
- Supabase telemetry integration (graceful degradation)
- Homelab deployment (live at https://afk.home.laclair.us)
- 3 local commits ready to push

### 🔄 Pending
- GitHub remote repository creation
- Vercel production deployment
- Supabase project provisioning
- Environment variable configuration
- Custom domain DNS setup (afk.laclair.us)
- GitHub Actions enable (needs write permissions)

### 📋 Next Steps

**After creating GitHub repo**:
1. Enable GitHub Actions write permissions
2. Add branch protection for main
3. Link to Vercel project
4. Configure all environment variables
5. Create Supabase project + run bootstrap SQL
6. Set up custom domain DNS
7. Run post-deployment verification
8. Update documentation with production URLs

**Detailed Instructions**: See `docs/GITHUB_SETUP.md`

---

## 🆘 Need Help?

### Documentation
- **Complete Setup**: `docs/GITHUB_SETUP.md`
- **Development**: `docs/GETTING_STARTED.md`
- **Deployment**: `docs/DEPLOYMENT.md`
- **Troubleshooting**: `docs/TROUBLESHOOTING.md`

### Quick Diagnostics
```bash
scripts/troubleshoot/diagnose.sh
```

### Check Project Status
```bash
# Build health
npm run check

# Git status
git status
git log --oneline -5

# Homelab health
curl -I https://afk.home.laclair.us/api/health

# Environment
cat .env.example
```

---

## 📊 Project Stats

- **Total Files**: 101 (from initial commit)
- **Lines of Code**: ~21,807 (from initial commit)
- **Documentation Pages**: 15+
- **Routes**: 5 main sections (/, /heroes, /events, /news, /tools)
- **Calculator Tools**: 4 (AFK Timer, Dream Realm, Pity, ARC)
- **Content Types**: 3 (Heroes, Events, News)
- **GitHub Actions**: 2 workflows
- **Scripts**: 10+ automation scripts

---

## 🔐 Security Notes

- Never commit `.env.local` (already in .gitignore)
- Keep Supabase service_role key secret (server-side only)
- Verify no sensitive data in git history before pushing
- Use Vercel environment variables for production secrets
- Enable branch protection on GitHub after repo created

---

## 🎮 What's Next?

### Feature Development
1. Expand hero guide content
2. Add more event documentation
3. Enhance calculator logic (ARC tiers, Dream Realm combos)
4. Implement user accounts and saved builds
5. Add community submissions

### Infrastructure
1. Set up error tracking (Sentry)
2. Add search indexing (Algolia)
3. Implement webhook notifications
4. Configure uptime monitoring
5. Expand Playwright test coverage

### Content
1. Add team composition guides
2. Document all heroes (currently 2 samples)
3. Expand event strategies
4. Keep promo codes updated
5. Regular patch note summaries

---

**Last Updated**: 2025-11-14
**Maintainer**: Patrick LaClair
**License**: MIT (assumed - add LICENSE file as needed)

**Ready to deploy?** Start with `docs/GITHUB_SETUP.md` Step 1.
