import type Koa from "koa";
import Router from "koa-router";
const { default: v1Router } = await import("./v1/index.js");
import { authRouter } from "./auth.js";
import { systemRouter } from "./system/index.js";
import { asyncRoutesRouter } from "./asyncRoutes.js";
import { monitorRouter } from "./system/monitor.js";
import { uploadRouter } from "./upload.js";

const apiRouter = new Router<Koa.DefaultState, Koa.Context>({ prefix: "/api" });

apiRouter.use(v1Router.routes(), v1Router.allowedMethods());
apiRouter.use(authRouter.routes(), authRouter.allowedMethods());
apiRouter.use(systemRouter.routes(), systemRouter.allowedMethods());
apiRouter.use(monitorRouter.routes(), monitorRouter.allowedMethods());
apiRouter.use(asyncRoutesRouter.routes(), asyncRoutesRouter.allowedMethods());
apiRouter.use(uploadRouter.routes(),uploadRouter.allowedMethods())
export { apiRouter };
