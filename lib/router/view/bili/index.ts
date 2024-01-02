import path from "node:path"
import Router from "koa-router";
import ejs from "ejs";
import { str2num, parseQuery, getTemplate } from "../../api/utils.js";
import {createSSRApp,defineAsyncComponent} from "vue"
import {renderToString} from "vue/server-renderer"
import type { Context, DefaultState } from "koa";

const biliRouter =new Router<DefaultState, Context>({prefix:"/bili"})


biliRouter.get('/',async(ctx,next)=>{
    const template='bili/bili'
    
    const rid22=await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=22&ps=8').then(res=>res.json()).then(res=>res.data)
    const html=''
    const ranking=await fetch('https://api.bilibili.com/x/web-interface/ranking/v2').then(res=>res.json()).then(res=>res.data)
    ctx.body=await getTemplate('bili/bili',{
        html,
        rid22:rid22,
        ranking,
    })
    
})
biliRouter.get('/video/douga',async(ctx,next)=>{
    const template='bili/bili'
    
    const rid22=await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=22&ps=8').then(res=>res.json()).then(res=>res.data)
    const html=''
    const ranking=await fetch('https://api.bilibili.com/x/web-interface/ranking/v2').then(res=>res.json()).then(res=>res.data)
    ctx.body=await getTemplate('bili/bili',{
        html,
        rid22:rid22,
        ranking,
        tab:'douga'
    })
})
biliRouter.get('/video/music',async(ctx,next)=>{
    const template='bili/bili'
    
    const rid22=await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=22&ps=8').then(res=>res.json()).then(res=>res.data)
    const html=''
    const ranking=await fetch('https://api.bilibili.com/x/web-interface/ranking/v2').then(res=>res.json()).then(res=>res.data)
    ctx.body=await getTemplate('bili/bili',{
        html,
        rid22:rid22,
        ranking,
        tab:'music'
    })
})
biliRouter.get('/video/game',async(ctx,next)=>{
    const template='bili/bili'
    
    const rid22=await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=22&ps=8').then(res=>res.json()).then(res=>res.data)
    const html=''
    const ranking=await fetch('https://api.bilibili.com/x/web-interface/ranking/v2').then(res=>res.json()).then(res=>res.data)
    ctx.body=await getTemplate('bili/bili',{
        html,
        rid22:rid22,
        ranking,
        tab:'game'
    })
})
biliRouter.get('/video/ent',async(ctx,next)=>{
    const template='bili/bili'
    
    const rid22=await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=22&ps=8').then(res=>res.json()).then(res=>res.data)
    const html=''
    const ranking=await fetch('https://api.bilibili.com/x/web-interface/ranking/v2').then(res=>res.json()).then(res=>res.data)
    ctx.body=await getTemplate('bili/bili',{
        html,
        rid22:rid22,
        ranking,
        tab:'ent'
    })
})

biliRouter.get('/video/part',async(ctx,next)=>{
    const template='bili/bili'
    
    const rid22=await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=22&ps=8').then(res=>res.json()).then(res=>res.data)
    const html=''
    const ranking=await fetch('https://api.bilibili.com/x/web-interface/ranking/v2').then(res=>res.json()).then(res=>res.data)
    ctx.body=await getTemplate('bili/bili',{
        html,
        rid22:rid22,
        ranking,
        tab:'part'
    })
})
biliRouter.get('/video/bangumi',async(ctx,next)=>{
    const template='bili/bili'
    
    const rid22=await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=22&ps=8').then(res=>res.json()).then(res=>res.data)
    const html=''
    const ranking=await fetch('https://api.bilibili.com/x/web-interface/ranking/v2').then(res=>res.json()).then(res=>res.data)
    ctx.body=await getTemplate('bili/bili',{
        html,
        rid22:rid22,
        ranking,
        tab:'bangumi'
    })
})

export {biliRouter}