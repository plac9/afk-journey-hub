import Link from "next/link";
import type { News } from "contentlayer/generated";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

type NewsCardProps = {
  item: News;
  href?: string;
};

export function NewsCard({ item, href }: NewsCardProps) {
  const card = (
    <article className="rounded-3xl border border-white/5 bg-white/5 p-5 text-white transition hover:border-white/20 hover:bg-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <span className="text-xs uppercase tracking-[0.3em] text-rose-200">
          {item.category}
        </span>
      </div>
      <p className="mt-2 text-sm text-white/80">{item.summary}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-white/60">
        <span>{dateFormatter.format(new Date(item.publishedAt))}</span>
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-rose-200 underline-offset-4 hover:underline"
        >
          Source
        </a>
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
