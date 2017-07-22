/* eslint import/no-extraneous-dependencies: "off" */

const path = require('path');
const webpack = require('webpack');

const library = 'cspaceRefName';
const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const filename = `${library}${isProduction ? '.min' : ''}.js`;

const config = {
  entry: './src/index.js',
  output: {
    filename,
    library,
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

if (isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
