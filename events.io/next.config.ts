import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  swcMinify: true, // Optimize with SWC
  output: 'standalone',

  webpack: (config, { isServer }) => {
    config.devtool = 'source-map' 
    return config
  }
}

export default nextConfig
