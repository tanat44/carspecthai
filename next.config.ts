import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // for static site generator
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // to prevent .html suffix on generated route
  turbopack: {
    resolveAlias: {
      fs: { browser: "./empty.js" },
      path: { browser: "./empty.js" },
    },
  },
};

export default nextConfig;
