
const path = require('path');
const webpack = require('webpack')

//new from devstkt
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const UglifyJS = require('uglify-es');

const VENDOR_LIBS = [
  'babel-polyfill', 'redux', 'react-redux', 'react-dom'
]

//taken from devstkt.....................................>
const DefaultUglifyJsOptions = UglifyJS.default_options();
const compress = DefaultUglifyJsOptions.compress;
for (let compressOption in compress) {
	compress[compressOption] = false;
}
compress.unused = true;
//........................................................>



module.exports = env => {
  return {
    entry: {
      firstComp: './assets/js/firstComp/firstComp.js',
      regularJS: './assets/js/regularJS.js',
      vendor: VENDOR_LIBS
    },
    output: { path: path.resolve(__dirname, 'public/js/components'),
              filename: '[name].js'
              },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
          // options: {
          //   presets: [
          //     '@babel/preset-env',
          //     '@babel/preset-react'
          //   ]
          // }
        },
        {
              test: /\.scss$/,
              use: [{
                  loader: "style-loader"
              }, {
                  loader: "css-loader", options: {
                      sourceMap: true
                  }
              }, {
                  loader: "sass-loader", options: {
                      sourceMap: true
                  }
              }]
          }
      ]
    },
    plugins: [
              new webpack.optimize.CommonsChunkPlugin({
                  name: 'vendor',
                  minChunks: function (module) {
                     // this assumes your vendor imports exist in the node_modules directory
                     return module.context && module.context.indexOf('node_modules') !== -1;
                  }
              }),
      //         new webpack.optimize.UglifyJsPlugin({
      //   sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
      // }),
      // new webpack.Define
              // new webpack.optimize.CommonsChunkPlugin({
              //     name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
              // })
          ]
  }

};
