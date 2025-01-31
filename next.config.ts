import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cyan-blank-panda-168.mypinata.cloud", 
      },
    ],
  },
};

export default nextConfig;
