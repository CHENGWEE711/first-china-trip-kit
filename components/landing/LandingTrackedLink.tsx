"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import type {
  LandingAction,
  LandingName,
} from "@/data/landings";
import {
  resolveLandingTrafficSource,
  trackLandingEvent,
} from "@/lib/landing/analytics";
import { cn } from "@/lib/utils";

type LandingTrackedLinkProps = {
  action: LandingAction;
  landingName: LandingName;
  children?: ReactNode;
  className?: string;
  testId?: string;
};

export function LandingTrackedLink({
  action,
  landingName,
  children,
  className,
  testId,
}: LandingTrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackLandingEvent(action.eventName, {
      landing_name: landingName,
      traffic_source: resolveLandingTrafficSource(window.location.search),
      cta_name: action.ctaName,
      interaction_type: action.download ? "download" : "click",
    });

    if (action.href.startsWith("#")) {
      const targetId = action.href.slice(1);
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.focus({ preventScroll: true });
      });
    }

    if (action.download && event.currentTarget.download === "") {
      event.currentTarget.download = action.download;
    }
  }

  const commonProps = {
    className: cn(className),
    onClick: handleClick,
    "data-landing-cta": action.ctaName,
    "data-testid": testId,
  };

  if (action.download) {
    return (
      <a href={action.href} download={action.download} {...commonProps}>
        {children || action.label}
      </a>
    );
  }

  return (
    <Link href={action.href} {...commonProps}>
      {children || action.label}
    </Link>
  );
}
