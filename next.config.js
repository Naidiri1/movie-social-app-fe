

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
        ignoreDuringBuilds: true,
    },
  // Force all pages to be client-side rendered
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig