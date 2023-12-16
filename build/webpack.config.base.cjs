const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
 
module.exports = {
  entry: {
   server:'./src/app.ts'},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'..', 'dist')
  },
  target: 'node', 
  resolve:{
    extensions:['.ts','.js']
  },
  module:{
    rules:[
        {
            test:/.ts$/,
            use:{
                loader:"ts-loader",
            },
            exclude:/node_modules/
        }
    ]
  },
  //externals:[nodeExternals()],
  plugins:[
    new CleanWebpackPlugin()
  ],
};