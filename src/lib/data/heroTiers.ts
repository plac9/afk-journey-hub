import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export type HeroTierHero = {
  slug: string;
  role: string;
  highlight: string;
};

export type HeroTier = {
  tier: string;
  title: string;
  description: string;
  heroes: HeroTierHero[];
};

type HeroTierMapEntry = HeroTierHero & {
  tier: string;
  tierTitle: string;
  tierDescription: string;
};

let cachedHeroTiers: HeroTier[] | null = null;
let cachedTierMap: Record<string, HeroTierMapEntry> | null = null;

function loadHeroTierData(): HeroTier[] {
  if (cachedHeroTiers) {
    return cachedHeroTiers;
  }

  const filePath = path.join(process.cwd(), "data", "hero-tiers.yaml");
  if (!fs.existsSync(filePath)) {
    cachedHeroTiers = [];
    return cachedHeroTiers;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = YAML.parse(raw) as HeroTier[];
  cachedHeroTiers = Array.isArray(parsed) ? parsed : [];
  return cachedHeroTiers;
}

export function getHeroTiers(): HeroTier[] {
  return loadHeroTierData();
}

export function getHeroTierMap(): Record<string, HeroTierMapEntry> {
  if (cachedTierMap) return cachedTierMap;

  const tiers = loadHeroTierData();
  cachedTierMap = tiers.reduce<Record<string, HeroTierMapEntry>>(
    (acc, tier) => {
      tier.heroes.forEach((hero) => {
        acc[hero.slug] = {
          ...hero,
          tier: tier.tier,
          tierTitle: tier.title,
          tierDescription: tier.description,
        };
      });
      return acc;
    },
    {},
  );
  return cachedTierMap;
}
