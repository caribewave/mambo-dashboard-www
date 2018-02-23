const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, 'src');
const staticSourcePath = path.join(__dirname, 'static');
const distPath = path.join(__dirname, 'dist');

module.exports = {
  entry: {
    app: path.resolve(sourcePath, path.join('js','index.js'))
  },
  // Destination directory
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].[chunkhash].js"
  },
  // External config (will not be bundled)
  externals: {
    [path.resolve(sourcePath, path.join('conf','conf.js'))]: 'Config'
  },
  devtool: "source-map", // any "source-map"-like devtool is possible
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
        include: sourcePath
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
        use: 'file-loader?name=assets/[name]-[hash].[ext]',
        include: staticSourcePath
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        use: [
          'url-loader?limit=20480&name=assets/[name]-[hash].[ext]'
        ],
        include: staticSourcePath
      }
    ]
  },
  plugins: [
    // Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin(
        [
          { from: path.join(staticSourcePath, 'images'), to: path.join(distPath, 'images')}
        ]
    ),
    // Separate vendor content from our js code
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks (module) {
        return module.context && module.context.indexOf('node_modules') >= 0;
      }
    }),
    // Extract SASS files into CSS file
    new ExtractTextPlugin({
      filename: "[name].[chunkhash].css"
    }),
    // Copy html files and resources to destination, minify
    new HtmlWebpackPlugin({
      template: path.resolve(staticSourcePath, 'index.html'),
      favicon: path.resolve(staticSourcePath, 'favicon.ico'),
    })
  ]
};
