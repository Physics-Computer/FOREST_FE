// next.config.js

const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  images: {
    domains: ['www.kopis.or.kr'],
  },
  images: {
    domains: ['www.culture.go.kr'],
  },
  images: {
    domains: ['image.tmdb.org'], 
  },
  images: {
    domains: ['media.themoviedb.org'], 
  },
};

module.exports = nextConfig;