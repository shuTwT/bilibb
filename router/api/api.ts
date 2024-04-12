import type Koa from "koa";
import Router from "koa-router";
const { default: v1Router } = await import("./v1/index.js");
import { loginRouter } from "./login.js";
import { systemRouter } from "./system/system.js";
import { asyncRoutesRouter } from "./asyncRoutes.js";
import { monitorRouter } from "./system/monitor.js";
import { noticeRouter } from "./system/notice.js";

const apiRouter = new Router<Koa.DefaultState, Koa.Context>({ prefix: "/api" });

apiRouter.use(v1Router.routes(), v1Router.allowedMethods());
apiRouter.use(loginRouter.routes(), loginRouter.allowedMethods());
apiRouter.use(systemRouter.routes(), systemRouter.allowedMethods());
apiRouter.use(monitorRouter.routes(), monitorRouter.allowedMethods());
apiRouter.use(asyncRoutesRouter.routes(), asyncRoutesRouter.allowedMethods());

export { apiRouter };
