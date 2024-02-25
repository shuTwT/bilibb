import Router from "koa-router";
import ejs from "ejs";
import { str2num, parseQuery, getTemplate } from "../api/utils.js";
import type { Context, DefaultState } from "koa";
import { adminRouter } from "./admin/admin.js";
const viewRouter = new Router<DefaultState, Context>();

viewRouter.use(adminRouter.routes())
viewRouter.get("/login",async (ctx,next)=>{
    const template='login'
    ctx.body=await getTemplate(template)
})
viewRouter.get("/",async (ctx,next)=>{
    const template='index'
    ctx.body=await getTemplate(template)
})



export default viewRouter;
