import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export type PromoCode = {
  code: string;
  reward: string;
  expires: string;
  notes?: string;
};

let cachedPromoCodes: PromoCode[] | null = null;

export function getPromoCodes(): PromoCode[] {
  if (cachedPromoCodes) {
    return cachedPromoCodes;
  }

  const filePath = path.join(process.cwd(), "data", "promo-codes.yaml");
  if (!fs.existsSync(filePath)) {
    cachedPromoCodes = [];
    return cachedPromoCodes;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = YAML.parse(raw) as PromoCode[];
  cachedPromoCodes = Array.isArray(parsed) ? parsed : [];
  return cachedPromoCodes;
}
