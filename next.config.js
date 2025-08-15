/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  // Force dynamic rendering for all pages to avoid sessionStorage issues
  experimental: {
    appDir: true,
  },
  // Disable static optimization
  output: 'standalone',
  // Skip type checking during build (if needed)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build (if needed)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;