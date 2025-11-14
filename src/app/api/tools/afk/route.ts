import { NextResponse } from "next/server";
import {
  calculateAfkRewards,
  getAfkTimerPresets,
} from "@/lib/calculators/afkTimer";
import { logCalculatorUsage } from "@/lib/integrations/telemetry";

export async function GET(request: Request) {
  const presets = getAfkTimerPresets();
  const url = new URL(request.url);
  const presetId = url.searchParams.get("preset") ?? presets[0]?.id;
  const hours = Number(url.searchParams.get("hours") ?? 8);
  const preset = presets.find((entry) => entry.id === presetId) ?? presets[0];
  const normalizedHours = Math.min(Math.max(hours, 0), 24);

  if (!preset) {
    return NextResponse.json({ error: "No presets configured" }, { status: 500 });
  }

  const result = calculateAfkRewards({
    hoursAway: normalizedHours,
    basePerHour: preset.basePerHour,
    bonusMultiplier: preset.bonusMultiplier,
  });

  await logCalculatorUsage({
    tool: "afk",
    params: { preset: preset.id, hours: normalizedHours },
    result,
  });

  return NextResponse.json({
    preset,
    hours: normalizedHours,
    result,
  });
}
