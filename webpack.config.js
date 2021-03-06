
const path = require('path');
const webpack = require('webpack')

//new from devstkt................................................>
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const UglifyJS = require('uglify-es');
//.................................................................>



// const VENDOR_LIBS = [
//   'babel-polyfill', 'redux', 'react-redux', 'react-dom'
// ]

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
    mode: 'development',
    entry: {
      FirstComp: './assets/js/components/FirstComp.js',
      // regularJS: './assets/js/regularJS.js',
      vendor: VENDOR_LIBS
    },
    devtool: 'inline-source-map',
    output: { path: path.resolve(__dirname, '/public/js/components'),
              filename: '[name].js'
              },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
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
    			// new MiniCssExtractPlugin({
    			// 	filename: 'styles.css' // 'style.[contenthash].css' put this if you want to get hashed files to cache bust
    			// }), // new HtmlWebpackPlugin({
    			// // 	inject: false,
    			// // 	hash: true,
    			// // 	template: './assets/index.html',
    			// // 	children: false,
    			// // 	filename: '../index.html'
    			// // }),
    			new WebpackMd5Hash()
    		],
    		optimization: {
    			splitChunks: { chunks: 'all', minSize: 0 },
    			minimize: true,
    			minimizer: [
    				new UglifyJsPlugin({
    					uglifyOptions: {
    						compress,
    						mangle: false,
    						output: {
    							beautify: env.NODE_ENV !== 'production' ? true : false
    						}
    					}
    				})
    			],
    			usedExports: true,
    			sideEffects: true
    		}
  }

};
