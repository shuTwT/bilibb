import type { Context, Next } from "koa"
import Router from "koa-router"
import { createSSRApp } from "vue"
import {renderToString} from "vue/server-renderer"
const v1Router =new Router()

const app = createSSRApp({
    data:()=>({msg:'hello'}),
    template:`<div>{{msg}}</div>`
})

v1Router.get('/v1/hello/router',async (ctx:Context,next:Next)=>{
    const html=await renderToString(app)
    ctx.body=html
})
export default v1Router