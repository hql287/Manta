const path    = require('path');
const webpack = require('webpack');
const merge   = require('webpack-merge');
const parts   = require('./webpack.parts');
const nodeExternals = require('webpack-node-externals');
const PATHS = {
  build: path.resolve(__dirname, 'build'),
};

// PRODUCTION CONFIGS
const productionConfig = merge([
  // Clean build folder between builds
  parts.clean(PATHS.build),
  // Minify Javascript
  parts.minifyJavaScript(),
]);

// DEVELOPMENT CONFIGS
const developmentConfig = merge([
  // Dev Server
  parts.devServer({
    host: 'localhost',
    port: 3000,
  }),
  // Analyze Bundle
  parts.analyzeBundle(),
  // Other Plugins
  {
    plugins: [
      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),
      // Ignore stuff
      new webpack.IgnorePlugin(/vertx/)
    ],
  },
]);

// SHARED CONFIGS
const commonConfig = merge([
  // Separate source map from bundles
  parts.generateSourceMaps({ type: 'source-map' }),
  {
    target: 'electron-renderer',
    // Set Performance Budget
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
    entry: {
      'tourWindow': [
        'react-hot-loader/patch',
        './tour/index.jsx',
      ],
      'mainWindow': [
        'react-hot-loader/patch',
        './app/renderer.js',
        './app/renderers/dialog.js',
        './app/renderers/dragNdrop.js',
        './app/renderers/menu.js',
        './app/index.jsx'
      ],
      'previewWindow': [
        'react-hot-loader/patch',
        './preview/index.jsx'
      ],
      'modalWindow': [
        'react-hot-loader/patch',
        './modal/modal_index.js'
      ]
    },
    output: {
      path: PATHS.build,
      publicPath: 'http://localhost:3000/',
      filename: '[name].bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
        }
      ]
    },
    node: {
      // Set relative to the project root
      __dirname: true
    },
    // Ignore all modules in node_modules folder
    externals: [nodeExternals({
      whitelist: ['webpack/hot/dev-server']
    })],
  },
]);

// EXPORT
module.exports = (env) => {
  if (env && env.production) {
    return merge(productionConfig, commonConfig);
  }
  return merge(developmentConfig, commonConfig);
};
