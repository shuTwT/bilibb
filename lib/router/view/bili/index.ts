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
    
    const rid21=await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=22&ps=9').then(res=>res.json()).then(res=>res.data)
    const rid22=await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=22&ps=8').then(res=>res.json()).then(res=>res.data)
    const html=''
    const ranking=await fetch('https://api.bilibili.com/x/web-interface/ranking/v2').then(res=>res.json()).then(res=>res.data)
    const popular=await fetch('https://api.bilibili.com/x/web-interface/popular').then(res=>res.json()).then(res=>res.data)
    const precious=await fetch('https://api.bilibili.com/x/web-interface/popular/precious').then(res=>res.json()).then(res=>res.data)
    ctx.body=await getTemplate('bili/bili',{
        html,
        rid21,
        rid22,
        ranking,
        popular,
        precious
    })
    
})

export {biliRouter}