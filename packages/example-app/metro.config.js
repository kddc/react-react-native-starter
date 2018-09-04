var path = require("path")
const { mergeConfig } = require('metro-config')
const { DEFAULT } = require('react-native/local-cli/util/Config')

const config = {
  watchFolders: [
    path.resolve(__dirname, "../.."),
  ],
}

module.exports = mergeConfig(DEFAULT, config)
