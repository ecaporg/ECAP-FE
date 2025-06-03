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
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude playwright from the server bundle for Vercel compatibility
      config.externals = [...(config.externals || []), 'playwright'];
    }
    return config;
  },
};

export default nextConfig;
