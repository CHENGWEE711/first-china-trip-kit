/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/products/china-payment-apps-setup-guide.pdf",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, noarchive",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/cities",
        destination: "/city-kits",
        statusCode: 301,
      },
      {
        source: "/cities/:slug",
        destination: "/city-kits/:slug",
        statusCode: 301,
      },
      {
        source: "/itineraries",
        destination: "/itinerary-kits",
        statusCode: 301,
      },
      {
        source: "/itineraries/:slug",
        destination: "/itinerary-kits/:slug",
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "firstchinatripkit.com",
          },
        ],
        destination: "https://www.firstchinatripkit.com/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
