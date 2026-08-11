import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "cdn.nicolas4tech.fr",
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [{
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{
                name: "removeAttrs",
                params: { attrs: "(width|height)" }
              }]
            }
          }
        }],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
