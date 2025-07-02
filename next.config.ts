import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
