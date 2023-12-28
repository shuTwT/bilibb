import { context } from 'esbuild'
import pkg from "../package.json" assert { type:'json'}
import externals from './externals.js'
let ctx=await context({
    entryPoints: ['src/app.ts'],
    target: ["node20"],
    format: "esm",
    platform: 'node',
    bundle: true,
    splitting:true,
    outdir: 'dist',
    plugins: [],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {}),...externals],

})
await ctx.watch()
console.log('watching...')