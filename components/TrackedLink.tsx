"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type TrackedLinkProps = {
  children: ReactNode;
  className?: string;
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
  href: string;
};

export function TrackedLink({
  children,
  className,
  eventName,
  eventParams,
  href,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => trackEvent(eventName, eventParams)}
      className={cn(className)}
    >
      {children}
    </Link>
  );
}
