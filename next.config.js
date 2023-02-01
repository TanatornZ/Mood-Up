/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  nextConfig,
  typescript: {
    ignoreBuildErrors: true,
  },
  images : {
    domains: ['profile.line-scdn.net'],
  }
};
