// used by rails and webpack dev server configs
const path = require('path');

module.exports = {
  // the project dir
  context: __dirname,
  entry: ['./assets/javascripts/App'],
  resolve: {
    root: [path.join(__dirname, 'scripts'),
           path.join(__dirname, 'assets/javascripts'),
           path.join(__dirname, 'assets/stylesheets')],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', 'config.js']
  },
  module: {
    loaders: []
  }
};
