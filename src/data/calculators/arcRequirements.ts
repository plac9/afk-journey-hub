export type ArcTierRequirement = {
  tier: string;
  essence: number;
  stardust: number;
};

export const arcRequirements: ArcTierRequirement[] = [
  { tier: "Elite", essence: 80, stardust: 20 },
  { tier: "Elite+", essence: 140, stardust: 40 },
  { tier: "Legendary", essence: 260, stardust: 80 },
  { tier: "Legendary+", essence: 400, stardust: 120 },
  { tier: "Mythic", essence: 520, stardust: 160 },
  { tier: "Mythic+", essence: 680, stardust: 220 },
  { tier: "Celestial", essence: 820, stardust: 280 },
  { tier: "Celestial+", essence: 960, stardust: 360 },
  { tier: "Ascended", essence: 1200, stardust: 460 },
  { tier: "Ascended+", essence: 1500, stardust: 600 },
  { tier: "Immortal", essence: 2000, stardust: 820 },
];
