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
  },
};

export default nextConfig;