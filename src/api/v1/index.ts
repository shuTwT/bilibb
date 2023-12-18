import type { Context, Next } from "koa"
import Router from "koa-router"

const v1Router =new Router()

const ssrCtx={}



v1Router.get('/v1/hello/router',async (ctx:Context,next:Next)=>{
    ctx.body={
        a:"1"
    }
})
export default v1Router