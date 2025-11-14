# AFK Journey Hub - Utility Scripts

The `scripts/` tree keeps automation organized by purpose. Populate each area as tooling lands so onboarding is painless.

## Directory Layout
### `dev/`
Local development helpers.
- `bootstrap.sh`: Installs dependencies, seeds `content/` folders, and runs `npm run content:lint`
- `verify.sh`: Runs `npm run check` followed by `npm test` before a push

### `deploy/`
Deployment orchestration.
- `deploy.sh`: Runs checks/builds and (optionally) triggers `vercel deploy` for preview or production depending on the first argument
- `homelab-up.sh`: Builds the Docker image and launches `docker-compose.homelab.yml` (sends a webhook ping when `NOTIFY_WEBHOOK_URL` is configured)

### `troubleshoot/`
Diagnostic utilities.
- `diagnose.sh`: Prints environment info, runs `npm run check`, and surfaces `next info`

### `maintenance/`
Recurring upkeep + data sync.
- `sync-official.sh`: Fetches official AFK Journey news + codes JSON into `data/imports/` (also refreshes `latest-*.json`)
- `prepare-sync-commit.sh`: Stages `data/imports/` changes after a sync so you can commit snapshots quickly
- `notify-webhook.sh`: Helper used by deploy scripts to ping homelab/Slack webhooks via `NOTIFY_WEBHOOK_URL`
- `bootstrap-supabase.sql`: SQL snippet to provision the `calculator_usage` telemetry table in Supabase

Add additional scripts as automation expands and keep this README in sync.

## Usage Pattern
```bash
./scripts/dev/bootstrap.sh
./scripts/deploy/deploy.sh production
./scripts/maintenance/sync-official.sh
```

All scripts should be executable (`chmod +x`) and assume they are run from the repo root. Log significant script runs with `pnote` if they impact other contributors.
