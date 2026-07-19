import {
  Download,
  FileCheck2,
  MapPin,
  Plane,
  Route,
  ShieldCheck,
  Smartphone,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/Section";
import type {
  LandingIconName,
  LandingPageDefinition,
} from "@/data/landings";

const icons: Record<LandingIconName, LucideIcon> = {
  wallet: WalletCards,
  shield: ShieldCheck,
  route: Route,
  smartphone: Smartphone,
  "file-check": FileCheck2,
  "map-pin": MapPin,
  download: Download,
  plane: Plane,
};

export function LandingBenefitGrid({
  definition,
}: {
  definition: LandingPageDefinition;
}) {
  return (
    <Section variant="light" spacing="compact">
      <div className="grid border-y border-ink/12 md:grid-cols-3" data-testid="landing-benefits">
        {definition.benefits.map((benefit, index) => {
          const Icon = icons[benefit.icon];
          return (
            <div
              key={benefit.title}
              className={`py-7 md:px-7 md:py-9 ${
                index > 0 ? "border-t border-ink/12 md:border-l md:border-t-0" : ""
              }`}
            >
              <Icon aria-hidden="true" className="text-jade" size={27} strokeWidth={1.7} />
              <h2 className="mt-5 text-2xl leading-tight text-ink">{benefit.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink/65">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
