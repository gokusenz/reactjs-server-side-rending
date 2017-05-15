const { resolve } = require('path');
require('dotenv').config();
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const task = process.env.NODE_ENV || 'development';
const nodePort = process.env.NODE_PORT || '80';

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    resolve(__dirname, 'src/client/index.js'),
  ],
  output: {
    publicPath: 'dist/',
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [resolve(__dirname, 'client'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
        exclude: /(node_modules)/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
        exclude: /(node_modules)/,
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        ],
        exclude: /(node_modules)/,
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    inline: true,
    port: nodePort,
    hot: true,
    historyApiFallback: true,
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(task),
      },
    }),
  ],
};
