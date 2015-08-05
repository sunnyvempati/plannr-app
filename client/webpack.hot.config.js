const path = require('path');
const config = require('./webpack.common.config');
const webpack = require('webpack');

config.entry.push('webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/dev-server',
  './scripts/webpack_only');

config.output = {

  // this file is served directly by webpack
  filename: 'local-bundle.js',
  path: __dirname
};
config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];
config.devtool = 'eval-source-map';

config.module.loaders.push(
  {test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
  {test: /\.css$/, loader: 'style-loader!css-loader'},
  {
    test: /\.scss$/,
    loader: 'style!css!sass?outputStyle=expanded&imagePath=/assets/images&includePaths[]=' +
    path.resolve(__dirname, './assets/stylesheets')
  },
  {
    test: /\.svg$/,
    loader: 'file-loader'
  },

  // The url-loader uses DataUrls. The file-loader emits files.
  {test: /\.woff$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
  {test: /\.woff2$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
  {test: /\.ttf$/, loader: 'file-loader'},
  {test: /\.eot$/, loader: 'file-loader'},
  {test: /\.svg$/, loader: 'file-loader'});

module.exports = config;
