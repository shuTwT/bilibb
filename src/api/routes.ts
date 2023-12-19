import path from "node:path";
import type{ default as Koa,Context,Next } from "koa";
import koaStatic from "koa-static";
import bodyParser from "koa-bodyparser"
import koaLogger from "../middleware/koaLogger";
import v1Router from "./v1";

export default (app: Koa) => {
  app.use(bodyParser());
  app.use(koaLogger())
  app.use(koaStatic(path.resolve(process.cwd(), "static")));
  app.use(koaStatic(path.resolve(process.cwd(), "public")));

  app.use(v1Router.routes());
  app.use(v1Router.allowedMethods());
};
