const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? '[name].[contenthash].js' : 'bundle.js',
      publicPath: '/',
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
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
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
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|webp|avif)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash][ext][query]'
          }
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
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: { ignore: ['**/index.html'] },
          },
        ],
      }),
      new webpack.DefinePlugin({
        'process.env.REACT_APP_EMAILJS_SERVICE_ID': JSON.stringify(process.env.REACT_APP_EMAILJS_SERVICE_ID),
        'process.env.REACT_APP_EMAILJS_TEMPLATE_ID': JSON.stringify(process.env.REACT_APP_EMAILJS_TEMPLATE_ID),
        'process.env.REACT_APP_EMAILJS_PUBLIC_KEY': JSON.stringify(process.env.REACT_APP_EMAILJS_PUBLIC_KEY),
        'process.env.REACT_APP_GITHUB_USERNAME': JSON.stringify(process.env.REACT_APP_GITHUB_USERNAME),
        'process.env.REACT_APP_GA_MEASUREMENT_ID': JSON.stringify(process.env.REACT_APP_GA_MEASUREMENT_ID),
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        }),
    ].filter(Boolean),
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      historyApiFallback: true,
      hot: true,
      port: 3001,
      open: true,
    },
  };
};
