const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const { version } = require("./package.json");

module.exports = {
  webpack(config) {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    return config;
  },
  generateBuildId: async () => version,
  experimental: {
    reactRefresh: true,
  },
  env: {},
  typescript: { ignoreDevErrors: true },
};
