import type { Context, Next } from "koa"
import Router from "koa-router"

import {renderToString} from "vue/server-renderer"

const v1Router =new Router()

const ssrCtx={}



v1Router.get('/v1/hello/router',async (ctx:Context,next:Next)=>{
    // const html=await renderToString(app,ssrCtx)
    // ctx.body=html
})
export default v1Router