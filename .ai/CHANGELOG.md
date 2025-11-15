# AFK Journey Hub - Changelog

## [2025-11-14] - Production Ready: GitHub Repository, Community Standards & CI Fixes

### Added - GitHub Repository & Community Standards
- Created public GitHub repository at https://github.com/plac9/afk-journey-hub
- Complete GitHub community standards (7 core files):
  - LICENSE (MIT)
  - CONTRIBUTING.md (comprehensive development workflow guide)
  - SECURITY.md (vulnerability reporting policy with severity levels)
  - CODE_OF_CONDUCT.md (Contributor Covenant 2.1)
  - .github/CODEOWNERS (automatic code review assignments)
  - .github/dependabot.yml (automated dependency updates with grouping)
  - .github/ISSUE_TEMPLATE/config.yml (issue template configuration)
- GitHub issue templates (bug report, feature request)
- GitHub pull request template with comprehensive checklist
- Status badges in README.md (CI, Content Sync, License)
- Comprehensive setup documentation:
  - docs/GITHUB_SETUP.md (13KB detailed guide for GitHub/Vercel/Supabase setup)
  - scripts/maintenance/bootstrap-supabase.sql (database schema for telemetry)
  - SETUP_GUIDE.md (quick reference at repo root)
  - ~/.dotfiles/templates/github-repo-setup-checklist.md (reusable template for future projects)

### Changed - CI/CD Enhancements
- Enhanced CI workflow (.github/workflows/ci.yml) with:
  - Concurrency controls (cancel in-progress runs)
  - Minimal permissions (least-privilege principle)
  - Separate jobs: lint, typecheck, build, e2e tests, summary
  - Contentlayer type generation before typecheck (fixes missing type errors)
  - Build artifact uploads
  - Playwright report uploads
  - Formatted summary reporting with job status table
- Updated ESLint configuration to ignore `.github/**` directory
- Fixed Supabase type definitions (replaced `{}` with `Record<string, never>`)
- Created `.vercelignore` for optimized Vercel deployments

### Fixed
- All ESLint errors resolved (ban-types violations in Supabase config)
- TypeScript compilation errors resolved (missing contentlayer/generated types in CI)
- CI workflow now passing all jobs: ✅ Lint, ✅ Type Check, ✅ Build, ✅ E2E Tests

### Infrastructure
- Dependabot auto-updates enabled and creating PRs
- GitHub Actions workflows active with write permissions
- Repository topics configured for discoverability
- Auto-merge enabled for streamlined PR workflow

### Earlier in Day - Homelab Preview & Telemetry Scaffolding
- YAML-driven hero tiers and event rotation datasets surfaced across `/heroes`, `/events`, and detail routes
- Supabase telemetry helper + Plausible analytics snippet (graceful no-op without credentials)
- `/api/health`, Dockerfile, `docker-compose.homelab.yml`, Traefik/DNS wiring for `https://afk.home.laclair.us`
- Homelab deployment live and accessible
- Maintenance docs (`docs/maintenance/2025-11-14-homelab-preview.md`, `docs/maintenance/TODO.md`) capturing homelab rollout + outstanding tasks
- README/DEPLOYMENT docs describe homelab workflow and verification steps
- `.env.example` includes `NOTIFY_WEBHOOK_URL`; configuration guide updated with telemetry + webhook details

### Documentation Updates
- `.ai/SESSION_CONTEXT.md` updated to "Production-Ready" status with all accomplishments
- `.ai/HANDOFF.md` expanded with full day's work (9.5h session), comprehensive next steps
- Obsidian vault documentation updated with proper tags, dates, and cross-references
- All documentation synchronized across vault and repository

## [2025-11-13] - Documentation Standardization

### Added
- Standard documentation structure
- AI session context system
- Troubleshooting guide framework
- Organized script directories

### Changed
- Migrated scattered documentation to organized structure
- Updated .gitignore for session management
