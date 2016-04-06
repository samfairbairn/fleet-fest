var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname, './');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var DEV = (process.env.NODE_ENV !== 'prod');

var plugins = DEV ? [] : [
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
];

module.exports = {
  entry: [
    './modules/main.js'
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true,
    }),
  ].concat(plugins),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: DEV ?
          //'style-loader!css-loader!sass-loader'
          ExtractTextPlugin.extract('style-loader', 'css-loader?autoprefixer-loader?browsers=last 3 version!sass-loader') :
          ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!autoprefixer-loader?browsers=last 3 version!sass-loader')
      },
      {
        test: /\.(jpe?g|png|svg)$/i,
        loaders: DEV ? [
          'url-loader?hash=sha512&digest=hex&limit=10&name=/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ] : [
          'url-loader?hash=sha512&digest=hex&limit=100000&name=/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: DEV ?
        'url-loader?limit=10&mimetype=application/font-woff' :
        'url-loader?limit=100000&mimetype=application/font-woff'
      },
      { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  }
};
