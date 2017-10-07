const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'electron-renderer',
  entry: {
    'tourWindow': [
      // activate HMR for React
      'react-hot-loader/patch',
      './tour/index.jsx',
    ],
    'mainWindow': [
      // activate HMR for React
      'react-hot-loader/patch',
      './app/renderer.js',
      './app/renderers/dialog.js',
      './app/renderers/dragNdrop.js',
      './app/renderers/menu.js',
      './app/index.jsx'
    ],
    'previewWindow': [
      // activate HMR for React
      'react-hot-loader/patch',
      './preview/index.jsx'
    ],
    'modalWindow': [
      // activate HMR for React
      'react-hot-loader/patch',
      './modal/modal_index.js'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: 'http://localhost:3000/',
  },
  // No Need to type out these extensions name
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  // Use source map for easier debugging
  devtool: 'inline-source-map',
  // Use babel to transpile jsx
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // Ignore stuff
    new webpack.IgnorePlugin(/vertx/),
  ],
  // Dev Server Settings
  devServer: {
    host: 'localhost',
    port: 3000,
    inline: true,
    hot: true,
  },
  node: {
    // Set relative to the project root
    __dirname: true
  }
};
