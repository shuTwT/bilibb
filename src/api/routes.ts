import path from "node:path";
import fs from "node:fs"
import type{ default as Koa,Context,Next } from "koa";
import koaStatic from "koa-static";
import bodyParser from "koa-bodyparser"
import v1Router from "./v1";

export default (app: Koa) => {
  app.use(koaStatic(path.resolve(process.cwd(), "static")));
  app.use(koaStatic(path.resolve(process.cwd(), "public")));
  app.use(bodyParser());
  app.use(v1Router.routes());
  app.use(v1Router.allowedMethods());
};
