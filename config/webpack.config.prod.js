const webpack = require('webpack')
const paths = require('./paths')

const webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool : 'source-map',
  resolve : {
    modules: [
      paths.lib(),
      'node_modules'
    ],
    extensions : ['.js', '.jsx', '.json']
  },
  entry: paths.base('index.js'),
  output: {
    path: paths.build(),
    filename: 'nashorn-polyfill.webpack.js'
  },
  module : {},
  plugins: []
}

webpackConfig.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress : {
      unused    : true,
      dead_code : true,
      warnings  : false
    }
  })
)

module.exports = webpackConfig
