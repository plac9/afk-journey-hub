import Link from "next/link";
import { HeroCard } from "@/components/HeroCard";
import { getSortedHeroes } from "@/lib/content";
import { getHeroTierMap, getHeroTiers } from "@/lib/data/heroTiers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heroes",
  description: "Faction-filtered hero encyclopedia powered by Contentlayer.",
};

type HeroesPageProps = {
  searchParams?: { q?: string; faction?: string };
};

export default function HeroesPage({ searchParams }: HeroesPageProps) {
  const query = searchParams?.q?.toLowerCase().trim() ?? "";
  const factionFilter = searchParams?.faction ?? "all";
  const tierMap = getHeroTierMap();
  const sortedHeroes = getSortedHeroes();
  const heroNameLookup = new Map(sortedHeroes.map((hero) => [hero.slug, hero.name]));

  const heroes = sortedHeroes.filter((hero) => {
    const matchesQuery =
      !query ||
      hero.name.toLowerCase().includes(query) ||
      hero.tags.some((tag) => tag.toLowerCase().includes(query));
    const matchesFaction =
      factionFilter === "all" || hero.faction === factionFilter;
    return matchesQuery && matchesFaction;
  });

  const heroesByFaction = heroes.reduce<Record<string, typeof heroes>>(
    (groups, hero) => {
      if (!groups[hero.faction]) groups[hero.faction] = [];
      groups[hero.faction].push(hero);
      return groups;
    },
    {},
  );

  const factionEntries = Object.entries(heroesByFaction).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );
  const heroTiers = getHeroTiers();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
            Encyclopedia
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            AFK Journey Heroes
          </h1>
          <p className="mt-3 max-w-3xl text-base text-white/80">
            Every entry is sourced from Markdown/MDX files stored in the repo,
            giving writers a fast review cycle. Filter by faction to find the
            sustain cores, control tools, or burst carries you need.
          </p>
        </header>

        <form className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/80 sm:flex-row">
          <label className="flex-1">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              Search
            </span>
            <input
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-white focus:border-white/60 focus:outline-none"
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Rowan, sustain, burst..."
            />
          </label>
          <label className="sm:w-48">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              Faction
            </span>
            <select
              name="faction"
              defaultValue={factionFilter}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-white focus:border-white/60 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="Lightbearer">Lightbearer</option>
              <option value="Mauler">Mauler</option>
              <option value="Wilder">Wilder</option>
              <option value="Graveborn">Graveborn</option>
              <option value="Celestial">Celestial</option>
              <option value="Hypogean">Hypogean</option>
              <option value="Dimensional">Dimensional</option>
            </select>
          </label>
          <button
            type="submit"
            className="mt-2 rounded-2xl bg-rose-500 px-6 py-3 font-semibold text-white hover:bg-rose-400 sm:mt-auto"
          >
            Filter
          </button>
          <Link
            href="/heroes"
            className="mt-2 rounded-2xl border border-white/20 px-6 py-3 text-center font-semibold text-white/80 hover:border-white/60 sm:mt-auto"
          >
            Reset
          </Link>
        </form>

        {heroTiers.length > 0 && (
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-900 px-6 py-5 text-white shadow-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-rose-200">
                  Tier Snapshot
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  Trusted Hero Rankings
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  Stored in <code className="rounded bg-white/10 px-2 py-1">data/hero-tiers.yaml</code>{" "}
                  so analysts can adjust the meta without touching React files.
                </p>
              </div>
              <Link
                href="https://github.com/plac9/afk-journey-hub/blob/main/data/hero-tiers.yaml"
                className="text-sm font-semibold text-rose-200 underline-offset-4 hover:underline"
              >
                Edit YAML
              </Link>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {heroTiers.map((tier) => (
                <article
                  key={tier.tier}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <header className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
                        Tier {tier.tier}
                      </p>
                      <h3 className="text-xl font-semibold text-white">
                        {tier.title}
                      </h3>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase text-white/80">
                      {tier.heroes.length} picks
                    </span>
                  </header>
                  <p className="mt-2 text-sm text-white/80">{tier.description}</p>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    {tier.heroes.map((hero) => (
                      <li key={hero.slug} className="rounded-xl bg-slate-900/60 px-3 py-2">
                        <span className="font-semibold">
                          {heroNameLookup.get(hero.slug) ?? hero.slug}
                        </span>{" "}
                        <span className="text-white/60">({hero.role})</span>
                        <p className="text-xs text-white/60">{hero.highlight}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {factionEntries.length === 0 ? (
          <p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
            No heroes match that filter yet. Clear filters or add more MDX entries in
            <code className="ml-2 rounded bg-white/10 px-2 py-1">content/heroes/</code>.
          </p>
        ) : (
          <div className="space-y-12">
            {factionEntries.map(([faction, heroes]) => (
              <section key={faction}>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-white">{faction}</h2>
                  <span className="text-sm text-white/70">
                    {heroes.length} hero{heroes.length === 1 ? "" : "es"}
                  </span>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {heroes.map((hero) => (
                    <HeroCard
                      key={hero.slug}
                      hero={hero}
                      tierInfo={
                        tierMap[hero.slug]
                          ? {
                              tier: tierMap[hero.slug].tier,
                              title: tierMap[hero.slug].tierTitle,
                            }
                          : undefined
                      }
                      href={`/heroes/${hero.slug}`}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
