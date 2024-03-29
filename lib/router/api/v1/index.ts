import type { Context, DefaultState } from "koa";
import Router from "koa-router";
import prisma from "../../../utils/prisma.js";
import { parseQuery, str2num } from "../utils.js";
const { roomRouter } = await import("./room.js");
const { optionRouter } = await import("./options.js");
const { connectRouter } = await import("./connect.js");
const { liveRouter } = await import("./live.js");
const { userRouter } = await import("./user.js");
const { danmuRouter } = await import("./danmu.js");
const { analysisRouter } = await import("./analysis.js");

const v1Router = new Router<DefaultState, Context>({
  prefix: "/v1",
});

v1Router.use(roomRouter.routes());
v1Router.use(optionRouter.routes());
v1Router.use(connectRouter.routes());
v1Router.use(liveRouter.routes());
v1Router.use(userRouter.routes());
v1Router.use(danmuRouter.routes());
v1Router.use(analysisRouter.routes());

/**
 * 进房量分页查询
 */
v1Router.get("/entry/list", async (ctx, next) => {
  const page = str2num(parseQuery(ctx.query, "page"), 1, { min: 1 });
  const limit = str2num(parseQuery(ctx.query, "limit"), 10, { min: 1 });
  const [entry, count] = await prisma.$transaction([
    prisma.userEntry.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        User: true,
        Room: true,
      },
    }),
    prisma.userEntry.count(),
  ]);
  ctx.body = {
    code: 0,
    msg: "ok",
    count,
    data: entry,
  };
});

/**
 * 点赞量分页查询
 */
v1Router.get("/like/list", async (ctx, next) => {
  const params = ctx.params;
  const query = ctx.query;
  const headers = ctx.headers;
  const body = ctx.request.body;
});

/**
 * 分享量分页查询
 */
v1Router.get("/share/list", async (ctx, next) => {
  const params = ctx.params;
  const query = ctx.query;
  const headers = ctx.headers;
  const body = ctx.request.body;
});

/**
 * 关注量分页查询
 */
v1Router.get("/follow/list", async (ctx, next) => {
  const params = ctx.params;
  const query = ctx.query;
  const headers = ctx.headers;
  const body = ctx.request.body;
});

/**
 * 礼物分页查询
 */
v1Router.get("/gift/list", async (ctx, next) => {
  const params = ctx.params;
  const query = ctx.query;
  const headers = ctx.headers;
  const body = ctx.request.body;
});

export default v1Router;
