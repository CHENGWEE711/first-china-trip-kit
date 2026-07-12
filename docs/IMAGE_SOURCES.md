# Image sources

All travel photography is stored locally and rendered through Next Image. New photography in the full-site visual pass comes only from Pexels and Unsplash detail pages marked free to use. No hotlinks, watermarked files, news imagery, partner-site imagery, AI-generated travel scenes, or simulated Alipay/WeChat screens are used.

The complete machine-readable ledger is [`data/image-credits.json`](../data/image-credits.json). Every entry contains a stable `creditId`, local file, source platform, original detail page, photographer, download date, usage, and license check.

## Guide photography

| Guide subject | Local image | Source detail page |
| --- | --- | --- |
| Foreign visitor payments | `/images/travel/phone-scanning-qr.webp` | https://www.pexels.com/photo/person-taking-photo-of-the-qr-code-7289717/ |
| Essential travel apps | `/images/guides/best-apps-metro-phone.webp` | https://www.pexels.com/photo/people-using-phones-in-a-subway-station-31216218/ |
| High-speed rail | `/images/guides/high-speed-train-china.webp` | https://www.pexels.com/photo/high-speed-train-at-a-station-in-china-7494174/ |
| Alipay and WeChat Pay | `/images/guides/alipay-cafe-qr.webp` | https://www.pexels.com/photo/cafe-interior-with-coffee-grinders-and-qr-code-33792076/ |
| Packing list | `/images/guides/china-packing-essentials.webp` | https://www.pexels.com/photo/travel-documents-and-necessities-5405596/ |
| Chinese phrases | `/images/guides/chinese-phrases-restaurant-phone.webp` | https://www.pexels.com/photo/hand-taking-a-photo-of-a-food-with-a-smart-phone-13639635/ |
| eSIM and arrival data | `/images/guides/china-esim-airport-phone.webp` | https://www.pexels.com/photo/person-holding-a-phone-15068317/ |
| Food ordering | `/images/guides/order-food-shanghai-stall.webp` | https://www.pexels.com/photo/street-food-market-shanghai-china-24349885/ |
| Americans traveling to China | `/images/guides/americans-china-airport-arrivals.webp` | https://www.pexels.com/photo/busy-people-on-the-airport-terminal-6726195/ |
| 240-hour transit | `/images/guides/visa-free-transit-airport.webp` | https://www.pexels.com/photo/crop-traveler-with-smartphone-and-boarding-pass-in-airport-4606721/ |
| Alipay | `/images/travel/phone-qr-code.webp` | https://www.pexels.com/photo/qr-code-on-screengrab-278430/ |
| WeChat Pay | `/images/guides/wechat-cafe-phone.webp` | https://www.pexels.com/photo/casual-interaction-at-a-modern-cafe-bar-counter-31713078/ |
| Three days in Shanghai | `/images/guides/shanghai-three-days-street.webp` | https://www.pexels.com/photo/bustling-street-scene-in-shanghai-china-35554911/ |
| Pre-flight checklist | `/images/guides/china-preflight-checklist.webp` | https://www.pexels.com/photo/close-up-shot-of-a-passport-and-tickets-on-top-of-a-laptop-7310015/ |

## Destination and travel scenes

The eight destination hero sources remain the verified Unsplash pages recorded in the ledger. The visual pass adds Beijing hutong street and market scenes, a Xi'an night market, Chengdu food and street-transport scenes, Suzhou canal/market/food scenes, a Chinese high-speed train, and QR-use close-ups. Their exact Pexels detail pages and photographer names are recorded in `data/image-credits.json`.

## Processing

- Downloaded originals were converted to 1800 × 1200 WebP at quality 78.
- Card and hero layouts reserve aspect ratio space to prevent layout shift.
- Hero images use `priority`; below-the-fold images use the Next Image default lazy loading.
- Responsive `sizes` are set at each use site.
