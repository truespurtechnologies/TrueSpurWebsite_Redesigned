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
  // Security headers including Content Security Policy
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              // default-src: Fallback for all resource types
              "default-src 'self'",
              // script-src: Allow Next.js scripts and Vercel Analytics (unsafe-inline removed per engineering validation)
              "script-src 'self' 'unsafe-eval' https://va.vercel-scripts.com",
              // style-src: Allow inline styles (required for Tailwind, Framer Motion)
              "style-src 'self' 'unsafe-inline'",
              // font-src: Allow self-hosted fonts (fonts.gstatic.com removed - next/font self-hosts)
              "font-src 'self' data:",
              // img-src: Allow self-hosted images, data URIs, and common CDNs
              "img-src 'self' data: https: blob:",
              // connect-src: Allow API calls to self and Vercel Analytics
              "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              // frame-ancestors: Prevent clickjacking
              "frame-ancestors 'none'",
              // base-uri: Restrict base tag URLs
              "base-uri 'self'",
              // form-action: Restrict form submissions
              "form-action 'self'",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
}

export default nextConfig
