# AFK Journey Hub - Changelog

## [2025-11-14] - Homelab Preview & Telemetry Scaffolding

### Added
- YAML-driven hero tiers and event rotation datasets surfaced across `/heroes`, `/events`, and detail routes
- Supabase telemetry helper + Plausible analytics snippet (graceful no-op without credentials)
- `/api/health`, Dockerfile, `docker-compose.homelab.yml`, Traefik/DNS wiring for `https://afk.home.laclair.us`
- Maintenance docs (`docs/maintenance/2025-11-14-homelab-preview.md`, `docs/maintenance/TODO.md`) capturing homelab rollout + outstanding tasks

### Changed
- README/DEPLOYMENT docs now describe homelab workflow and verification steps
- `.env.example` includes `NOTIFY_WEBHOOK_URL`; configuration guide updated with telemetry + webhook details
- `.ai/SESSION_CONTEXT.md` / `.ai/HANDOFF.md` refreshed with current status and next steps

## [2025-11-13] - Documentation Standardization

### Added
- Standard documentation structure
- AI session context system
- Troubleshooting guide framework
- Organized script directories

### Changed
- Migrated scattered documentation to organized structure
- Updated .gitignore for session management
