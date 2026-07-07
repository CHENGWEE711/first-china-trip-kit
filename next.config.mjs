/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "firstchinatripkit.com",
          },
        ],
        destination: "https://www.firstchinatripkit.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
