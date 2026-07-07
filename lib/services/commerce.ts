export type PaidGuideProduct = {
  id: string;
  title: string;
  stripePriceId: string;
  pdfPath: string;
};

export async function createCheckoutSession(product: PaidGuideProduct) {
  void product;
  // Future integration point: create a Stripe Checkout Session for paid PDF
  // guide downloads.
  throw new Error("Stripe payment integration is not configured yet.");
}
