type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {eyebrow ? <p className="mb-3 text-sm font-bold uppercase text-ember">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-ink">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-ink/70">{description}</p>
      </div>
    </section>
  );
}
