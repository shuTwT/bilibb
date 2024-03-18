import type { Context, DefaultState, default as Koa } from "koa";
const { default:viewRouter} =await import ("./view/index.js");
import Router from "koa-router";
import { apiRouter } from "./api/api.js";




export const routes = (app: Koa<Koa.DefaultState,Koa.Context>) => {
  app.use(apiRouter.routes())
  app.use(viewRouter.routes())
};
