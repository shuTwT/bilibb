import type { Context, DefaultState } from "koa";
import Router from "koa-router";
import { getTemplate } from "../../../api/utils";

const systemRouter = new Router<DefaultState, Context>({
    prefix:"/system"
});

systemRouter.get('/dept',async(ctx,next)=>{
    ctx.body=await getTemplate('admin/system/dept')
})


systemRouter.get('/user',async(ctx,next)=>{
    ctx.body=await getTemplate('admin/system/user')
})

export {systemRouter}