/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { default: ESLintWebpackPlugin } = require('eslint-webpack-plugin');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [new ESLintWebpackPlugin(optional)],
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
