import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Optimizations for production */
  images: {
    domains: ["localhost"], // Add any external image domains you're using
    formats: ["image/webp", "image/avif"],
  },

  /* Enable experimental features for better performance */
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons", "lucide-react"],
  },

  /* Enable TypeScript and ESLint checks during builds */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  /* Security headers */
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
