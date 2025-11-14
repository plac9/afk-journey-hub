import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { getUpcomingEvents } from "@/lib/content";
import { getEventRotations } from "@/lib/data/eventRotations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming AFK Journey events with countdown-ready metadata.",
};

type EventsPageProps = {
  searchParams?: { priority?: string };
};

export default function EventsPage({ searchParams }: EventsPageProps) {
  const priority = (searchParams?.priority ?? "all").toLowerCase();
  const events = getUpcomingEvents().filter((event) => {
    if (priority === "all") return true;
    return event.priority === priority;
  });
  const rotations = getEventRotations();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
            Live Ops
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            Upcoming Events
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/80">
            Metadata lives inside `content/events/*.mdx`, so editors can open PRs
            to adjust timers, rewards, or strategy notes. This feed powers the
            home page countdowns and future widgets.
          </p>
        </header>

        <form className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
          <label className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              Priority
            </span>
            <select
              name="priority"
              defaultValue={priority}
              className="rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-white focus:border-white/60 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-2xl bg-rose-500 px-6 py-2 font-semibold text-white hover:bg-rose-400"
          >
            Filter
          </button>
          <Link
            href="/events"
            className="rounded-2xl border border-white/20 px-6 py-2 font-semibold text-white/80 hover:border-white/60"
          >
            Reset
          </Link>
        </form>

        {events.length === 0 ? (
          <p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
            No events match that filter. Reset filters or add more entries under
            <code className="ml-2 rounded bg-white/10 px-2 py-1">content/events/</code>.
          </p>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <EventCard
                key={event.slug}
                event={event}
                href={`/events/${event.slug}`}
              />
            ))}
          </div>
        )}

        {rotations.length > 0 && (
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-rose-200">
                  Rotation Intel
                </p>
                <h2 className="text-2xl font-semibold text-white">Event Cheat Sheet</h2>
                <p className="mt-1 text-sm text-white/70">
                  Editable via <code className="rounded bg-white/10 px-2 py-1">data/event-rotations.yaml</code>{" "}
                  to capture cadence and prep notes for homelab dashboards.
                </p>
              </div>
              <Link
                href="https://github.com/plac9/afk-journey-hub/blob/main/data/event-rotations.yaml"
                className="text-sm font-semibold text-rose-200 underline-offset-4 hover:underline"
              >
                Edit YAML
              </Link>
            </header>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {rotations.map((rotation) => (
                <article
                  key={rotation.mode}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                        {rotation.cadence} cadence
                      </p>
                      <h3 className="text-xl font-semibold">{rotation.mode}</h3>
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-rose-200">
                      {rotation.resetWindow}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/80">{rotation.focus}</p>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    {rotation.callouts.map((callout) => (
                      <li key={callout} className="rounded-xl bg-white/5 px-3 py-2">
                        {callout}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
