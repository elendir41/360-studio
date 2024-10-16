// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
