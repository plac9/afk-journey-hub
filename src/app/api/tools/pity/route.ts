import { NextResponse } from "next/server";
import { evaluatePity, getPityOptions } from "@/lib/calculators/pity";
import { logCalculatorUsage } from "@/lib/integrations/telemetry";

export async function GET(request: Request) {
  const options = getPityOptions();
  if (options.length === 0) {
    return NextResponse.json({ error: "No pity options configured" }, { status: 500 });
  }

  const url = new URL(request.url);
  const rarity = url.searchParams.get("rarity") ?? options[0].rarity;
  const pullsRaw = Number(url.searchParams.get("pulls") ?? 0);
  const pulls = Number.isFinite(pullsRaw) ? pullsRaw : 0;

  const result = evaluatePity({ rarity, pulls });
  await logCalculatorUsage({
    tool: "pity",
    params: { rarity, pulls },
    result,
  });
  return NextResponse.json(result);
}
