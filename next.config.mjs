/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // This stops Next.js from creating those long cached filenames
    },
    basePath: '/fadesandfacials',
    assetPrefix: '/fadesandfacials',
  };
  
  export default nextConfig;