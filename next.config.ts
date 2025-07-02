import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
