import path from "path";
import v1Router from "./v1";

import type Koa from "koa";
import koaStatic from "koa-static";

export default async (app: Koa) => {
  app.use(koaStatic(path.resolve(process.cwd(), "static")));
  app.use(koaStatic(path.resolve(process.cwd(), "public")));
  app.use(v1Router.routes()).use(v1Router.allowedMethods());
};
