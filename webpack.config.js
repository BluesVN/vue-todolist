const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'budle.js',
    path:path.join(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader:'vue-loader'
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
]
}