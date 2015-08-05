const config = require('./webpack.common.config');

// this is where the final bundle that gets added
// to sprockets goes to.
config.output = {
  filename: 'client-bundle.js',
  path: '../app/assets/javascripts/generated'
};

config.externals = {jquery: 'var jQuery'};

config.module.loaders.push(
  {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
  {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},

  // Next 2 lines expose jQuery and $ to any JavaScript files loaded after client-bundle.js
  // in the Rails Asset Pipeline. Thus, load this one prior.
  {test: require.resolve('jquery'), loader: 'expose?jQuery'},
  {test: require.resolve('jquery'), loader: 'expose?$'}
);

module.exports = config;
