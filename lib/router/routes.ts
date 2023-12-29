import type { Context, DefaultState, default as Koa } from "koa";
const { default:v1Router} = await import("./api/v1/index.js");
const { default:viewRouter} =await import ("./view/index.js");
import Router from "koa-router";

const apiRouter = new Router<DefaultState, Context>({ prefix: "/api" });

apiRouter.use(v1Router.routes(), v1Router.allowedMethods());

export const routes = (app: Koa<Koa.DefaultState,Koa.Context>) => {
  app.use(apiRouter.routes())
  app.use(viewRouter.routes())
};
