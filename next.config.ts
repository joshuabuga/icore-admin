import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "totviuabxrsosfakcowo.supabase.co",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "media.ttfileserver.com",
      },
      {
        protocol: "https",
        hostname: "ccg-api.sportstats.eu",
      }
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
