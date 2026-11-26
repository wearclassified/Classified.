import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",    // generates a static /out folder
  trailingSlash: true, // ensures /login/ works on cPanel
  images: {
    unoptimized: true, // required for static export
  },
  turbopack: {
    root: path.resolve(__dirname), // silence workspace root warning
  },
};

export default nextConfig;
