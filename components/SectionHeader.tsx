import { ButtonLink } from "@/components/ButtonLink";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ember">{eyebrow}</p>
        ) : null}
        <h2 className="text-4xl leading-tight text-ink md:text-5xl">{title}</h2>
        {description ? <p className="mt-3 text-base text-ink/68">{description}</p> : null}
      </div>
      {actionHref && actionLabel ? (
        <ButtonLink href={actionHref} variant="ghost">
          {actionLabel}
        </ButtonLink>
      ) : null}
    </div>
  );
}
