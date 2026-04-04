/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoBasePath = "/fadesandfacials";

const nextConfig = {
  output: "export",
  // Next 15.5 defaults this on; it has caused dev 500s / bad webpack chunks
  // ("a[d] is not a function", SegmentViewNode missing from client manifest).
  experimental: {
    devtoolSegmentExplorer: false,
  },
  images: {
    unoptimized: true,
  },
  // Use subfolder paths only in production deploys.
  basePath: isProd ? repoBasePath : "",
  assetPrefix: isProd ? repoBasePath : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? repoBasePath : "",
    NEXT_PUBLIC_SITE_ORIGIN:
      process.env.NEXT_PUBLIC_SITE_ORIGIN ??
      (isProd ? "https://source0999.github.io" : "http://localhost:3000"),
  },
};

export default nextConfig;