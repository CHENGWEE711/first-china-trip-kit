/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
