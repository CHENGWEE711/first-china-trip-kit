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
  const purchaseIsExternal = Boolean(purchaseUrl && /^https?:\/\//.test(purchaseUrl));
  const statusLabel = isChecklist
    ? "Free / Pay what you want"
    : isPaymentAppsGuide && !hasExternalPurchaseUrl
      ? "Coming soon"
      : product.status === "available"
        ? "Available now"
        : "Coming soon";
  const actionHref = purchaseUrl || localDownloadUrl || "/store#early-access";
  const actionLabel = isChecklist
    ? purchaseUrl
      ? "Download / Support on Payhip"
      : "Download free checklist"
    : isPaymentAppsGuide && purchaseUrl
      ? "Buy on Payhip — $7"
      : product.status === "available" && purchaseUrl
        ? `Buy now — ${product.price}`
        : "Join waitlist";
  const actionEventName = isChecklist
    ? purchaseUrl
      ? "payhip_checklist_clicked"
      : "checklist_download_clicked"
    : undefined;

  return (
    <article className="flex h-full flex-col rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ShoppingBag aria-hidden="true" className="mt-1 text-ember" size={24} />
        <div className="flex flex-wrap justify-end gap-2 text-right">
          {product.isNextLaunch ? (
            <span className="rounded-md bg-ember px-3 py-1 text-xs font-bold uppercase text-white">
              {hasExternalPurchaseUrl ? "First kit now available" : "First kit waitlist"}
            </span>
          ) : null}
          <span className="rounded-md bg-mist px-3 py-1 text-xs font-bold uppercase text-ink/58">
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
        <div className="mt-4 rounded-md border border-dashed border-ember/35 bg-sand p-4">
          <p className="text-sm font-bold uppercase text-ember">PDF preview coming soon</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/62">
            Preview images will show sample checklist pages, phrase cards, and
            troubleshooting tables before purchase.
          </p>
        </div>
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
      {product.previewPdfUrl ? (
        <a
          href={product.previewPdfUrl}
          className="mt-4 text-sm font-semibold text-ember hover:text-[#982F28]"
        >
          Preview sample PDF
        </a>
      ) : null}
      <p className="mt-4 text-sm text-ink/58">{product.refundNote}</p>
      {canBuy ? (
        <ProductActionButton
          href={actionHref}
          className="mt-5"
          download={isChecklist && !purchaseUrl}
          eventName={actionEventName}
          isExternal={purchaseIsExternal}
          canBuy
          label={actionLabel}
          productId={product.id}
        />
      ) : (
        <>
          <ProductActionButton
            href="/store#early-access"
            className="mt-5"
            canBuy={false}
            label="Join waitlist"
            productId={product.id}
          />
          <p className="mt-3 text-sm text-ink/58">
            {product.status === "available"
              ? "Join the newsletter to get notified when the Payhip purchase link opens."
              : "Join the newsletter to get notified when this kit opens."}
          </p>
        </>
      )}
    </article>
  );
}
