/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.contentful.com",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow"
          }
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      (async () => {
        await import("./scripts/generate-sitemap.mjs");
      })();
    }

    return config;
  },
  turbopack: {
    // Configure Turbopack options here
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
    resolveAlias: {
      underscore: "lodash",
      mocha: { browser: "mocha/browser-entry.js" },
    },
    resolveExtensions: [
      ".mdx",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".mjs",
      ".json",
    ],
    // Removed moduleIdStrategy as it's not a recognized property
  },
};

export default nextConfig;
