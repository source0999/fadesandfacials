/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// GitHub project Pages serves the site at https://<user>.github.io/<repo>/ — CSS/JS must
// use that prefix. CI sets GITHUB_REPOSITORY=owner/repo; local gh-pages builds set
// GITHUB_ACTIONS=true (see npm run build:gh-pages).
const useGitHubPagesSubpath = isProd && process.env.GITHUB_ACTIONS === "true";

// Optional override when repo name ≠ GitHub Pages path (forks, renames). No leading slash.
const slugOverride = process.env.GH_PAGES_REPO_SLUG?.trim().toLowerCase().replace(
  /^\/+|\/+$/g,
  ""
);
const repoSlug =
  slugOverride ||
  process.env.GITHUB_REPOSITORY?.split("/")[1]?.trim().toLowerCase() ||
  "fadesandfacials";
const repoBasePath = useGitHubPagesSubpath ? `/${repoSlug}` : "";

const nextConfig = {
  output: "export",
  // Project Pages often redirects /repo → /repo/; trailing slash avoids mismatched asset roots.
  trailingSlash: useGitHubPagesSubpath,
  images: {
    unoptimized: true,
  },
  basePath: repoBasePath,
  assetPrefix: repoBasePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: repoBasePath,
    NEXT_PUBLIC_SITE_ORIGIN:
      process.env.NEXT_PUBLIC_SITE_ORIGIN ??
      (isProd ? "https://source0999.github.io" : "http://localhost:3000"),
  },
};

export default nextConfig;
