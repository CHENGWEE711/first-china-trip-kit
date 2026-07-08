"use client";

import type { ReactNode } from "react";
import { Coffee } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type CoffeeTipLinkProps = {
  children?: ReactNode;
  className?: string;
  source?: string;
  variant?: "button" | "subtle";
};

const coffeeTipUrl = process.env.NEXT_PUBLIC_COFFEE_TIP_URL || "";

export function CoffeeTipLink({
  children = "Buy us a coffee",
  className,
  source = "site",
  variant = "button",
}: CoffeeTipLinkProps) {
  if (!coffeeTipUrl) {
    return null;
  }

  return (
    <a
      href={coffeeTipUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("coffee_tip_clicked", { source })}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2",
        variant === "button" &&
          "border border-ink/12 bg-paper px-4 py-2 text-ink hover:border-ember/35 hover:text-ember",
        variant === "subtle" &&
          "min-h-0 justify-start px-0 py-0 text-sm text-white/60 hover:text-white",
        className,
      )}
    >
      <Coffee aria-hidden="true" size={variant === "subtle" ? 15 : 17} />
      <span>{children}</span>
    </a>
  );
}
