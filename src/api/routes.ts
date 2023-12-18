import v1Router from "./v1";
import loginRouter from "./views/login";
import type Koa from "koa";

export default async (app: Koa) => {

  app.use(loginRouter.routes())

  app.use(v1Router.routes()).use(v1Router.allowedMethods());
};
