import Router from "koa-router";
import { getTemplate } from "../../api/utils.js";
import type { Context, DefaultState } from "koa";

const mallRouter =new Router<DefaultState, Context>({prefix:"/mall"})


mallRouter.get('/',async(ctx,next)=>{
    ctx.body=await getTemplate('mall/mall')
    
})

export {mallRouter}