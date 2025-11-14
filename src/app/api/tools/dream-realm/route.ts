import { NextResponse } from "next/server";
import {
  evaluateDreamRealmDamage,
  getDreamRealmBosses,
} from "@/lib/calculators/dreamRealm";
import { logCalculatorUsage } from "@/lib/integrations/telemetry";

export async function GET(request: Request) {
  const bosses = getDreamRealmBosses();
  if (bosses.length === 0) {
    return NextResponse.json({ error: "No bosses configured" }, { status: 500 });
  }

  const url = new URL(request.url);
  const bossId = url.searchParams.get("boss") ?? bosses[0].id;
  const damage = Number(url.searchParams.get("damage") ?? 0);

  const boss = bosses.find((entry) => entry.id === bossId) ?? bosses[0];
  const evaluation = evaluateDreamRealmDamage(boss.id, Math.max(damage, 0));

  if (!evaluation) {
    return NextResponse.json({ error: "Unable to evaluate boss" }, { status: 404 });
  }

  await logCalculatorUsage({
    tool: "dream-realm",
    params: { bossId: boss.id, damage: Math.max(damage, 0) },
    result: evaluation,
  });

  return NextResponse.json(evaluation);
}
