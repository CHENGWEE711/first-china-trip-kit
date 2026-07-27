export const payhipUrls = {
  freeChecklist:
    process.env.NEXT_PUBLIC_PAYHIP_FREE_CHECKLIST_URL ||
    process.env.NEXT_PUBLIC_PAYHIP_CHECKLIST_URL ||
    "",
  paymentGuide:
    process.env.NEXT_PUBLIC_PAYHIP_PAYMENT_GUIDE_URL ||
    process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL ||
    "",
  arrivalBundle:
    process.env.NEXT_PUBLIC_PAYHIP_ARRIVAL_BUNDLE_URL ||
    process.env.NEXT_PUBLIC_ARRIVAL_SETUP_BUNDLE_BUY_URL ||
    "",
} as const;
