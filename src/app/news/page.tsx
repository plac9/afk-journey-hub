import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import { getRecentNews } from "@/lib/content";
import { getPromoCodes } from "@/lib/data/promoCodes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description: "Patch notes, banner announcements, and promo code updates.",
};

type NewsPageProps = {
  searchParams?: { q?: string; category?: string };
};

export default function NewsPage({ searchParams }: NewsPageProps) {
  const query = searchParams?.q?.toLowerCase().trim() ?? "";
  const categoryFilter = searchParams?.category ?? "all";

  const newsItems = getRecentNews().filter((item) => {
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query);
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  const promoCodes = getPromoCodes()
    .filter((entry) => new Date(entry.expires) >= new Date())
    .sort(
      (a, b) =>
        new Date(a.expires).getTime() - new Date(b.expires).getTime(),
    );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
            Newsroom
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            Patch Notes & Codes
          </h1>
          <p className="mt-3 text-base text-white/80">
            Entries originate from Markdown files under `content/news/` so we can
            cite sources, summarize changes, and expose the data to JSON APIs or
            RSS feeds in the future.
          </p>
        </header>

        <form className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/80 sm:flex-row">
          <label className="flex-1">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              Search
            </span>
            <input
              type="text"
              name="q"
              defaultValue={query}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-white focus:border-white/60 focus:outline-none"
              placeholder="patch, dream realm, promo..."
            />
          </label>
          <label className="sm:w-52">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              Category
            </span>
            <select
              name="category"
              defaultValue={categoryFilter}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-white focus:border-white/60 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="patch-notes">Patch notes</option>
              <option value="event">Event</option>
              <option value="codes">Codes</option>
              <option value="roadmap">Roadmap</option>
            </select>
          </label>
          <button
            type="submit"
            className="mt-2 rounded-2xl bg-rose-500 px-6 py-3 font-semibold text-white hover:bg-rose-400 sm:mt-auto"
          >
            Filter
          </button>
          <Link
            href="/news"
            className="mt-2 rounded-2xl border border-white/20 px-6 py-3 text-center font-semibold text-white/80 hover:border-white/60 sm:mt-auto"
          >
            Reset
          </Link>
        </form>

        {newsItems.length === 0 ? (
          <p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
            No news entries match that filter. Reset filters or add more files under
            <code className="ml-2 rounded bg-white/10 px-2 py-1">content/news/</code>.
          </p>
        ) : (
          <div className="grid gap-4">
            {newsItems.map((item) => (
              <NewsCard key={item.slug} item={item} href={`/news/${item.slug}`} />
            ))}
          </div>
        )}

        {promoCodes.length > 0 && (
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <h2 className="text-2xl font-semibold">Active Promo Codes</h2>
            <p className="mt-2 text-sm text-white/80">
              Parsed from `data/promo-codes.yaml` so anyone can update rewards via pull
              request before publishing announcements.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[400px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-white/70">
                  <tr>
                    <th className="py-2">Code</th>
                    <th className="py-2">Reward</th>
                    <th className="py-2">Expires</th>
                    <th className="py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {promoCodes.map((entry) => (
                    <tr key={entry.code} className="border-t border-white/5">
                      <td className="py-2 font-semibold">{entry.code}</td>
                      <td className="py-2">{entry.reward}</td>
                      <td className="py-2">
                        {new Date(entry.expires).toLocaleDateString()}
                      </td>
                      <td className="py-2 text-white/70">{entry.notes ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
