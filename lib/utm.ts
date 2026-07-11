export const DEFAULT_UTM_CAMPAIGN = "china_first_trip_launch";
export const UTM_STORAGE_KEY = "fctk_utm_attribution";

export type UtmAttribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
};

const emptyAttribution: UtmAttribution = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
};

export function readUtmParams(search: string): UtmAttribution {
  const params = new URLSearchParams(search);

  return {
    utm_source: params.get("utm_source")?.trim() || "",
    utm_medium: params.get("utm_medium")?.trim() || "",
    utm_campaign: params.get("utm_campaign")?.trim() || "",
    utm_content: params.get("utm_content")?.trim() || "",
  };
}

export function hasUtmAttribution(attribution: UtmAttribution) {
  return Object.values(attribution).some(Boolean);
}

export function captureUtmAttribution() {
  if (typeof window === "undefined") {
    return emptyAttribution;
  }

  const current = readUtmParams(window.location.search);

  if (hasUtmAttribution(current)) {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(current));
    return current;
  }

  return getStoredUtmAttribution();
}

export function getStoredUtmAttribution(): UtmAttribution {
  if (typeof window === "undefined") {
    return emptyAttribution;
  }

  try {
    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? { ...emptyAttribution, ...JSON.parse(stored) } : emptyAttribution;
  } catch {
    return emptyAttribution;
  }
}

export function buildUtmUrl(
  destination: string,
  attribution: Partial<UtmAttribution> & Pick<UtmAttribution, "utm_source" | "utm_medium">,
) {
  const url = new URL(destination);
  const values: UtmAttribution = {
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign || DEFAULT_UTM_CAMPAIGN,
    utm_content: attribution.utm_content || "",
  };

  Object.entries(values).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}
