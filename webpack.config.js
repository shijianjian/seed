var webpack = require('webpack');

const ngToolsWebpack = require('@ngtools/webpack');

const path = require("path");

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './assets/app/main.ts',
  output: {
    path: './public/js/app',
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new ngToolsWebpack.AotPlugin({
      tsConfigPath: './tsconfig.aot.json'
    }),
    new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
      
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ['raw-loader'] },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.ts$/, loader: ['@ngtools/webpack'] }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
