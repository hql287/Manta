const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BabelWebpackPlugin = require('babel-minify-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    host,
    port,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

// Source Map
exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

// Clean between builds
exports.clean = (path) => ({
  plugins: [
    new CleanWebpackPlugin([path]),
  ],
});

// JS Minification
exports.minifyJavaScript = () => ({
  plugins: [
    new BabelWebpackPlugin(),
  ],
});

// Analyzing Bundle
exports.analyzeBundle = () => ({
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});
