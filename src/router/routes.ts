import path from "node:path";
import type { Context, DefaultState, default as Koa } from "koa";
import koaStatic from "../middleware/staticMiddleware.js";
import bodyParser from "koa-bodyparser";
import session from "koa-session";
import koaLogger from "../middleware/koaLogger.js";
const { default:v1Router} = await import("./api/v1/index.js");
const { default:viewRouter} =await import ("./view/index.js");
import Router from "koa-router";
import cookiesMiddleware from "../middleware/cookiesMiddleware.js";
//import jwtMiddleware from "../middleware/jwtMiddleware.js";

const apiRouter = new Router<DefaultState, Context>({ prefix: "/api" });

apiRouter.use(v1Router.routes(), v1Router.allowedMethods());

export const routes = (app: Koa<Koa.DefaultState,Koa.Context>) => {
  app.use(v1Router.routes())
  app.use(viewRouter.routes())
};
