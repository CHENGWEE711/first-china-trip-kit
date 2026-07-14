"use client";

import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { buildUtmUrl } from "@/lib/utm";
import { cn } from "@/lib/utils";

type PayhipChecklistLinkProps = {
  children?: ReactNode;
  className?: string;
  source?: string;
  variant?: "primary" | "ghost";
};

const payhipChecklistUrl = process.env.NEXT_PUBLIC_PAYHIP_CHECKLIST_URL || "";

export function PayhipChecklistLink({
  children = "Download / Support on Payhip",
  className,
  source = "site",
  variant = "primary",
}: PayhipChecklistLinkProps) {
  if (!payhipChecklistUrl) {
    return null;
  }

  const trackedPayhipUrl = buildUtmUrl(payhipChecklistUrl, {
    utm_source: "firstchinatripkit",
    utm_medium: "website",
    utm_content: `${source}_china-first-trip-checklist`,
  });

  return (
    <a
      href={trackedPayhipUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("payhip_checklist_clicked", {
          source_page: window.location.pathname,
          placement: source,
          product: "China First Trip Checklist",
        })
      }
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-center text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2",
        variant === "primary" && "bg-ember text-white shadow-soft hover:bg-ember-hover",
        variant === "ghost" &&
          "border border-ink/12 bg-paper text-ink hover:border-ember/35 hover:text-ember",
        className,
      )}
    >
      <span>{children}</span>
      <ExternalLink aria-hidden="true" size={17} />
    </a>
  );
}
