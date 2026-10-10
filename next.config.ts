import type { NextConfig } from "next";

// GitHub Pages: PAGES_BASE_PATH verildiğinde statik export alınır (bkz. `npm run deploy`).
// Verilmezse Docker için standalone build devam eder.
const pagesBasePath = process.env.PAGES_BASE_PATH;

const nextConfig: NextConfig =
  pagesBasePath !== undefined
    ? {
        output: "export",
        basePath: pagesBasePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        output: "standalone",
      };

export default nextConfig;
