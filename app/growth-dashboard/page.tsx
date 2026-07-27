import type { Metadata } from "next";
import { BarChart3, FileWarning } from "lucide-react";
import { latestGrowthWeek, previousGrowthWeek, safeRate, weekChange, type GrowthMetric } from "@/data/growth-dashboard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Weekly Growth Dashboard | First China Trip Kit", description: "Internal weekly growth dashboard for verified acquisition, lead, product and affiliate metrics.", path: "/growth-dashboard" }),
  robots: { index: false, follow: false },
};

const metricDefinitions: { key: GrowthMetric; label: string; source: string }[] = [
  { key: "users", label: "Users", source: "GA4" }, { key: "sessions", label: "Sessions", source: "GA4" },
  { key: "searchClicks", label: "Search clicks", source: "Search Console" }, { key: "searchImpressions", label: "Search impressions", source: "Search Console" },
  { key: "toolStarts", label: "Free tool starts", source: "GA4" }, { key: "toolCompletions", label: "Free tool completions", source: "GA4" },
  { key: "emailLeads", label: "Email leads", source: "GA4 / provider" }, { key: "productClicks", label: "Product clicks", source: "GA4" },
  { key: "orders", label: "Verified orders", source: "Payhip" }, { key: "affiliateClicks", label: "Affiliate clicks", source: "GA4" },
];

function formatMetric(value: number | null) { return value === null ? "Awaiting data" : new Intl.NumberFormat("en-US").format(value); }
function formatPercent(value: number | null) { return value === null ? "Awaiting data" : `${value.toFixed(1)}%`; }

export default function GrowthDashboardPage() {
  const week = latestGrowthWeek;
  const funnel = [
    { label: "Sessions", value: week.metrics.sessions },
    { label: "Tool starts", value: week.metrics.toolStarts },
    { label: "Tool completions", value: week.metrics.toolCompletions },
    { label: "Email leads", value: week.metrics.emailLeads },
    { label: "Product clicks", value: week.metrics.productClicks },
    { label: "Verified orders", value: week.metrics.orders },
  ];
  const maxFunnel = Math.max(...funnel.map((item) => item.value || 0), 1);

  return <>
    <section className="bg-sand px-4 py-12"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-wide text-ember">Internal measurement workspace</p><h1 className="mt-2 flex items-center gap-3 text-4xl font-bold leading-tight text-ink"><BarChart3 aria-hidden="true" className="text-jade" />Weekly growth dashboard</h1><p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/68">Week ending {week.weekEnding}. This dashboard displays only approved aggregate imports. It never treats an unverified event, a click or a thank-you page as an order.</p></div></section>
    <section className="px-4 py-10"><div className="mx-auto max-w-7xl">
      <div role="status" className={`mb-8 flex gap-3 rounded-lg border p-4 ${week.sourceStatus === "verified" ? "border-jade/35 bg-mist" : "border-[#c8972c]/40 bg-[#fff7df]"}`}><FileWarning aria-hidden="true" className="shrink-0 text-ember" /><div><p className="font-bold text-ink">{week.sourceStatus === "verified" ? "Verified weekly import" : "Awaiting verified weekly import"}</p><p className="mt-1 text-sm leading-relaxed text-ink/68">{week.note || "Review the source exports and update the weekly data contract."}</p></div></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{metricDefinitions.map((metric) => { const change = weekChange(week.metrics[metric.key], previousGrowthWeek?.metrics[metric.key] ?? null); return <article key={metric.key} className="rounded-lg border border-ink/10 bg-paper p-4 shadow-soft"><p className="text-sm font-bold text-ink/58">{metric.label}</p><p className="mt-2 text-2xl font-bold text-ink">{formatMetric(week.metrics[metric.key])}</p><p className="mt-2 text-xs text-ink/48">{metric.source} · {change === null ? "No comparable prior week" : `${change >= 0 ? "+" : ""}${change.toFixed(1)}% vs prior week`}</p></article>; })}</div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"><h2 className="text-2xl font-bold leading-tight text-ink">Conversion funnel</h2><p className="mt-2 text-sm leading-relaxed text-ink/62">The primary decision path: visit, free tool, email, product intent, verified order.</p><ol className="mt-5 grid gap-4">{funnel.map((item, index) => { const preceding = index === 0 ? null : funnel[index - 1].value; const rate = index === 0 ? null : safeRate(item.value, preceding); const width = item.value === null ? 0 : Math.max(6, (item.value / maxFunnel) * 100); return <li key={item.label}><div className="flex justify-between gap-4 text-sm"><span className="font-semibold text-ink">{item.label}</span><span className="text-ink/62">{formatMetric(item.value)}{rate === null ? "" : ` · ${formatPercent(rate)}`}</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-sand"><div className="h-full rounded-full bg-jade" style={{ width: `${width}%` }} /></div></li>; })}</ol></section>
        <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"><h2 className="text-2xl font-bold leading-tight text-ink">Weekly interpretation notes</h2><ul className="mt-5 grid gap-4 text-base leading-relaxed text-ink/70"><li className="border-l-2 border-ember/35 pl-3">Orders must come from a verified Payhip order export or webhook. Product-click events are intent only.</li><li className="border-l-2 border-jade/35 pl-3">Use tool completion divided by starts for tool completion rate, then email leads divided by completions for result-capture rate.</li><li className="border-l-2 border-ink/20 pl-3">Compare query and landing-page trends with the same Search Console property and date range before acting on week-over-week movement.</li></ul><p className="mt-6 text-sm leading-relaxed text-ink/58">The repository data contract is documented in <code>docs/PHASE_5_GROWTH_DASHBOARD_DATA_CONTRACT.md</code>.</p></section>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">{[{ title: "Top search queries", rows: week.topQueries.map((row) => [row.query, String(row.clicks), String(row.impressions)]), headings: ["Query", "Clicks", "Impressions"] }, { title: "Top landing pages", rows: week.topLandingPages.map((row) => [row.path, String(row.users), String(row.searchClicks)]), headings: ["Page", "Users", "Search clicks"] }, { title: "Channels", rows: week.channels.map((row) => [row.channel, String(row.users), String(row.sessions)]), headings: ["Channel", "Users", "Sessions"] }].map((table) => <section key={table.title} className="overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-soft"><h2 className="p-5 text-xl font-bold leading-tight text-ink">{table.title}</h2>{table.rows.length ? <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-sand text-ink/65"><tr>{table.headings.map((heading) => <th key={heading} scope="col" className="px-4 py-3 text-left font-bold">{heading}</th>)}</tr></thead><tbody>{table.rows.map((row) => <tr key={row[0]} className="border-t border-ink/10">{row.map((cell) => <td key={cell} className="px-4 py-3 text-ink/70">{cell}</td>)}</tr>)}</tbody></table></div> : <p className="border-t border-ink/10 p-5 text-sm text-ink/58">Awaiting verified source data.</p>}</section>)}</div>
    </div></section>
  </>;
}
