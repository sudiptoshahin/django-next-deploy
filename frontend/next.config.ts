import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',  // newly added for production
  reactCompiler: true,
  reactStrictMode: true,
};

export default nextConfig;
