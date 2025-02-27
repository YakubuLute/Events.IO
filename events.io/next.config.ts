import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable source maps in production for debugging (optional, but resolves 404s for .mjs.map files)
  productionBrowserSourceMaps: true,
  swcMinify: true, // Optimize with SWC
  output: 'standalone', // Ensure static assets are included for deployment

  webpack: (config, { isServer }) => {
    config.devtool = 'source-map' // Ensure source maps are generated
    return config
  }
}

export default nextConfig
