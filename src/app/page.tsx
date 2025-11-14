import Link from "next/link";
import type { Hero } from "contentlayer/generated";
import { allEvents, allHeros, allNews } from "contentlayer/generated";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

function HeroTags({ hero }: { hero: Hero }) {
  return (
    <div className="flex flex-wrap gap-2">
      {[hero.faction, hero.role, hero.class, ...hero.tags.slice(0, 2)].map(
        (tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/90"
          >
            {tag}
          </span>
        ),
      )}
    </div>
  );
}

export default function Home() {
  const featuredHero = allHeros.find((hero) => hero.featured) ?? allHeros[0];
  const supportingHeroes: Hero[] = allHeros
    .filter((hero) => hero.slug !== featuredHero.slug)
    .slice(0, 2);

  const upcomingEvents = [...allEvents]
    .sort(
      (a, b) =>
        new Date(a.start).getTime() - new Date(b.start).getTime(),
    )
    .slice(0, 3);

  const recentNews = [...allNews]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-10 shadow-2xl shadow-rose-500/10">
          <p className="text-sm uppercase tracking-widest text-rose-300">
            AFK Journey Hub · Live Preview
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Track hero spotlights, event countdowns, and patch intel without
            leaving your phone.
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-200">
            Contentlayer keeps hero loadouts, calculators, and live ops data in
            sync so strategists can prep before the daily reset hits.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="space-y-5 rounded-3xl border border-white/10 bg-gradient-to-br from-rose-500/20 via-rose-500/10 to-slate-900 p-6 shadow-xl shadow-rose-900/30 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-rose-200">
                  Hero Focus
                </p>
                <h2 className="text-3xl font-semibold text-white">
                  {featuredHero.name}
                </h2>
              </div>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase text-white/80">
                Legendary Intel
              </span>
            </div>
            <p className="text-base text-slate-100">{featuredHero.summary}</p>
            <HeroTags hero={featuredHero} />
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <strong className="text-white">Signature:</strong>{" "}
                {featuredHero.signatureItem}
              </li>
              <li>
                <strong className="text-white">Exclusive Furniture:</strong>{" "}
                {featuredHero.exclusiveFurniture}
              </li>
            </ul>
            <Link
              href={`/heroes/${featuredHero.slug}`}
              className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-5 py-2 text-sm font-semibold text-white hover:bg-white/20"
            >
              View hero guide
            </Link>
          </article>
          <article className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
              Backup Picks
            </p>
            <div className="space-y-4">
              {supportingHeroes.map((hero) => (
                <div
                  key={hero.slug}
                  className="rounded-2xl border border-white/5 bg-white/5 p-4"
                >
                  <p className="text-lg font-semibold text-white">
                    {hero.name}
                  </p>
                  <p className="text-sm text-white/80">{hero.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
                    {hero.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-white">
                Event Countdown
              </h3>
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                {upcomingEvents.length} scheduled
              </span>
            </div>
            <ul className="mt-4 space-y-4">
              {upcomingEvents.map((event) => (
                <li
                  key={event.slug}
                  className="rounded-2xl border border-white/5 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-white">
                      {event.title}
                    </p>
                    <span className="text-xs uppercase tracking-[0.3em] text-rose-200">
                      {event.priority}
                    </span>
                  </div>
                  <p className="text-sm text-white/80">{event.summary}</p>
                  <p className="mt-2 text-sm text-white/70">
                    {formatDate(event.start)} – {formatDate(event.end)} ·{" "}
                    {event.mode}
                  </p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-white">
                Latest Intel
              </h3>
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                Patch Notes & Codes
              </span>
            </div>
            <ul className="mt-4 space-y-4">
              {recentNews.map((item) => (
                <li
                  key={item.slug}
                  className="rounded-2xl border border-white/5 bg-white/5 p-4"
                >
                  <p className="text-lg font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-white/80">{item.summary}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-white/60">
                    <span>{formatDate(item.publishedAt)}</span>
                    <a
                      href={item.sourceUrl}
                      className="font-medium text-rose-200 underline-offset-4 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-center shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
            Next Steps
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-white">
            Wire calculators & data sync into this dashboard.
          </h3>
          <p className="mt-3 text-slate-200">
            Run <code className="rounded bg-white/10 px-2 py-1">npm run dev</code>{" "}
            to explore the scaffold. Content updates happen by editing MDX under{" "}
            <code className="rounded bg-white/10 px-2 py-1">content/</code>.
          </p>
        </section>
      </div>
    </main>
  );
}
