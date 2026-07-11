import Script from "next/script";

const metricoolTrackerUrl = "https://tracker.metricool.com/resources/be.js";
const metricoolHash = "1abc11cf9e2d5eeb6d0c61f3792985f0";

export function MetricoolAnalytics() {
  if (process.env.VERCEL_ENV !== "production") return null;

  return (
    <Script id="metricool-analytics" strategy="afterInteractive">
      {`
        (function () {
          var initialized = false;
          var script = document.createElement("script");

          function initializeMetricool() {
            if (initialized) return;
            if (window.beTracker && typeof window.beTracker.t === "function") {
              initialized = true;
              window.beTracker.t({ hash: "${metricoolHash}" });
            }
          }

          script.type = "text/javascript";
          script.src = "${metricoolTrackerUrl}";
          script.onload = initializeMetricool;
          script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              initializeMetricool();
            }
          };

          document.head.appendChild(script);
        })();
      `}
    </Script>
  );
}
