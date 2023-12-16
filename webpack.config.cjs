const path =require("path")
const {merge}=require("webpack-merge")
const baseConfig=require("./build/webpack.config.base.cjs")
const devConfig=require("./build/webpack.config.dev.cjs")
const prodConfig=require("./build/webpack.config.prod.cjs")

module.exports=(env,argv)=>{
    let config = argv.mode==='development'?devConfig:prodConfig;
    return merge(baseConfig,config)
}