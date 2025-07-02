import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: false,
  experimental: {
    serverMinification: false,
  },
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
