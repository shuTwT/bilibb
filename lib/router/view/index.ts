import Router from "koa-router";
import ejs from "ejs";
import { str2num, parseQuery, getTemplate } from "../api/utils.js";
import type { Context, DefaultState } from "koa";
import { adminRouter } from "./admin.js";
import { biliRouter } from "./bili/index.js";
const viewRouter = new Router<DefaultState, Context>();

viewRouter.use(adminRouter.routes())
viewRouter.use(biliRouter.routes())

viewRouter.get("/login",async (ctx,next)=>{
    const template='login'
    ctx.body=await getTemplate(template)
})



export default viewRouter;
