import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "orion.example.com",
      },
      {
        protocol: "https",
        hostname: "synapse.example.com",
      },
      {
        protocol: "https",
        hostname: "atlas.example.com",
      },
    ],
  },
};

export default nextConfig;
