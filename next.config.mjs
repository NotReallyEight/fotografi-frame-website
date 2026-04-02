/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/NotReallyEight/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/NotReallyEight/**",
      },
    ],
  },
  typedRoutes: true,
};

export default nextConfig;
