import type { Metadata } from "next";
import { calculateAfkRewards, getAfkTimerPresets } from "@/lib/calculators/afkTimer";
import {
  evaluateDreamRealmDamage,
  getDreamRealmBosses,
} from "@/lib/calculators/dreamRealm";
import { evaluatePity, getPityOptions } from "@/lib/calculators/pity";
import {
  evaluateArcRequirements,
  getArcTierOptions,
} from "@/lib/calculators/arc";

export const metadata: Metadata = {
  title: "Tools",
  description: "Calculator playground for AFK timers and Dream Realm scoring.",
};

type ToolsPageProps = {
  searchParams?: {
    hours?: string;
    preset?: string;
    boss?: string;
    damage?: string;
    pityRarity?: string;
    pityPulls?: string;
    arcCurrent?: string;
    arcTarget?: string;
    arcEssence?: string;
    arcStardust?: string;
  };
};

export default function ToolsPage({ searchParams }: ToolsPageProps) {
  const presets = getAfkTimerPresets();
  const selectedPresetId = searchParams?.preset ?? presets[0]?.id;
  const selectedPreset =
    presets.find((preset) => preset.id === selectedPresetId) ?? presets[0];
  const rawHours = Number(searchParams?.hours ?? 8);
  const hoursAway = Number.isFinite(rawHours) ? rawHours : 8;
  const normalizedHours = Math.min(Math.max(hoursAway, 0), 24);

  const bosses = getDreamRealmBosses();
  const selectedBossId = searchParams?.boss ?? bosses[0]?.id;
  const selectedBoss =
    bosses.find((boss) => boss.id === selectedBossId) ?? bosses[0];
  const requestedDamage = Number(searchParams?.damage ?? 18500000);
  const damage = Number.isFinite(requestedDamage) ? requestedDamage : 18500000;
  const dreamRealmSample = selectedBoss
    ? evaluateDreamRealmDamage(selectedBoss.id, damage)
    : undefined;
  const pityOptions = getPityOptions();
  const selectedPityRarity = searchParams?.pityRarity ?? pityOptions[0]?.rarity;
  const pityPullsInput = Number(searchParams?.pityPulls ?? 0);
  const pityPulls = Number.isFinite(pityPullsInput) ? pityPullsInput : 0;
  const pityResult = evaluatePity({
    rarity: selectedPityRarity ?? pityOptions[0].rarity,
    pulls: pityPulls,
  });
  const arcTiers = getArcTierOptions();
  const arcCurrent =
    searchParams?.arcCurrent && arcTiers.includes(searchParams.arcCurrent)
      ? searchParams.arcCurrent
      : arcTiers[0];
  const arcTarget =
    searchParams?.arcTarget && arcTiers.includes(searchParams.arcTarget)
      ? searchParams.arcTarget
      : arcTiers[arcTiers.length - 1];
  const arcEssenceGainInput = Number(searchParams?.arcEssence ?? 120);
  const arcEssenceGain = Number.isFinite(arcEssenceGainInput)
    ? Math.max(arcEssenceGainInput, 0)
    : 120;
  const arcStardustGainInput = Number(searchParams?.arcStardust ?? 40);
  const arcStardustGain = Number.isFinite(arcStardustGainInput)
    ? Math.max(arcStardustGainInput, 0)
    : 40;
  const arcResult = evaluateArcRequirements({
    currentTier: arcCurrent,
    targetTier: arcTarget,
    dailyEssence: arcEssenceGain,
    dailyStardust: arcStardustGain,
  });

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-4xl space-y-10">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
            Calculators
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            Tools & Utilities
          </h1>
          <p className="mt-3 text-base text-white/80">
            These helpers expose the shared logic we will eventually relocate to
            `/api` routes and share with Discord bots. Use the forms below to explore
            sample calculations backed by data under `src/data/calculators/`.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
          <h2 className="text-2xl font-semibold">AFK Timer Estimator</h2>
          <p className="mt-2 text-sm text-white/80">
            Calculates estimated rewards after stepping away from the game. Adjust hours
            away and preset to validate the numbers before wiring automation.
          </p>
          <form className="mt-4 flex flex-col gap-4 sm:flex-row" method="get">
            <input type="hidden" name="boss" value={selectedBossId} />
            <input type="hidden" name="damage" value={damage} />
            <label className="flex flex-1 flex-col text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                Hours away
              </span>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                name="hours"
                defaultValue={normalizedHours}
                className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-base text-white focus:border-white/60 focus:outline-none"
              />
            </label>
            <label className="flex flex-1 flex-col text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                Mode preset
              </span>
              <select
                name="preset"
                defaultValue={selectedPreset.id}
                className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-base text-white focus:border-white/60 focus:outline-none"
              >
                {presets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="mt-6 rounded-2xl bg-rose-500 px-8 py-3 font-semibold text-white hover:bg-rose-400 sm:mt-auto"
            >
              Calculate
            </button>
          </form>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[400px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-white/70">
                <tr>
                  <th className="py-2">Mode</th>
                  <th className="py-2">Base / hr</th>
                  <th className="py-2">Bonus</th>
                  <th className="py-2">{normalizedHours}h Rewards</th>
                </tr>
              </thead>
              <tbody>
                {presets.map((preset) => {
                  const result = calculateAfkRewards({
                    hoursAway: normalizedHours,
                    basePerHour: preset.basePerHour,
                    bonusMultiplier: preset.bonusMultiplier,
                  });
                  return (
                    <tr key={preset.id} className="border-t border-white/5">
                      <td className="py-2 font-semibold">
                        {preset.label}
                        {preset.id === selectedPreset.id ? " (selected)" : ""}
                      </td>
                      <td className="py-2">
                        {preset.basePerHour.toLocaleString()}
                      </td>
                      <td className="py-2">{preset.bonusMultiplier.toFixed(2)}x</td>
                      <td className="py-2">{result.totalRewards.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {dreamRealmSample && selectedBoss && (
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <h2 className="text-2xl font-semibold">Dream Realm Scorecard</h2>
            <p className="mt-2 text-sm text-white/80">
              Uses `src/data/calculators/dreamRealmBosses.ts` thresholds to show where a run
              lands and what damage target unlocks the next rank. Tweak damage values to
              answer questions from guildmates quickly.
            </p>
            <form className="mt-4 flex flex-col gap-4 sm:flex-row" method="get">
              <input type="hidden" name="hours" value={normalizedHours} />
              <input type="hidden" name="preset" value={selectedPreset.id} />
              <label className="flex flex-1 flex-col text-sm text-white/80">
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Boss
                </span>
                <select
                  name="boss"
                  defaultValue={selectedBoss.id}
                  className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-base text-white focus:border-white/60 focus:outline-none"
                >
                  {bosses.map((boss) => (
                    <option key={boss.id} value={boss.id}>
                      {boss.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-1 flex-col text-sm text-white/80">
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Damage dealt
                </span>
                <input
                  type="number"
                  name="damage"
                  min="0"
                  step="500000"
                  defaultValue={damage}
                  className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-base text-white focus:border-white/60 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="mt-6 rounded-2xl bg-rose-500 px-8 py-3 font-semibold text-white hover:bg-rose-400 sm:mt-auto"
              >
                Evaluate
              </button>
            </form>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <p>
                <strong className="text-white">Boss:</strong> {selectedBoss.name}
              </p>
              <p>
                <strong className="text-white">Damage Dealt:</strong> {damage.toLocaleString()}
              </p>
              <p>
                <strong className="text-white">Rank:</strong> {dreamRealmSample.achievedRank.rank}
              </p>
              {dreamRealmSample.nextRank ? (
                <p>
                  <strong className="text-white">Next Goal:</strong> {dreamRealmSample.nextRank.rank}
                  {" "}at {dreamRealmSample.nextRank.damage.toLocaleString()} damage
                </p>
              ) : (
                <p>You have already cleared the highest tier for this boss.</p>
              )}
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
          <h2 className="text-2xl font-semibold">ARC (Ascension Resource Calculator)</h2>
          <p className="mt-2 text-sm text-white/80">
            Estimate how much essence and stardust you need to climb from your current tier
            to a higher one. Requirements live in `src/data/calculators/arcRequirements.ts`.
          </p>
          <form className="mt-4 grid gap-4 sm:grid-cols-2" method="get">
            <input type="hidden" name="hours" value={normalizedHours} />
            <input type="hidden" name="preset" value={selectedPreset.id} />
            <input type="hidden" name="boss" value={selectedBossId} />
            <input type="hidden" name="damage" value={damage} />
            <label className="flex flex-col text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                Current tier
              </span>
              <select
                name="arcCurrent"
                defaultValue={arcCurrent}
                className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-base text-white focus:border-white/60 focus:outline-none"
              >
                {arcTiers.map((tier) => (
                  <option key={tier} value={tier}>
                    {tier}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                Target tier
              </span>
              <select
                name="arcTarget"
                defaultValue={arcTarget}
                className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-base text-white focus:border-white/60 focus:outline-none"
              >
                {arcTiers.map((tier) => (
                  <option key={tier} value={tier}>
                    {tier}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                Daily essence gain
              </span>
              <input
                type="number"
                name="arcEssence"
                min="0"
                defaultValue={arcEssenceGain}
                className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-base text-white focus:border-white/60 focus:outline-none"
              />
            </label>
            <label className="flex flex-col text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                Daily stardust gain
              </span>
              <input
                type="number"
                name="arcStardust"
                min="0"
                defaultValue={arcStardustGain}
                className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-base text-white focus:border-white/60 focus:outline-none"
              />
            </label>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="rounded-2xl bg-rose-500 px-8 py-3 font-semibold text-white hover:bg-rose-400"
              >
                Estimate
              </button>
            </div>
          </form>
          {arcResult.totalEssenceNeeded > 0 ? (
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <p>
                <strong className="text-white">Essence Needed:</strong>{" "}
                {arcResult.totalEssenceNeeded.toLocaleString()} (≈{arcResult.daysForEssence} days)
              </p>
              <p>
                <strong className="text-white">Stardust Needed:</strong>{" "}
                {arcResult.totalStardustNeeded.toLocaleString()} (≈{arcResult.daysForStardust} days)
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-white/70">
              Select a higher target tier to compute the required resources.
            </p>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
          <h2 className="text-2xl font-semibold">Pity Tracker</h2>
          <p className="mt-2 text-sm text-white/80">
            Use this to see how many pulls remain before soft pity or guaranteed banners
            trigger for a rarity. Data lives in `src/data/calculators/pityThresholds.ts`.
          </p>
          <form className="mt-4 flex flex-col gap-4 sm:flex-row" method="get">
            <input type="hidden" name="hours" value={normalizedHours} />
            <input type="hidden" name="preset" value={selectedPreset.id} />
            <input type="hidden" name="boss" value={selectedBossId} />
            <input type="hidden" name="damage" value={damage} />
            <label className="flex flex-1 flex-col text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                Rarity
              </span>
              <select
                name="pityRarity"
                defaultValue={pityResult.rarity}
                className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-base text-white focus:border-white/60 focus:outline-none"
              >
                {pityOptions.map((option) => (
                  <option key={option.rarity} value={option.rarity}>
                    {option.rarity}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-1 flex-col text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                Pulls made
              </span>
              <input
                type="number"
                name="pityPulls"
                min="0"
                defaultValue={pityPulls}
                className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-base text-white focus:border-white/60 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="mt-6 rounded-2xl bg-rose-500 px-8 py-3 font-semibold text-white hover:bg-rose-400 sm:mt-auto"
            >
              Update
            </button>
          </form>

          <div className="mt-4 space-y-2 text-sm text-white/80">
            <p>
              <strong className="text-white">Rarity:</strong> {pityResult.rarity}
            </p>
            <p>
              <strong className="text-white">Pulls Made:</strong>{" "}
              {pityResult.pulls.toLocaleString()}
            </p>
            <p>
              <strong className="text-white">Soft Pity:</strong>{" "}
              {pityResult.softPity.toLocaleString()} pulls (remaining{" "}
              {pityResult.pullsUntilSoft.toLocaleString()})
            </p>
            <p>
              <strong className="text-white">Guaranteed:</strong>{" "}
              {pityResult.guaranteedAt.toLocaleString()} pulls (remaining{" "}
              {pityResult.pullsUntilGuaranteed.toLocaleString()})
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
