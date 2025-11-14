import Link from "next/link";
import type { Hero } from "contentlayer/generated";

type HeroCardProps = {
  hero: Hero;
  href?: string;
  tierInfo?: {
    tier: string;
    title: string;
  };
};

export function HeroCard({ hero, href, tierInfo }: HeroCardProps) {
  const card = (
    <article className="rounded-3xl border border-white/5 bg-white/5 p-5 text-white transition hover:border-white/20 hover:bg-white/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-200">
            {hero.faction}
          </p>
          <h3 className="text-2xl font-semibold">{hero.name}</h3>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide">
            {hero.rarity}
          </span>
          {tierInfo && (
            <span className="text-[10px] uppercase tracking-[0.3em] text-rose-200">
              Tier {tierInfo.tier}
            </span>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-white/80">{hero.summary}</p>
      <dl className="mt-4 space-y-1 text-xs uppercase tracking-wide text-white/70">
        <div className="flex justify-between">
          <dt>Class</dt>
          <dd>{hero.class}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Role</dt>
          <dd>{hero.role}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Signature</dt>
          <dd>{hero.signatureItem}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Furniture</dt>
          <dd>{hero.exclusiveFurniture}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        {hero.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/80"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block focus:outline-none focus-visible:ring">
        {card}
      </Link>
    );
  }

  return card;
}
