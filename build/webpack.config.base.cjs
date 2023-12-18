const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { VueLoaderPlugin } = require('vue-loader')
 
module.exports = {
  entry: {
   server:'./src/app.ts'},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'..', 'dist'),
  },
  target: 'node', 
  resolve:{
    extensions:['.ts','.js','.vue'],
    alias: {
        'components': path.resolve('src/components'),
        'assets': path.resolve('src/assets')
    }
  },
  module:{
    rules:[
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test:/.ts$/,
            use:{
                loader:"ts-loader",
            },
            exclude:/node_modules/
        }
    ]
  },
  externals:[nodeExternals()],
  plugins:[
    new CleanWebpackPlugin(),
    new DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: true
    }),
    new VueLoaderPlugin()
  ],
};