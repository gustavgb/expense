const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = (env, argv) => ({
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: argv.mode === 'development' ? 'source-map' : '',
  name: 'client',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!server.js']
    }),
    new CopyPlugin([
      { from: 'public', to: '.' }
    ]),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      deleteOriginalAssets: true
    })
  ]
})
