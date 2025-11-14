# Content Modeling Guide

This guide explains how AFK Journey Hub will capture and structure data for downloadable/interactive content.

## Content Buckets
1. **Heroes** (`content/heroes/*.mdx`)
   - Frontmatter: `name`, `faction`, `class`, `role`, `rarity`, `position`, `signature_item`, `exclusive_furniture`, `tags`
   - Body: MDX describing skill rotations, recommended glyphs, counters, and PvP/PvE notes
   - Assets: Hero art stored in `public/heroes/<slug>.webp`
2. **Teams** (`content/teams/*.mdx`)
   - Frontmatter: `name`, `mode`, `core_units`, `support_units`, `strengths`, `weaknesses`
   - Body: MDX for strategy write-up and video embeds
3. **Events** (`content/events/*.mdx`)
   - Frontmatter: `title`, `start`, `end`, `timezone`, `reward_summary`, `priority`
   - Body: Steps, map callouts, and recommended dailies
4. **News & Codes** (`content/news/*.mdx`)
   - Frontmatter: `source_url`, `published_at`, `type`
   - Body: Canonical summary and player-facing action items

## Taxonomy
- **Factions**: Wilder, Lightbearer, Mauler, Graveborn, Celestial, Hypogean, Dimensionals
- **Modes**: Dream Realm, Coliseum, Story, AFK Stages, Abyssal Expedition, PVP Ladder
- **Tags**: `burst`, `sustain`, `frontline`, `support`, `disrupt`, `control`, `buff`, `debuff`

## Data Flow
1. Authors create or update MDX files using the structures above
2. Contentlayer ingests files at build time producing typed JSON
3. Pages/components consume the generated types for lists, filters, calculators
4. Optional serverless cron fetches official RSS/patch JSON, storing normalized entries under `data/imports/<date>.json`

## Tooling
- `npm run content:lint` (planned) validates frontmatter and required fields
- `npm run content:sync` (planned) refreshes official sources (news feed, redemption codes)

Document assumptions inside `.ai/SESSION_CONTEXT.md` whenever the schema evolves to keep agents aligned.
