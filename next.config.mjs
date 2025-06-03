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
      // Exclude local Chrome paths for Vercel compatibility
      config.externals = [
        ...(config.externals || []),
        'chrome-aws-lambda',
      ];
    }
    return config;
  },
};

export default nextConfig;
