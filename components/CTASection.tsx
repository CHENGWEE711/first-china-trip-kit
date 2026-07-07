import { ButtonLink } from "@/components/ButtonLink";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTASection({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CTASectionProps) {
  return (
    <section className="bg-ink px-4 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        {eyebrow ? (
          <p className="mb-3 text-sm font-bold uppercase text-clay">{eyebrow}</p>
        ) : null}
        <h2 className="max-w-3xl text-3xl font-bold leading-tight">{title}</h2>
        <p className="mt-3 max-w-3xl text-base text-white/72">{description}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
          {secondaryHref && secondaryLabel ? (
            <ButtonLink href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
