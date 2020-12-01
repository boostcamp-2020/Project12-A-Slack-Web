/* eslint-disable */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDevelopment = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isDevelopment ? 'production' : 'development',
  devtool: isDevelopment ? 'hidden-source-map' : 'eval',

  entry: ['@babel/polyfill', './src/index.tsx'],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@atom': path.resolve(__dirname, 'src/component/atom'),
      '@molecule': path.resolve(__dirname, 'src/component/molecule'),
      '@organism': path.resolve(__dirname, 'src/component/organism'),
      '@constant': path.resolve(__dirname, 'src/constant'),
      '@page': path.resolve(__dirname, 'src/page'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@util': path.resolve(__dirname, 'src/util'),
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: '/node_modules/',
      },
    ],
  },

  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    hot: true,
    port: 8000,
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      path: path.resolve(__dirname, './dist'),
      filename: 'index.html',
    }),
    new Dotenv(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
  ],
}
