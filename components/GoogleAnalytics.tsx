import { GoogleAnalyticsPageView } from "@/components/GoogleAnalyticsPageView";
import { isAnalyticsDebugEnabled, isPreviewDeployment, isProductionDeployment } from "@/lib/runtime";

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const enablePreviewDebug = isPreviewDeployment && isAnalyticsDebugEnabled;
  const requiresPreviewDebug =
    process.env.VERCEL_ENV !== "production" && !isProductionDeployment;

  if (!gaId || (requiresPreviewDebug && !enablePreviewDebug)) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(gaId)}, ${JSON.stringify(enablePreviewDebug ? { debug_mode: true } : {})});
        `,
        }}
      />
      <GoogleAnalyticsPageView />
    </>
  );
}
