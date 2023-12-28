import path from "node:path";
import type{ default as Koa } from "koa";
import koaStatic from "koa-static";
import bodyParser from "koa-bodyparser"
import koaLogger from "../middleware/koaLogger";
import v1Router from "./v1";
import viewRouter from "../view";
import Router from "koa-router";
import cookiesMiddleware from "../middleware/cookiesMiddleware";

const apiRouter =new Router({prefix:"/api"})

apiRouter.use(v1Router.routes(),v1Router.allowedMethods())

export default (app: Koa) => {
  app.use(bodyParser());
  app.use(koaLogger())
  app.use(cookiesMiddleware())
  app.use(koaStatic(path.resolve(process.cwd(), "static")));
  app.use(koaStatic(path.resolve(process.cwd(), "public")));
  app.use(viewRouter.routes())
  app.use(apiRouter.routes())
};
