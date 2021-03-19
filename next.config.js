require('dotenv').config()

const withImages = require('next-images')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const { version } = require('./package.json')

module.exports = withImages({
  webpack(config) {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

    return config
  },
  generateBuildId: async () => version,
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_REDIRECT_URL: process.env.SPOTIFY_URL,
  },
})
