import Router from "koa-router";
import ejs from "ejs";
import { str2num, parseQuery, getTemplate } from "../api/utils.js";
import * as log4js from "../../utils/log4js.js"
import type { Context, DefaultState } from "koa";
import { adminRouter } from "./admin.js";
const viewRouter = new Router<DefaultState, Context>();

viewRouter.use(adminRouter.routes())

viewRouter.get("/login",async (ctx,next)=>{
    const template='login'
    ctx.body=ejs.render(getTemplate(template,'ejs'))
})



export default viewRouter;
