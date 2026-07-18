"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { getStoredUtmAttribution } from "@/lib/utm";
import { cn } from "@/lib/utils";

type TrackedLinkProps = {
  children: ReactNode;
  className?: string;
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
  href: string;
  onClick?: () => void;
};

export function TrackedLink({
  children,
  className,
  eventName,
  eventParams,
  href,
  onClick,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        trackEvent(eventName, {
          destination_url: href,
          ...getStoredUtmAttribution(),
          ...eventParams,
        });
        onClick?.();
      }}
      className={cn(className)}
    >
      {children}
    </Link>
  );
}
