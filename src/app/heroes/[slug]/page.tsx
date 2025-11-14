import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Hero } from "contentlayer/generated";
import { allHeros } from "contentlayer/generated";
import { getHeroTierMap } from "@/lib/data/heroTiers";

export async function generateStaticParams() {
  return allHeros.map((hero) => ({ slug: hero.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const hero = allHeros.find((entry) => entry.slug === params.slug);
  if (!hero) return {};

  return {
    title: `${hero.name} · Hero Guide`,
    description: hero.summary,
  };
}

export default function HeroDetail({ params }: { params: { slug: string } }) {
  const hero = allHeros.find((entry) => entry.slug === params.slug) as Hero | undefined;
  if (!hero) {
    return notFound();
  }
  const tierMap = getHeroTierMap();
  const tierInfo = tierMap[hero.slug];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/heroes"
          className="text-sm uppercase tracking-[0.3em] text-rose-200 hover:text-rose-100"
        >
          ← Back to heroes
        </Link>
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
            {hero.faction} · {hero.role}
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">{hero.name}</h1>
          <p className="mt-3 text-base text-white/80">{hero.summary}</p>
          {tierInfo && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-200">
                Tier {tierInfo.tier}
              </p>
              <p className="mt-1 text-white">
                {tierInfo.highlight}
              </p>
              <p className="mt-1 text-white/60">{tierInfo.tierTitle}</p>
            </div>
          )}
          <dl className="mt-4 grid gap-4 text-sm text-white/70 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                Class
              </dt>
              <dd>{hero.class}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                Signature Item
              </dt>
              <dd>{hero.signatureItem}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                Exclusive Furniture
              </dt>
              <dd>{hero.exclusiveFurniture}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                Position
              </dt>
              <dd>{hero.position}</dd>
            </div>
          </dl>
        </header>

        <section className="prose prose-invert max-w-none">
          <ReactMarkdown>{hero.body.raw}</ReactMarkdown>
        </section>
      </div>
    </main>
  );
}
