type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="editorial-section bg-paper">
      <div className="editorial-container">
        {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-widest text-ember">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-5xl leading-[1.08] text-ink md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg text-ink/65">{description}</p>
      </div>
    </section>
  );
}
