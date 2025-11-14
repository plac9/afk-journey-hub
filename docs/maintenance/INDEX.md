# AFK Journey Hub - Maintenance Log Index

## Recent Maintenance

### 2025-11-14 - Homelab Preview & DNS
- Deployed the AFK Journey Hub container to `docker.home.laclair.us` with Traefik labels
- Wired `afk.home.laclair.us` DNS + TLS through the existing homelab reverse proxy
- Documented Supabase/telemetry follow-ups (`docs/maintenance/2025-11-14-homelab-preview.md`)

### 2025-11-13 - Project Initialization & Scaffold
- Applied portfolio-standard repository structure
- Authored README, `.ai` context, and operational docs
- Scaffolded Next.js + Contentlayer app with sample hero/event/news data
- Added automation scripts (`bootstrap`, `deploy`, `sync-official`, diagnostics)

---

## Maintenance Log Format
- File naming: `docs/maintenance/YYYY-MM-DD-description.md`
- Include: date & duration, actions taken, issues encountered, outcomes, and follow-up tasks
- Reference related `pnote` entries or tickets when possible

Append new dated markdown files under `docs/maintenance/` whenever noteworthy work is completed.
