/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoBasePath = "/fadesandfacials";

const nextConfig = {
  output: "export",
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