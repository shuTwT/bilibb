#!/usr/bin/env node
const esbuildConfig=()=>require('esbuild').buildSync({
    entryPoints:['src/index.js'],
    target:["es2020","node18"],
    platform:'node',
    outdir:'dist'
})