import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? '/armanmaurya' : '',
  images: {
    unoptimized: true,
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
