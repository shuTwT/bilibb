import { build } from 'esbuild'
import pkg from "../package.json" assert { type:'json'}
import externals from './externals.js'
build({
    entryPoints:['src/app.ts'],
    target:["node18"],
    format:"esm",
    platform:'node',
    bundle:true,
    outdir:'dist',
    sourcemap:true,
    plugins:[],
    external:[...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {}),...Object.keys(externals||{})],
})
