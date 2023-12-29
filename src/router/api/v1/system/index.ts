import type { Context, DefaultState } from "koa";
import Router from "koa-router";
import { authRouter } from "./auth.js";

const systemRouter = new Router<DefaultState,Context>({
    prefix:'/system'
})

systemRouter.use(authRouter.routes())

export {systemRouter}