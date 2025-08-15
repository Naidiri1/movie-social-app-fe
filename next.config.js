/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove generateStaticParams - it doesn't belong here
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org'], // Add your image domains
    unoptimized: true, // For static export
  },
  // Force dynamic rendering for all pages
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
