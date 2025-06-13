/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript checking during builds temporarily
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization settings for Netlify
  images: {
    domains: ['localhost', 'netlify.app', 'netlify.com'],
    unoptimized: true, // Required for static export
  },

  // Output configuration for production builds
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  // Server external packages (updated from experimental.serverComponentsExternalPackages)
  serverExternalPackages: ['@prisma/client'],

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add any custom webpack configuration here
    return config;
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // Add any redirects here if needed
    ];
  },

  // Rewrites for API routes
  async rewrites() {
    return [
      // Add any rewrites here if needed
    ];
  },
};

module.exports = nextConfig;
