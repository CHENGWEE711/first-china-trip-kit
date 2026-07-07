import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const purchaseUrl =
    product.externalPurchaseUrl ||
    product.checkoutUrl ||
    product.gumroadUrl ||
    product.payhipUrl;
  const canBuy = product.status === "available" && Boolean(purchaseUrl);
  const purchaseIsExternal = Boolean(purchaseUrl && /^https?:\/\//.test(purchaseUrl));

  return (
    <article className="flex h-full flex-col rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ShoppingBag aria-hidden="true" className="mt-1 text-ember" size={24} />
        <div className="flex flex-wrap justify-end gap-2 text-right">
          {product.isNextLaunch ? (
            <span className="rounded-md bg-ember px-3 py-1 text-xs font-bold uppercase text-white">
              First to open
            </span>
          ) : null}
          <span className="rounded-md bg-mist px-3 py-1 text-xs font-bold uppercase text-ink/58">
            {product.status === "available" ? "Available" : "Coming soon"}
          </span>
          <span className="rounded-md bg-sand px-3 py-1 text-sm font-bold text-ember">
            Planned price: {product.price}
          </span>
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-bold leading-tight text-ink">{product.title}</h3>
      <p className="mt-3 text-base text-ink/68">{product.summary}</p>
      <p className="mt-4 text-sm font-bold uppercase text-ink/48">Best for</p>
      <p className="mt-1 text-base text-ink/68">{product.bestFor}</p>
      <p className="mt-4 text-sm font-bold uppercase text-ink/48">Includes</p>
      <ul className="mt-2 grid gap-2 text-base text-ink/68">
        {product.includes.map((item) => (
          <li key={item} className="border-l-2 border-ember/35 pl-3">
            {item}
          </li>
        ))}
      </ul>
      {product.previewPdfUrl ? (
        <a
          href={product.previewPdfUrl}
          className="mt-4 text-sm font-semibold text-ember hover:text-[#982F28]"
        >
          Preview sample PDF
        </a>
      ) : null}
      <p className="mt-4 text-sm text-ink/58">{product.refundNote}</p>
      {canBuy && purchaseUrl ? (
        <a
          href={purchaseUrl}
          target={purchaseIsExternal ? "_blank" : undefined}
          rel={purchaseIsExternal ? "noreferrer" : undefined}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-4 py-2 text-base font-semibold text-white transition hover:bg-[#982F28]"
        >
          Buy now
        </a>
      ) : (
        <>
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="This digital product is not available for purchase yet."
            className="mt-5 inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-md border border-ink/12 bg-ink/12 px-4 py-2 text-base font-semibold text-ink/50"
          >
            Coming soon
          </button>
          <p className="mt-3 text-sm text-ink/58">
            Join the newsletter to get notified.
          </p>
        </>
      )}
    </article>
  );
}
