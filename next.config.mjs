/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Explains to Next.js to build static HTML
    images: {
      unoptimized: true, // GitHub Pages doesn't support the Next.js Image Optimizer
    },
    // Replace 'your-repo-name' with the actual name of your GitHub repository
    basePath: '/your-repo-name', 
    assetPrefix: '/your-repo-name',
  };
  
  export default nextConfig;