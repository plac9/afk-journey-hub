# AFK Journey Hub - Documentation Index

## Getting Started
- **[Getting Started](GETTING_STARTED.md)** – Environment prerequisites, tooling, and scaffolding workflow
- **[Configuration](CONFIGURATION.md)** – Environment variables, secrets, and third-party integrations

## Architecture & Content
- **[Architecture](../.ai/ARCHITECTURE.md)** – High-level system design and key decisions
- **[API & Data Sources](API.md)** – Planned ingest pipeline + schemas
- **[Content Modeling Guide](guides/content-modeling.md)** – MDX/YAML schema for heroes, events, news, and teams

## Operations
- **[Deployment](DEPLOYMENT.md)** – Vercel workflow, smoke tests, and rollback playbook
- **[Troubleshooting](TROUBLESHOOTING.md)** – Common setup and runtime issues
- **[Maintenance](maintenance/INDEX.md)** – Maintenance log index and dated entries
- **[Remote Setup](REMOTE_SETUP.md)** – Checklist for linking GitHub/Vercel remotes once you publish
- **Automation**: see `.github/workflows/ci.yml`, `.github/workflows/content-sync.yml`, and `scripts/maintenance/prepare-sync-commit.sh`

## Scripts & Automation
- **[Scripts README](../scripts/README.md)** – Expected automation layout (dev/deploy/maintenance/troubleshoot)

For AI agents, pair this index with `.ai/SESSION_CONTEXT.md` (`pcontext`) before touching code.
