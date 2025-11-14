import { pityThresholds } from "@/data/calculators/pityThresholds";

type PityInput = {
  pulls: number;
  rarity: string;
};

type PityResult = {
  rarity: string;
  pulls: number;
  softPity: number;
  guaranteedAt: number;
  pullsUntilSoft: number;
  pullsUntilGuaranteed: number;
};

export function evaluatePity({ pulls, rarity }: PityInput): PityResult {
  const threshold =
    pityThresholds.find((entry) => entry.rarity === rarity) ?? pityThresholds[0];
  const pullsUntilSoft = Math.max(threshold.softPity - pulls, 0);
  const pullsUntilGuaranteed = Math.max(threshold.guaranteedAt - pulls, 0);

  return {
    rarity: threshold.rarity,
    pulls,
    softPity: threshold.softPity,
    guaranteedAt: threshold.guaranteedAt,
    pullsUntilSoft,
    pullsUntilGuaranteed,
  };
}

export function getPityOptions() {
  return pityThresholds;
}
