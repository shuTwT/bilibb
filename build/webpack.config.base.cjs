const path = require('path');
 
module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'..', 'dist')
  },
  target: 'node', 
  devServer:{
    contentBase:'./dist'
  },
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
};