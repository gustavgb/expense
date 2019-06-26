const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const common = {
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
  }
}

module.exports = [
  Object.assign({}, common, {
    entry: './src/server.js',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist')
    },
    name: 'server',
    target: 'node',
    externals: [nodeExternals()]
  }),
  Object.assign({}, common, {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    name: 'client',
    target: 'web',
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!server.js']
      }),
      new CopyPlugin([
        { from: 'public', to: '.' }
      ])
    ]
  })
]
