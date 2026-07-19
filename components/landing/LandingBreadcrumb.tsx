import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { LandingPageDefinition } from "@/data/landings";

export function LandingBreadcrumb({
  definition,
}: {
  definition: LandingPageDefinition;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink/70">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition hover:text-ember">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={14} />
        </li>
        <li aria-current="page" className="font-semibold text-ink/72">
          {definition.breadcrumbLabel}
        </li>
      </ol>
    </nav>
  );
}
