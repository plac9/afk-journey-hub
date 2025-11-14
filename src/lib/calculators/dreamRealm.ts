import { dreamRealmBosses } from "@/data/calculators/dreamRealmBosses";

type Threshold = (typeof dreamRealmBosses)[number]["thresholds"][number];

type Evaluation = {
  bossId: string;
  bossName: string;
  damage: number;
  achievedRank: Threshold;
  nextRank?: Threshold;
};

export function evaluateDreamRealmDamage(
  bossId: string,
  damage: number,
): Evaluation | undefined {
  const boss = dreamRealmBosses.find((entry) => entry.id === bossId);
  if (!boss) return undefined;

  const achievedRank = [...boss.thresholds]
    .reverse()
    .find((threshold) => damage >= threshold.damage) ?? boss.thresholds[0];

  const nextRank = boss.thresholds.find(
    (threshold) => threshold.damage > damage,
  );

  return {
    bossId: boss.id,
    bossName: boss.name,
    damage,
    achievedRank,
    nextRank,
  };
}

export function getDreamRealmBosses() {
  return dreamRealmBosses;
}
