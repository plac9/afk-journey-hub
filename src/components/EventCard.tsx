import Link from "next/link";
import type { Event } from "contentlayer/generated";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

type EventCardProps = {
  event: Event;
  href?: string;
};

export function EventCard({ event, href }: EventCardProps) {
  const card = (
    <article className="rounded-3xl border border-white/5 bg-white/5 p-5 text-white transition hover:border-white/20 hover:bg-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <span className="text-xs uppercase tracking-[0.3em] text-rose-200">
          {event.priority}
        </span>
      </div>
      <p className="mt-2 text-sm text-white/80">{event.summary}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/70">
        {formatDate(event.start)} – {formatDate(event.end)} · {event.mode}
      </p>
      <p className="mt-2 text-sm text-white/60">
        Rewards: {event.rewardSummary}
      </p>
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
