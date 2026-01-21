/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['techcrunch.com', 'venturebeat.com', 'theverge.com', 'cdn.vox-cdn.com'],
  },
}

module.exports = nextConfig
