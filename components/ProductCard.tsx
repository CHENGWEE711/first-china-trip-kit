import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { ProductActionButton } from "@/components/ProductActionButton";
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
  const isChecklist = product.id === "china-first-trip-checklist";
  const isPaymentAppsGuide = product.id === "china-payment-apps-setup-guide";
  const localDownloadUrl = isChecklist ? product.localDownloadUrl : undefined;
  const hasExternalPurchaseUrl = Boolean(purchaseUrl);
  const canBuy = isChecklist
    ? Boolean(purchaseUrl || localDownloadUrl)
    : product.status === "available" && hasExternalPurchaseUrl;

  if (!canBuy) {
    return null;
  }
  const purchaseIsExternal = Boolean(purchaseUrl && /^https?:\/\//.test(purchaseUrl));
  const statusLabel = isChecklist ? "Free / Pay what you want" : "Available now";
  const statusClass = isChecklist
    ? "bg-ember text-white"
    : product.status === "available"
      ? "bg-jade text-white"
      : "bg-mist text-ink/58";
  const actionHref = purchaseUrl || localDownloadUrl || "/store";
  const actionLabel = isChecklist
    ? purchaseUrl
      ? "Download / Support on Payhip"
      : "Download Free Checklist"
    : isPaymentAppsGuide && purchaseUrl
      ? "Buy on Payhip — $7"
      : `Buy now — ${product.price}`;
  const actionEventName = isChecklist
    ? purchaseUrl
      ? "payhip_checklist_clicked"
      : "checklist_download_clicked"
    : undefined;

  return (
    <article className="flex h-full min-w-0 flex-col rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ShoppingBag aria-hidden="true" className="mt-1 text-ember" size={24} />
        <div className="flex flex-wrap justify-end gap-2 text-right">
          <span className={`rounded-md px-3 py-1 text-xs font-bold uppercase ${statusClass}`}>
            {statusLabel}
          </span>
          <span className="rounded-md bg-sand px-3 py-1 text-sm font-bold text-ember">
            {product.price}
          </span>
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-bold leading-tight text-ink">{product.title}</h3>
      <p className="mt-3 text-base text-ink/68">{product.summary}</p>
      {isPaymentAppsGuide ? (
        <a
          href="/store#preview-pages"
          className="mt-4 overflow-hidden rounded-md border border-ink/10 bg-sand shadow-soft transition hover:border-ember/35"
        >
          <Image
            src="/products/previews/payment-apps-guide-store-cover.png"
            alt="Product cover for the China Payment and Apps Setup Guide"
            width={1200}
            height={800}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-auto w-full"
          />
          <span className="block border-t border-ink/10 p-4">
            <span className="block text-sm font-bold uppercase text-ember">
              Preview pages available
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-ink/62">
              See the cover, decision tree, app stack, phrase cards, and hotel card before purchase.
            </span>
          </span>
        </a>
      ) : null}
      <p className="mt-4 text-sm font-bold uppercase text-ink/48">Best for</p>
      <p className="mt-1 text-base text-ink/68">{product.bestFor}</p>
      {isPaymentAppsGuide ? (
        <div className="mt-4 rounded-md bg-mist p-4">
          <p className="text-sm font-bold uppercase text-jade">
            What makes this different from the free checklist?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/66">
            The free checklist tells you what to prepare. This guide gives you
            printable setup checklists, decision trees, phrase cards, an app stack,
            and a first-day troubleshooting table for payment and transport friction.
          </p>
        </div>
      ) : null}
      <p className="mt-4 text-sm font-bold uppercase text-ink/48">Includes</p>
      <ul className="mt-2 grid gap-2 text-base text-ink/68">
        {product.includes.map((item) => (
          <li key={item} className="border-l-2 border-ember/35 pl-3">
            {item}
          </li>
        ))}
      </ul>
      {product.previewPdfUrl && !isPaymentAppsGuide ? (
        <a
          href={product.previewPdfUrl}
          className="mt-4 text-sm font-semibold text-ember hover:text-[#982F28]"
        >
          Preview sample PDF
        </a>
      ) : null}
      <p className="mt-4 text-sm text-ink/58">{product.refundNote}</p>
      <div className="mt-auto pt-1">
        <ProductActionButton
          href={actionHref}
          className="mt-5"
          download={isChecklist && !purchaseUrl}
          eventName={actionEventName}
          isExternal={purchaseIsExternal}
          canBuy
          label={actionLabel}
          placement="store_product_card"
          productId={product.id}
        />
      </div>
    </article>
  );
}
