"use client";

import Script from "next/script";

export function AnalyticsSnippet() {
  const analyticsDomain = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  if (!analyticsDomain) return null;

  return (
    <>
      <Script
        src="https://plausible.io/js/script.outbound-links.js"
        data-domain={analyticsDomain}
        strategy="lazyOnload"
      />
      <Script id="plausible-init" strategy="lazyOnload">
        {`
          window.plausible =
            window.plausible ||
            function () {
              (window.plausible.q = window.plausible.q || []).push(arguments);
            };
        `}
      </Script>
    </>
  );
}
