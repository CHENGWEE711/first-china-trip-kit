const rows = [
  ["Basic preparation checklist", "Yes", "Yes", "Yes"],
  ["Full payment setup", "No", "Yes", "Yes - complete $7 guide included"],
  ["App setup", "Basic", "Full", "Full"],
  ["Payment troubleshooting", "No", "Yes", "Yes"],
  ["Internet planning", "Basic", "Basic", "Full"],
  ["First 24-hour plan", "No", "Short", "Full"],
  ["Mobile quick cards", "No", "No", "10 bilingual cards"],
  ["Fillable Arrival Sheet", "No", "No", "Yes"],
  ["Troubleshooting flowcharts", "No", "Partial", "5 full flows"],
  ["Offline printable pack", "Basic", "Partial", "Full 7-file pack"],
] as const;

type ProductLadderComparisonProps = {
  id?: string;
  title?: string;
};

export function ProductLadderComparison({
  id,
  title = "Choose the setup help that matches your trip",
}: ProductLadderComparisonProps) {
  return (
    <section id={id} className="bg-mist px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-wide text-ember">Compare before you buy</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-bold leading-tight text-ink">{title}</h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink/68">
          The $19 Bundle includes the complete $7 Payment &amp; Apps Guide. You never need to buy both for payment and app setup.
        </p>

        <div className="mt-6 grid gap-3 md:hidden">
          {rows.map(([feature, free, guide, bundle]) => (
            <article key={feature} className="rounded-lg border border-ink/10 bg-paper p-4 shadow-soft">
              <h3 className="text-base font-bold leading-tight text-ink">{feature}</h3>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-xs leading-relaxed text-ink/70">
                <div><dt className="font-bold uppercase text-ink/48">Free</dt><dd className="mt-1">{free}</dd></div>
                <div><dt className="font-bold uppercase text-ink/48">$7 guide</dt><dd className="mt-1">{guide}</dd></div>
                <div><dt className="font-bold uppercase text-ember">$19 bundle</dt><dd className="mt-1 font-semibold text-ink">{bundle}</dd></div>
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-6 hidden overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-soft md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink text-white">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold">Feature</th>
                <th scope="col" className="px-4 py-3 font-bold">Free Checklist</th>
                <th scope="col" className="px-4 py-3 font-bold">$7 Guide</th>
                <th scope="col" className="px-4 py-3 font-bold">$19 Bundle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {rows.map(([feature, free, guide, bundle]) => (
                <tr key={feature} className="even:bg-sand/50">
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">{feature}</th>
                  <td className="px-4 py-3 text-ink/70">{free}</td>
                  <td className="px-4 py-3 text-ink/70">{guide}</td>
                  <td className="px-4 py-3 font-semibold text-ink">{bundle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/58">Already own the $7 guide? Contact us before purchasing the Bundle. An automatic upgrade discount is not currently offered.</p>
      </div>
    </section>
  );
}
