import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type CalculatorUsageInsert = {
  tool: string;
  params?: Record<string, unknown>;
  result?: Record<string, unknown>;
  created_at?: string;
};

type Database = {
  public: {
    Tables: {
      calculator_usage: {
        Row: CalculatorUsageInsert & { id: number; created_at: string };
        Insert: CalculatorUsageInsert;
        Update: Partial<CalculatorUsageInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

let serviceClient: SupabaseClient<Database> | null = null;

export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getServiceSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase service credentials are not configured.");
  }

  if (!serviceClient) {
    serviceClient = createClient<Database>(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      {
        auth: { persistSession: false, autoRefreshToken: false },
      },
    );
  }

  return serviceClient;
}
