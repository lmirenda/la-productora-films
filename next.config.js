import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      // Allow your production domain for API media routes
      {
        protocol: 'https',
        hostname: 'www.laproductorafilms.com',
        pathname: '/api/media/file/**',
      },
      // Allow Vercel app domain for API media routes
      {
        protocol: 'https',
        hostname: 'la-productora-films.vercel.app',
        pathname: '/api/media/file/**',
      },
      // Allow Vercel Blob Storage (in case direct URLs are used)
      {
        protocol: 'https',
        hostname: '*.vercel-storage.com',
      },
      // Allow general blob storage patterns
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com',
      },
    ],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
      }),
    )
    return config
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
