import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Event } from "contentlayer/generated";
import { allEvents } from "contentlayer/generated";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
});

export async function generateStaticParams() {
  return allEvents.map((event) => ({ slug: event.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const event = allEvents.find((entry) => entry.slug === params.slug);
  if (!event) return {};

  return {
    title: `${event.title} · Event Guide`,
    description: event.summary,
  };
}

export default function EventDetail({ params }: { params: { slug: string } }) {
  const event = allEvents.find((entry) => entry.slug === params.slug) as Event | undefined;
  if (!event) return notFound();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/events"
          className="text-sm uppercase tracking-[0.3em] text-rose-200 hover:text-rose-100"
        >
          ← Back to events
        </Link>
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
            {event.mode}
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            {event.title}
          </h1>
          <p className="mt-3 text-base text-white/80">{event.summary}</p>
          <dl className="mt-4 grid gap-4 text-sm text-white/70 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                Window
              </dt>
              <dd>
                {dateFormatter.format(new Date(event.start))} –{" "}
                {dateFormatter.format(new Date(event.end))}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                Rewards
              </dt>
              <dd>{event.rewardSummary}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                Priority
              </dt>
              <dd>{event.priority}</dd>
            </div>
            {event.featuredTeams && event.featuredTeams.length > 0 && (
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Featured Teams
                </dt>
                <dd>{event.featuredTeams.join(", ")}</dd>
              </div>
            )}
          </dl>
        </header>
        <section className="prose prose-invert max-w-none">
          <ReactMarkdown>{event.body.raw}</ReactMarkdown>
        </section>
      </div>
    </main>
  );
}
