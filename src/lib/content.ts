import type { Hero } from "contentlayer/generated";
import { allEvents, allHeros, allNews } from "contentlayer/generated";

export function getHeroesByFaction() {
  return allHeros.reduce<Record<string, Hero[]>>((groups, hero) => {
    if (!groups[hero.faction]) {
      groups[hero.faction] = [];
    }
    groups[hero.faction].push(hero);
    return groups;
  }, {});
}

export function getSortedHeroes() {
  return [...allHeros].sort((a, b) => a.name.localeCompare(b.name));
}

export function getUpcomingEvents() {
  return [...allEvents].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );
}

export function getRecentNews(limit?: number) {
  const sorted = [...allNews].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}
