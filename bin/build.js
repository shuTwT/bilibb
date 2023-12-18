import pkg from "../package.json" assert { type:'json'}
import vuePlugin from "esbuild-plugin-vue3"
const esbuildConfig=()=>require('esbuild').build({
    entryPoints:['src/app.ts'],
    target:["es2020","node18"],
    format:"esm",
    platform:'node',
    bundle:true,
    outdir:'dist',
    plugins:[vuePlugin()],
    external:[...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
})
esbuildConfig()