import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The portfolio is fully client-side and can be published as static files.
  // This keeps the same source compatible with GitHub Pages.
  output: "export",
};

export default nextConfig;
