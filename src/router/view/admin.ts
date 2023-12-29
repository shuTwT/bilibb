import type { Context, DefaultState } from "koa";
import ejs from "ejs";
import Router from "koa-router";
import { str2num, parseQuery, getTemplate } from "../api/utils.js";

const adminRouter = new Router<DefaultState, Context>({
    prefix:"/admin"
});

adminRouter.get("/",async (ctx,next)=>{
    const template='admin'
    ctx.body=ejs.render(getTemplate(template,'ejs'))
})

adminRouter.get("/profile",async(ctx,next)=>{
    const template='admin/system/profile'
    ctx.body=ejs.render(getTemplate(template,'ejs'))
})

export{adminRouter}