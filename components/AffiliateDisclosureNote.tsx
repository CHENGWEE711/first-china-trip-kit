import Link from "next/link";

type AffiliateDisclosureNoteProps = {
  className?: string;
};

export function AffiliateDisclosureNote({ className = "" }: AffiliateDisclosureNoteProps) {
  return (
    <p className={`text-sm leading-relaxed text-ink/58 ${className}`}>
      Affiliate disclosure: We may earn a commission if you book through this link,
      at no extra cost to you. Read our{" "}
      <Link
        href="/affiliate-disclosure"
        className="font-semibold text-ember underline-offset-4 hover:underline"
      >
        Affiliate Disclosure
      </Link>
      .
    </p>
  );
}
