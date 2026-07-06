import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/projects/:slug",
        destination: "/portfolio/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
