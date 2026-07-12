import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { buttonClassName } from "@/components/Button";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = true,
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        variant === "primary" && buttonClassName("primary"),
        variant === "secondary" && buttonClassName("secondary", "bg-surface"),
        variant === "ghost" &&
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink/15 bg-paper px-5 py-3 text-[15px] font-semibold text-ink transition hover:border-ember/40 hover:text-ember focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2",
        className,
      )}
    >
      <span>{children}</span>
      {icon ? <ArrowRight aria-hidden="true" size={18} /> : null}
    </Link>
  );
}
