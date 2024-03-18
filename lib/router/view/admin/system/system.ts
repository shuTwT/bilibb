import type { Context, DefaultState } from "koa";
import Router from "koa-router";
import { getTemplate } from "../../../api/utils";

const systemRouter = new Router<DefaultState, Context>({
    prefix:"/system"
});

systemRouter.get('/dept',async(ctx,next)=>{
    ctx.body=await getTemplate('system/dept/main',void 0 ,void 0,'html')
})
systemRouter.get('/dept/add',async(ctx,next)=>{
    ctx.body=await getTemplate('system/dept/add',void 0 ,void 0,'html')
})
systemRouter.get('/dept/edit',async(ctx,next)=>{
    ctx.body=await getTemplate('system/dept/edit',void 0 ,void 0,'html')
})


systemRouter.get('/user',async(ctx,next)=>{
    ctx.body=await getTemplate('system/user/main',void 0 ,void 0,'html')
})

export {systemRouter}