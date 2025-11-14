import "server-only";

import { getServiceSupabaseClient, isSupabaseConfigured } from "./supabase";

type CalculatorUsagePayload = {
  tool: string;
  params: Record<string, unknown>;
  result: Record<string, unknown>;
};

export async function logCalculatorUsage(payload: CalculatorUsagePayload) {
  if (!isSupabaseConfigured()) {
    return { stored: false, reason: "supabase-disabled" };
  }

  try {
    const client = getServiceSupabaseClient();
    const { error } = await client.from("calculator_usage").insert({
      tool: payload.tool,
      params: payload.params,
      result: payload.result,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("[telemetry] failed to log calculator usage", error);
      return { stored: false, reason: error.message };
    }

    return { stored: true };
  } catch (error) {
    console.error("[telemetry] unexpected failure", error);
    return { stored: false, reason: (error as Error).message };
  }
}
