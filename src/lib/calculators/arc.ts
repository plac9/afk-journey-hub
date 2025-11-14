import { arcRequirements } from "@/data/calculators/arcRequirements";

type ArcInput = {
  currentTier: string;
  targetTier: string;
  dailyEssence: number;
  dailyStardust: number;
};

type ArcResult = {
  totalEssenceNeeded: number;
  totalStardustNeeded: number;
  daysForEssence: number;
  daysForStardust: number;
};

const tierOrder = arcRequirements.map((entry) => entry.tier);

export function evaluateArcRequirements({
  currentTier,
  targetTier,
  dailyEssence,
  dailyStardust,
}: ArcInput): ArcResult {
  const startIndex = Math.max(tierOrder.indexOf(currentTier), 0);
  const endIndex = Math.max(tierOrder.indexOf(targetTier), startIndex);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return {
      totalEssenceNeeded: 0,
      totalStardustNeeded: 0,
      daysForEssence: 0,
      daysForStardust: 0,
    };
  }

  const requirements = arcRequirements.slice(startIndex + 1, endIndex + 1);
  const totalEssenceNeeded = requirements.reduce(
    (sum, req) => sum + req.essence,
    0,
  );
  const totalStardustNeeded = requirements.reduce(
    (sum, req) => sum + req.stardust,
    0,
  );

  const daysForEssence = dailyEssence > 0
    ? Math.ceil(totalEssenceNeeded / dailyEssence)
    : Infinity;
  const daysForStardust = dailyStardust > 0
    ? Math.ceil(totalStardustNeeded / dailyStardust)
    : Infinity;

  return {
    totalEssenceNeeded,
    totalStardustNeeded,
    daysForEssence,
    daysForStardust,
  };
}

export function getArcTierOptions() {
  return tierOrder;
}
