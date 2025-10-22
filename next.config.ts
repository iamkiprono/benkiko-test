import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000', // localhost
        'humble-zebra-4x664xvgvrc79p6-3000.app.github.dev', // Codespaces
      ],
    },
  },
};

export default nextConfig;
