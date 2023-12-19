import pkg from "../package.json" assert { type:'json'}
import { context } from 'esbuild'
let ctx=await context({
    entryPoints: ['src/app.ts'],
    target: ["es2020", "node18"],
    format: "esm",
    platform: 'node',
    bundle: true,
    outdir: 'dist',
    plugins: [],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],

})
await ctx.watch()
console.log('watching...')