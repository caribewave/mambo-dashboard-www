const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const port = process.env.PORT || 3000;

const distPath = path.join(__dirname, 'dist');
const devAssetsPath = path.join(__dirname, 'dev', 'assets');

module.exports = merge(common, {
  devServer: {
    port: port,
    historyApiFallback: true,
    contentBase: path.resolve(distPath)
  },
  devtool: 'inline-source-map',
  plugins: [
    new CopyWebpackPlugin([ {
      from: path.resolve(path.join(devAssetsPath, 'conf.js')),
      to: path.resolve(path.join(distPath, 'conf'))
    },
    {
      from: path.resolve(path.join(devAssetsPath, '*.json')),
      to: path.resolve(distPath),
      flatten: true
    },
    {
      from: path.resolve(path.join(devAssetsPath, '*.md')),
      to: path.resolve(distPath),
      flatten: true
    }])
  ]
});
