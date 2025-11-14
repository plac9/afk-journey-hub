import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { News } from "contentlayer/generated";
import { allNews } from "contentlayer/generated";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
});

export async function generateStaticParams() {
  return allNews.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = allNews.find((entry) => entry.slug === params.slug);
  if (!item) return {};

  return {
    title: `${item.title} · News`,
    description: item.summary,
  };
}

export default function NewsDetail({ params }: { params: { slug: string } }) {
  const item = allNews.find((entry) => entry.slug === params.slug) as News | undefined;
  if (!item) return notFound();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/news"
          className="text-sm uppercase tracking-[0.3em] text-rose-200 hover:text-rose-100"
        >
          ← Back to news
        </Link>
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
            {item.category}
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">{item.title}</h1>
          <p className="mt-3 text-base text-white/80">{item.summary}</p>
          <div className="mt-4 text-sm text-white/70">
            <p>
              {dateFormatter.format(new Date(item.publishedAt))} ·{" "}
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="ml-2 text-rose-300 underline-offset-4 hover:underline"
              >
                Source
              </a>
            </p>
          </div>
        </header>
        <section className="prose prose-invert max-w-none">
          <ReactMarkdown>{item.body.raw}</ReactMarkdown>
        </section>
      </div>
    </main>
  );
}
