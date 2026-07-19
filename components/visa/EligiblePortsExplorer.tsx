"use client";

import { Check, Clipboard, ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  PERMITTED_STAY_AREA_GROUPS,
  TRANSIT_PORTS,
  TRANSIT_PORT_SEARCH_CODES,
  VISA_POLICY_META,
} from "@/data/visa";
import { trackVisaEvent, type VisaAnalyticsInteractionType } from "@/lib/visa/analytics";

const modeLabels = {
  airport: "Airport",
  seaport: "Seaport",
  rail: "Rail",
  road: "Road",
  ferry: "Ferry terminal",
} as const;

export function EligiblePortsExplorer() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [mode, setMode] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const [copiedId, setCopiedId] = useState("");

  const areasById = useMemo(
    () => new Map(PERMITTED_STAY_AREA_GROUPS.map((area) => [area.id, area])),
    [],
  );
  const regions = useMemo(
    () => Array.from(new Set(TRANSIT_PORTS.map((port) => port.provinceLevelRegion))).sort(),
    [],
  );

  const filteredPorts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("en");
    return TRANSIT_PORTS.filter((port) => {
      const code = port.iataCode || TRANSIT_PORT_SEARCH_CODES[port.id] || "";
      const searchable = [
        port.officialEnglishName,
        port.officialChineseName || "",
        port.city,
        port.provinceLevelRegion,
        code,
      ].join(" ").toLocaleLowerCase("en");
      return (
        (region === "all" || port.provinceLevelRegion === region) &&
        (mode === "all" || port.mode === mode) &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [mode, query, region]);

  function recordExplorerUse(interactionType: VisaAnalyticsInteractionType) {
    trackVisaEvent("visa_port_explorer_used", {
      interaction_type: interactionType,
      policy_version: VISA_POLICY_META.policyVersion,
    });
    if (interactionType === "search") {
      trackVisaEvent("visa_port_search_used", {
        interaction_type: "search",
        policy_version: VISA_POLICY_META.policyVersion,
      });
    }
  }

  async function copyName(id: string, name: string) {
    try {
      await window.navigator.clipboard.writeText(name);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(""), 1800);
      recordExplorerUse("copy");
    } catch {
      setCopiedId("");
    }
  }

  function selectPort(id: string) {
    window.dispatchEvent(new CustomEvent("visa-port-selected", { detail: { id } }));
    document.getElementById("route-check")?.scrollIntoView({ behavior: "auto", block: "start" });
    trackVisaEvent("visa_port_selected", {
      interaction_type: "select",
      policy_version: VISA_POLICY_META.policyVersion,
    });
  }

  return (
    <div data-testid="eligible-ports-explorer">
      <div className="grid gap-3 border-y border-ink/12 py-5 lg:grid-cols-[minmax(0,1fr)_220px_190px]">
        <label className="relative grid gap-2 text-sm font-semibold text-ink" htmlFor="visa-port-search">
          Search the current list
          <Search aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 text-ink/44" size={18} />
          <input
            id="visa-port-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(12);
              if (event.target.value.length === 1) recordExplorerUse("search");
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                setQuery("");
                setVisibleCount(12);
              }
            }}
            placeholder="Search city, airport code or port name"
            className="min-h-12 rounded-md border border-ink/20 bg-paper py-2 pl-10 pr-3 text-base font-normal text-ink placeholder:text-ink/42 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink" htmlFor="visa-port-region">
          Province-level region
          <select
            id="visa-port-region"
            value={region}
            onChange={(event) => { setRegion(event.target.value); setVisibleCount(12); recordExplorerUse("filter"); }}
            className="min-h-12 rounded-md border border-ink/20 bg-paper px-3 py-2 text-base font-normal text-ink focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25"
          >
            <option value="all">All regions</option>
            {regions.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink" htmlFor="visa-port-mode">
          Transport type
          <select
            id="visa-port-mode"
            value={mode}
            onChange={(event) => { setMode(event.target.value); setVisibleCount(12); recordExplorerUse("filter"); }}
            className="min-h-12 rounded-md border border-ink/20 bg-paper px-3 py-2 text-base font-normal text-ink focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25"
          >
            <option value="all">All types</option>
            {Object.entries(modeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-sm text-ink/62">
        <p><strong className="text-ink">{filteredPorts.length}</strong> matching ports from the official {VISA_POLICY_META.eligiblePortCount}-port dataset</p>
        <p>Policy data version {VISA_POLICY_META.policyVersion}</p>
      </div>

      <div className="mt-4 divide-y divide-ink/12 border-y border-ink/12">
        {filteredPorts.slice(0, visibleCount).map((port) => {
          const permittedAreas = port.permittedAreaGroupIds
            .map((id) => areasById.get(id)?.displayName)
            .filter(Boolean)
            .join("; ");
          const code = port.iataCode || TRANSIT_PORT_SEARCH_CODES[port.id];
          return (
            <details key={port.id} className="group bg-paper" data-port-id={port.id}>
              <summary className="flex min-h-20 cursor-pointer list-none items-start justify-between gap-4 px-1 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 sm:px-3">
                <span className="min-w-0">
                  <span className="block font-editorial text-xl leading-snug text-ink sm:text-2xl">{port.officialEnglishName}</span>
                  <span className="mt-1 block text-sm text-ink/58">
                    {port.city}, {port.provinceLevelRegion} · {modeLabels[port.mode]}
                    {code ? ` · ${code}` : ""}
                  </span>
                </span>
                <span aria-hidden="true" className="mt-1 text-2xl text-ember transition group-open:rotate-45">+</span>
              </summary>
              <div className="grid gap-5 bg-sand px-4 py-5 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ember">Permitted stay area</p>
                  <p className="mt-2 text-base leading-relaxed text-ink">{permittedAreas}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/62">
                    An eligible port does not automatically allow nationwide travel. Match the port to its current permitted area and your approved temporary entry route.
                  </p>
                </div>
                <dl className="grid content-start gap-3 text-sm">
                  <div><dt className="font-semibold text-ink/55">Official-data row</dt><dd className="mt-1 text-ink">{port.appendixRow} of 65</dd></div>
                  <div><dt className="font-semibold text-ink/55">Policy effective</dt><dd className="mt-1 text-ink">{port.effectiveFrom}</dd></div>
                  {port.officialChineseName ? <div><dt className="font-semibold text-ink/55">Official Chinese name</dt><dd className="mt-1 text-ink">{port.officialChineseName}</dd></div> : null}
                </dl>
                <div className="flex flex-wrap gap-3 sm:col-span-2 lg:col-span-2">
                  <button type="button" onClick={() => selectPort(port.id)} className="inline-flex min-h-11 items-center rounded-md bg-ember px-4 py-2 text-sm font-semibold text-white hover:bg-ember-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2">
                    Check this port in the route checker
                  </button>
                  <button type="button" onClick={() => copyName(port.id, port.officialEnglishName)} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/20 bg-paper px-4 py-2 text-sm font-semibold text-ink hover:border-ember hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2">
                    {copiedId === port.id ? <Check aria-hidden="true" size={16} /> : <Clipboard aria-hidden="true" size={16} />}
                    {copiedId === port.id ? "Copied" : "Copy official name"}
                  </button>
                  <a href={port.officialSourceUrl} target="_blank" rel="noopener noreferrer" onClick={() => { trackVisaEvent("visa_policy_source_clicked", { interaction_type: "open", policy_version: VISA_POLICY_META.policyVersion }); trackVisaEvent("visa_official_source_clicked", { interaction_type: "open", policy_version: VISA_POLICY_META.policyVersion }); }} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/20 bg-paper px-4 py-2 text-sm font-semibold text-ink hover:border-ember hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2">
                    Official source <ExternalLink aria-hidden="true" size={16} />
                  </a>
                </div>
              </div>
            </details>
          );
        })}
      </div>

      <a
        href={TRANSIT_PORTS[0]?.officialSourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackVisaEvent("visa_official_source_clicked", {
            interaction_type: "open",
            policy_version: VISA_POLICY_META.policyVersion,
          })
        }
        className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-ember underline decoration-ember/30 underline-offset-4 hover:text-ember-hover"
      >
        View the original official appendix
      </a>

      {filteredPorts.length === 0 ? (
        <p role="status" className="mt-6 border border-ink/12 bg-sand p-5 text-base text-ink">
          No official eligible port matches those filters. Try a city, airport code, port name or a broader filter.
        </p>
      ) : null}

      {visibleCount < filteredPorts.length ? (
        <button type="button" onClick={() => { setVisibleCount((count) => count + 12); recordExplorerUse("open"); }} className="mt-6 inline-flex min-h-11 items-center rounded-md border border-ink/25 px-5 py-2 text-sm font-semibold text-ink hover:border-ember hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2">
          Show more ports
        </button>
      ) : null}
    </div>
  );
}
