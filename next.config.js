/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for S3/CloudFront deployment
  trailingSlash: true, // Better compatibility with S3 static hosting
  images: {
    unoptimized: true, // Using regular img tags - no optimization needed
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_CLOUDFRONT_URL: process.env.NEXT_PUBLIC_CLOUDFRONT_URL,
  },
}

module.exports = nextConfig