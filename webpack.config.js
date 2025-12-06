const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_EMAILJS_SERVICE_ID': JSON.stringify(process.env.REACT_APP_EMAILJS_SERVICE_ID),
      'process.env.REACT_APP_EMAILJS_TEMPLATE_ID': JSON.stringify(process.env.REACT_APP_EMAILJS_TEMPLATE_ID),
      'process.env.REACT_APP_EMAILJS_PUBLIC_KEY': JSON.stringify(process.env.REACT_APP_EMAILJS_PUBLIC_KEY),
      'process.env.REACT_APP_GITHUB_USERNAME': JSON.stringify(process.env.REACT_APP_GITHUB_USERNAME),
      'process.env.REACT_APP_GITHUB_TOKEN': JSON.stringify(process.env.REACT_APP_GITHUB_TOKEN),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    port: 3001,
    open: true,
  },
  mode: 'development',
};
