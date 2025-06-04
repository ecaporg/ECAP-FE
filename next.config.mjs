/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    serverComponentsExternalPackages: ["puppeteer", "puppeteer-core", "@sparticuz/chromium-min"],
  },
  // Optimize for Vercel deployment
  output: 'standalone',
  poweredByHeader: false,
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize packages that don't need bundling
      config.externals.push({
        'puppeteer': 'puppeteer',
        'puppeteer-core': 'puppeteer-core',
        '@sparticuz/chromium-min': '@sparticuz/chromium-min',
      });
    }
    return config;
  },
};

export default nextConfig;
