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
    // Only apply strict CSP in production, not in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: isDevelopment ? [
              // Development: More permissive CSP to allow inline scripts for Vercel Analytics
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; ') : [
              // Production: Strict CSP with hash-based inline script allowance
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' https://va.vercel-scripts.com 'sha256-7mu4H06fwDCjmnxxr/xNHyuQC6pLTHr4M2E4jXw5WZs=' 'sha256-kyaKBybsHvqmdq5RcfhCZ+crfD0hW2GQeUy0Bp1fWNg=' 'sha256-LcsuUMiDkprrt6ZKeiLP4iYNhWo8NqaSbAgtoZxVK3s=' 'sha256-jxpmuzEyvVmGf1uu3rLnVb++ac4Q0kh49VFIlwUf6Q0=' 'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' 'sha256-SdxwFk4f0olb0W2PnqJdfZ9VFWhMoYOkMwCGZnNzYkI=' 'sha256-yTfsSWOLPbL5gt3QPVguxfi7MjuyCitVIdbAPYDenN8=' 'sha256-m9NpPYPqlCtOGTayhTCyb6C50MO99WMPt9p6WH2yY9Y=' 'sha256-FLsAuWqsgHjz6CpEofaOzFpyppYTae03kTaLrj3mR7o=' 'sha256-Bd8lVd1ovpyQsRN6C1OZ5AFZPO/mRRzQH1ScYoQY+dk=' 'sha256-DX9leBWSokQWEota8lBMWnKsW1dK8nUgdBIhtwPy0lg=' 'sha256-C6+XPIGAyhBUCXjMoZp0qcKAeqp6ATYjJti9442TD58=' 'sha256-AwacO7oHacWWocZC6iQ2WbbViFRNzIkQaQxnhRlF0MM=' 'sha256-r+KWWJuFHDCDSctlY79cmuV23A2FxBkRDs5tMabAfbY='",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
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
