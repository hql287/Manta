const webpack = require('webpack');
const BabelWebpackPlugin = require('babel-minify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    host,
    port,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

// Source Map
exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

// Check Duplicates
exports.checkDuplicate = options => ({
  plugins: [new DuplicatePackageCheckerPlugin(options)],
});

// Clean between builds
exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])],
});

// JS Minification
exports.minifyJavaScript = () => ({
  plugins: [new BabelWebpackPlugin()],
});

// Analyzing Bundle
exports.analyzeBundle = () => ({
  plugins: [new BundleAnalyzerPlugin()],
});
