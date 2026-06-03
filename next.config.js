/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.tirerack.com" },
      { protocol: "https", hostname: "static.tirerack.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com" }
    ]
  },
  async redirects() {
    return [
      { source: "/-0", destination: "/", permanent: true },
      { source: "/bf-goodrich-all-terrain", destination: "/tires/265-70-r17/all-terrain", permanent: true },
      { source: "/bf-goodrich-all-terrain-tires", destination: "/tires/265-70-r17/all-terrain", permanent: true },
      { source: "/bridgestone-weatherpeak-review", destination: "/models/bridgestone-weatherpeak", permanent: true },
      { source: "/continental-purecontact-ls", destination: "/models/continental-purecontact-ls", permanent: true },
      { source: "/tesla-model-3-ev-tires", destination: "/vehicles/tesla/model-3/2025", permanent: true },
      { source: "/tires-for-snow", destination: "/tires/235-45-r18/winter", permanent: true },
      { source: "/yokohama-avid-ascend-review", destination: "/models/yokohama-avid-ascend", permanent: true },
      { source: "/tires/all-terrain/truck", destination: "/tires/265-70-r17/all-terrain", permanent: true },
      { source: "/tires/summer/:size", destination: "/tires/:size/summer", permanent: true },
      { source: "/tires/michelin-defender-ltx-ms2", destination: "/models/michelin-defender-ltx-ms2", permanent: true },
      { source: "/tires/michelin-245-70-r19-5", destination: "/tires/245-70-r17-5/comparison", permanent: true },
      { source: "/tires/nitto", destination: "/search?q=Nitto%20tires", permanent: true },
      { source: "/tires/295-75-r22-5-near-atlanta-ga", destination: "/tires/295-75-r22-5", permanent: true },
      { source: "/tires/315-80-r22-5-near-chicago-il", destination: "/tires/315-80-r22-5", permanent: true }
    ];
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  }
};

module.exports = nextConfig;
