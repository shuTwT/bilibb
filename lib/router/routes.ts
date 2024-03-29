import type { Context, DefaultState, default as Koa } from "koa";
import { apiRouter } from "./api/api.js";




export const routes = (app: Koa<Koa.DefaultState,Koa.Context>) => {
  app.use(apiRouter.routes())
};
