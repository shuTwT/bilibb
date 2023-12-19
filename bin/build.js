import pkg from "../package.json" assert { type:'json'}
import { build } from 'esbuild'
build({
    entryPoints:['src/app.ts'],
    target:["node18"],
    format:"esm",
    platform:'node',
    bundle:true,
    outdir:'dist',
    plugins:[],
    external:[...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
})
