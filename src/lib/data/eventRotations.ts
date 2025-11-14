import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export type EventRotation = {
  mode: string;
  cadence: string;
  resetWindow: string;
  focus: string;
  callouts: string[];
};

let cachedRotations: EventRotation[] | null = null;

export function getEventRotations(): EventRotation[] {
  if (cachedRotations) return cachedRotations;

  const filePath = path.join(process.cwd(), "data", "event-rotations.yaml");
  if (!fs.existsSync(filePath)) {
    cachedRotations = [];
    return cachedRotations;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = YAML.parse(raw) as EventRotation[];
  cachedRotations = Array.isArray(parsed) ? parsed : [];
  return cachedRotations;
}
