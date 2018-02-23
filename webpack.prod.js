
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const staticSourcePath = path.join(__dirname, 'static');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    // Uglify
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      sourceMap: true,
      output: {
        comments: false
      }
    }),
    // Hashed module ids instead of names. Prod only
    new webpack.HashedModuleIdsPlugin(),
    // Minify CSS
    new StyleExtHtmlWebpackPlugin({
      minify: true
    }),
    // Copy html files and resources to destination, minify
    new HtmlWebpackPlugin({
      template: path.resolve(staticSourcePath, 'index.html'),
      favicon: path.resolve(staticSourcePath, 'favicon.ico'),
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
