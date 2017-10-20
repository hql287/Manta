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
  // Analyze Bundle
  parts.analyzeBundle(),
  // Dev Server
  parts.devServer({
    host: 'localhost',
    port: 3000,
  }),
  {
    // Other Plugins
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
  // Extract Bundle & Code Spliting
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
  ]),
  {
    target: 'electron-renderer',
    // Set Performance Budget
    performance: {
      // Show performance warning. Can use 'error' as well
      hints: 'warning',
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
    entry: {
      'tour': [
        'react-hot-loader/patch',
        './tour/index.jsx',
      ],
      'main': [
        'react-hot-loader/patch',
        './app/renderer.js',
        './app/renderers/dialog.js',
        './app/renderers/dragNdrop.js',
        './app/renderers/menu.js',
        './app/index.jsx'
      ],
      'preview': [
        'react-hot-loader/patch',
        './preview/index.jsx'
      ],
      'modal': [
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
      // Except Webpack Hot Devserver & Emitter
      whitelist: [
        'webpack/hot/dev-server',
        'webpack/hot/emitter',
      ]
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
