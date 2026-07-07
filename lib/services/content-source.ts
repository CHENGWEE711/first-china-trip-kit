import { cities } from "@/data/cities";
import { guides } from "@/data/guides";
import { itineraries } from "@/data/itineraries";

export type ContentSource = "local" | "supabase";

export const activeContentSource: ContentSource =
  (process.env.CONTENT_SOURCE as ContentSource | undefined) || "local";

export function getLocalContent() {
  return {
    cities,
    itineraries,
    guides,
  };
}

export async function getSupabaseContent() {
  // Future integration point: map Supabase rows into the same shape exported by
  // data/cities.ts, data/itineraries.ts, and data/guides.ts.
  throw new Error("Supabase CMS is not configured yet.");
}
