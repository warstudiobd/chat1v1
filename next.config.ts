import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "next.js",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
