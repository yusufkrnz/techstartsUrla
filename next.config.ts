import type { NextConfig } from "next";

// GitHub Pages: PAGES_BASE_PATH verildiğinde statik export alınır (bkz. `npm run deploy`).
// Verilmezse Docker için standalone build devam eder.
const pagesBasePath = process.env.PAGES_BASE_PATH;

// public/ altındaki dosyalara elle verilen yollar (örn. logo) için base path istemciye de aktarılır
const shared: NextConfig = {
  env: { NEXT_PUBLIC_BASE_PATH: pagesBasePath ?? "" },
};

const nextConfig: NextConfig =
  pagesBasePath !== undefined
    ? {
        ...shared,
        output: "export",
        basePath: pagesBasePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        ...shared,
        output: "standalone",
      };

export default nextConfig;
