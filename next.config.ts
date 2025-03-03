import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV == "production";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
    ],
  },
  experimental: {
    useCache: true,
    turbo: {
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
    },
  },
  webpack(config, { isServer }) {
    // Source maps only in development
    config.devtool = isProd ? false : "source-map";

    config.resolve.alias["@/"] = path.resolve(process.cwd());

    // Performance hints only in production
    config.performance = isProd
      ? {
          maxEntrypointSize: 512000,
          maxAssetSize: 512000,
          hints: "warning",
        }
      : false;

    // Add SVGR support
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // Optimize stats output
    config.stats = {
      preset: isProd ? "minimal" : "normal",
      colors: true,
      timings: true,
    };

    // server/client chunking strategy
    config.optimization.splitChunks = isServer
      ? {
          chunks: "all",
          maxInitialRequests: 25,
          minSize: 10000, // Reduce minimum size for server-side chunks (faster server-side rendering)
          cacheGroups: {
            serverVendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "server-vendors",
              chunks: "all",
              priority: 10,
            },
            serverCommons: {
              name: "server-commons",
              minChunks: 2,
              chunks: "all",
              priority: 5,
            },
          },
        }
      : {
          chunks: "all",
          maxInitialRequests: 20, // Adjust initial requests to be more optimal
          minSize: 30000, // Increase the minimum size to better chunk larger libraries
          cacheGroups: {
            // Vendor: Libraries from node_modules will be extracted into a vendors chunk
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              priority: 10,
              reuseExistingChunk: true, // Reuse existing chunk when possible
            },
            // Commons: Combine common chunks to avoid unnecessary duplication
            commons: {
              name: "commons",
              minChunks: 2, // Share code between two or more modules
              chunks: "all",
              priority: 5,
              reuseExistingChunk: true,
            },
            // Styles: Extract CSS into separate chunks
            styles: {
              name: "styles",
              test: /\.(css|scss|sass)$/,
              chunks: "all",
              enforce: true, // Force styles to be extracted separately
            },
          },
        };

    return config;
  },
};

export default nextConfig;
