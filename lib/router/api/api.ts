import type { Context, DefaultState, default as Koa } from "koa";
import Router from "koa-router";
const { default:v1Router} = await import("./v1/index.js");
import { loginRouter } from "./login.js";
import { systemRouter } from "./system/system.js";
const apiRouter = new Router<DefaultState, Context>({ prefix: "/api" });

apiRouter.use(v1Router.routes(), v1Router.allowedMethods());
apiRouter.use(loginRouter.routes(),loginRouter.allowedMethods())
apiRouter.use(systemRouter.routes(),systemRouter.allowedMethods())

export {apiRouter}