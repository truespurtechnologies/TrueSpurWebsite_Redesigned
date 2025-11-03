/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Remove ignoreBuildErrors for production
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  images: {
    // Keep images optimized for production
    unoptimized: false,
    // Add domains if using external images
    domains: [],
  },
  // Add production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  // Enable experimental features if needed
  experimental: {
    // Enable if you need it
    // appDir: true,
  },
}

export default nextConfig
