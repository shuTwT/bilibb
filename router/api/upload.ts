import type { DefaultState, Context } from "koa";
import Router from "koa-router";

const uploadRouter = new Router<DefaultState, Context>();

uploadRouter.post('/upload',async(ctx,next)=>{
    const body = ctx.request.body
})

export {uploadRouter}