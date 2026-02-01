import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "totviuabxrsosfakcowo.supabase.co",
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
