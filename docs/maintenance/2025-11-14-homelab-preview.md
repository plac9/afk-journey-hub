# 2025-11-14 – Homelab Preview + DNS Routing

## Summary
- Synced the repository to `placlair-admin@docker.home.laclair.us:~/afk-journey-hub`
- Added Traefik labels + external network to `docker-compose.homelab.yml`
- Built/published the container via `docker compose -f docker-compose.homelab.yml up -d --build`
- Exposed the service through Traefik → `https://afk.home.laclair.us`
- Updated CoreDNS hosts files so `afk.home.laclair.us` resolves to `10.0.44.246`

## Steps
1. `rsync -az --delete ./ placlair-admin@docker.home.laclair.us:~/afk-journey-hub`
2. `ssh homelab 'cd ~/afk-journey-hub && docker compose -f docker-compose.homelab.yml up -d --build'`
3. Edit `/opt/homelab-iac/Corefile-simple`, adding `10.0.44.246 afk.home.laclair.us`
4. `docker restart dns-primary-forwarder`
5. `curl -k -I https://afk.home.laclair.us` → HTTP 200 (proves Traefik route is live)

## Follow-Ups
- Run `scripts/maintenance/bootstrap-supabase.sql` inside Supabase when credentials are ready, then populate env vars to enable telemetry.
- Push `main` to GitHub and link Vercel as soon as the repo is ready for remote CI/CD.
- Monitor Traefik/DNS logs to ensure the new host shows up in dashboards.
