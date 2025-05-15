import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["starknet.id"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "starknet.id",
        pathname: "/api/identicons/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
