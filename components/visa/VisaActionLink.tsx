"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { VISA_POLICY_META } from "@/data/visa";
import { trackVisaEvent, type VisaAnalyticsInteractionType } from "@/lib/visa/analytics";
import { cn } from "@/lib/utils";

type VisaActionLinkProps = {
  children: ReactNode;
  className?: string;
  eventName:
    | "visa_policy_source_clicked"
    | "visa_to_payment_hub_clicked"
    | "visa_guide_clicked"
    | "visa_official_arrival_card_clicked"
    | "visa_12367_clicked";
  href: string;
  interactionType: VisaAnalyticsInteractionType;
  target?: "_blank";
};

export function VisaActionLink({
  children,
  className,
  eventName,
  href,
  interactionType,
  target,
}: VisaActionLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={() =>
        trackVisaEvent(eventName, {
          interaction_type: interactionType,
          policy_version: VISA_POLICY_META.policyVersion,
        })
      }
      className={cn(className)}
    >
      {children}
    </Link>
  );
}
