import Router from "koa-router";
import { str2num, parseQuery, getTemplate } from "../api/utils.js";
import type { Context, DefaultState } from "koa";
const viewRouter = new Router<DefaultState, Context>();


viewRouter.get("/",async (ctx,next)=>{
    const template='index'
    ctx.body=await getTemplate(template)
})


export default viewRouter;
