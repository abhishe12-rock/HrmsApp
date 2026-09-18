/**
 * Metro configuration for React Native 0.73+
 * Extends the default @react-native/metro-config
 */

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  inlineRequires: true,
};

module.exports = config;
