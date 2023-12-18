import path from "path";
import v1Router from "./v1";

import type Koa from "koa";
import koaStatic from "koa-static";
import bodyParser from "koa-bodyparser"


export default (app: Koa) => {
  app.use(koaStatic(path.resolve(process.cwd(), "static")));
  app.use(koaStatic(path.resolve(process.cwd(), "public")));
  app.use(bodyParser());
  app.use(v1Router.routes());
  app.use(v1Router.allowedMethods());
};
