type SEOJsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function SEOJsonLd({ data }: SEOJsonLdProps) {
  const graph = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph.length === 1 ? graph[0] : graph),
      }}
    />
  );
}
