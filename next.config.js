
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
        ignoreDuringBuilds: true,
    },
  images: {
    domains: ['image.tmdb.org'],
  },
};

module.exports = nextConfig;