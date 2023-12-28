import { build } from 'esbuild'
import pkg from "../package.json" assert { type:'json'}
import externals from './externals.js'
build({
    entryPoints:['src/app.ts'],
    target:["node18"],
    format:"esm",
    platform:'node',
    bundle:true,
    splitting:true,
    outdir:'dist',
    plugins:[],
    external:[...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {}),...externals],
})
