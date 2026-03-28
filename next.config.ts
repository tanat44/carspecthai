import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // output: "standalone",
  turbopack: {
    resolveAlias: {
      fs: { browser: "./empty.js" },
      path: { browser: "./empty.js" },
    },
  },
};

export default nextConfig;
