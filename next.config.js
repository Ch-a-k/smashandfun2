/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Оптимизации для клиентской сборки
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
      }
    }
    return config
  },
  // Улучшение производительности изображений
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smashandfun.pl',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Конфигурация для улучшения HMR
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  // Конфигурация безопасности
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://www.googletagmanager.com https://www.clarity.ms"
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ],
      }
    ]
  }
}

module.exports = nextConfig
