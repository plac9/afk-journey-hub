import { afkTimerPresets } from "@/data/calculators/afkTimerPresets";

export type AfkTimerInput = {
  hoursAway: number;
  basePerHour: number;
  bonusMultiplier?: number;
};

export type AfkTimerResult = {
  cappedHours: number;
  totalRewards: number;
};

export function calculateAfkRewards({
  hoursAway,
  basePerHour,
  bonusMultiplier = 1,
}: AfkTimerInput): AfkTimerResult {
  const cappedHours = Math.min(Math.max(hoursAway, 0), 24);
  const totalRewards = Math.round(cappedHours * basePerHour * bonusMultiplier);

  return { cappedHours, totalRewards };
}

export function getAfkTimerPresets() {
  return afkTimerPresets;
}
