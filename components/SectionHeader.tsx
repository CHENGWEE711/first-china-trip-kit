import { ButtonLink } from "@/components/ButtonLink";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  inverse?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
  inverse = false,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.12em] ${inverse ? "text-mist" : "text-ember"}`}>{eyebrow}</p>
        ) : null}
        <h2 className={`text-4xl leading-tight md:text-5xl ${inverse ? "text-white" : "text-ink"}`}>{title}</h2>
        {description ? <p className={`mt-3 text-base ${inverse ? "text-white/70" : "text-ink/70"}`}>{description}</p> : null}
      </div>
      {actionHref && actionLabel ? (
        <ButtonLink href={actionHref} variant="ghost">
          {actionLabel}
        </ButtonLink>
      ) : null}
    </div>
  );
}
