import type { Context, DefaultState } from "koa";
import Router from "koa-router";
import { getTemplate } from "../../../api/utils";

const liveRouter = new Router<DefaultState, Context>({
    prefix:"/live"
});

liveRouter.get('/connect',async(ctx,next)=>{
    ctx.body=await getTemplate('live/connect')
})


liveRouter.get('/danmu',async(ctx,next)=>{
    ctx.body=await getTemplate('live/danmu')
})
liveRouter.get('/live',async(ctx,next)=>{
    ctx.body=await getTemplate('live/live')
})
liveRouter.get('/room',async(ctx,next)=>{
    ctx.body=await getTemplate('live/room')
})
liveRouter.get('/setting',async(ctx,next)=>{
    ctx.body=await getTemplate('live/setting')
})
liveRouter.get('/users',async(ctx,next)=>{
    ctx.body=await getTemplate('live/users')
})

export {liveRouter}