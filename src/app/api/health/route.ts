import { NextResponse } from "next/server";
import { getHeroTiers } from "@/lib/data/heroTiers";
import { getEventRotations } from "@/lib/data/eventRotations";
import { isSupabaseConfigured } from "@/lib/integrations/supabase";

export function GET() {
  return NextResponse.json({
    status: "ok",
    heroTiers: getHeroTiers().length,
    eventRotations: getEventRotations().length,
    supabase: isSupabaseConfigured() ? "configured" : "disabled",
    timestamp: new Date().toISOString(),
  });
}
