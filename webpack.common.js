const dotEnv = require('dotenv');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const enProduccion = process.env.NODE_ENV === 'production';
dotEnv.config();

module.exports = {
  entry: './src/programa.js',
  output: {
    path: path.resolve(__dirname, `./docs`),
    publicPath: enProduccion ? process.env.URL_PUBLICA : '/',
    filename: '[name].[fullhash].js',
    chunkFilename: '[name].[fullhash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: './index.html',
      template: './src/index.html'
    }),
    new VueLoaderPlugin()
  ]
};
