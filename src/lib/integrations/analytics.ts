const siteId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export function getAnalyticsConfig() {
  return {
    siteId,
    siteUrl,
    enabled: Boolean(siteId && siteUrl),
  };
}

type PlausibleFn = (eventName: string, options?: { props?: Record<string, unknown> }) => void;

export function trackClientEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const plausible = (window as Window & { plausible?: PlausibleFn }).plausible;
  if (typeof plausible === "function") {
    plausible(event, { props: payload ?? {} });
  }
}
