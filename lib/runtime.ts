export const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

export const isProductionDeployment =
  process.env.VERCEL_ENV === "production" ||
  (!process.env.VERCEL_ENV && process.env.NODE_ENV === "production");

export const isAnalyticsDebugEnabled = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";
