import type { Context, DefaultState } from "koa";
import Router from "koa-router";
import prisma from "../../../utils/prisma.js";
import { parseQuery, str2num } from "../utils.js";
import { largeScreenRouter } from "./largeScreen.js";
const { roomRouter } = await import("./room.js");
const { connectRouter } = await import("./connect.js");
const { liveRouter } = await import("./live.js");
const { userRouter } = await import("./user.js");
const { danmuRouter } = await import("./danmu.js");
const { analysisRouter } = await import("./analysis.js");

const v1Router = new Router<DefaultState, Context>({
  prefix: "/v1",
});

v1Router.use(roomRouter.routes());
v1Router.use(connectRouter.routes());
v1Router.use(liveRouter.routes());
v1Router.use(userRouter.routes());
v1Router.use(danmuRouter.routes());
v1Router.use(analysisRouter.routes());
v1Router.use(largeScreenRouter.routes())

/**
 * 进房量分页查询
 */
v1Router.get("/entry/list", async (ctx, next) => {
  const pageNum = str2num(parseQuery(ctx.query, "pageNum"), 1, { min: 1 });
  const pageSize = str2num(parseQuery(ctx.query, "pageSize"), 10, { min: 1 });
  const [entry, count] = await prisma.$transaction([
    prisma.userEntry.findMany({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      include: {
        User: true,
        Room: true,
      },
    }),
    prisma.userEntry.count(),
  ]);
  ctx.body = {
    code: 200,
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
  const body = ctx.request.body;
  const pageSize = str2num(parseQuery(query, "pageSize"), 10);
  const pageNum = str2num(parseQuery(query, "pageNum"), 1);
});

/**
 * 分享量分页查询
 */
v1Router.get("/share/list", async (ctx, next) => {
  const params = ctx.params;
  const query = ctx.query;
  const body = ctx.request.body;
  const pageSize = str2num(parseQuery(query, "pageSize"), 10);
  const pageNum = str2num(parseQuery(query, "pageNum"), 1);
});

/**
 * 关注量分页查询
 */
v1Router.get("/follow/list", async (ctx, next) => {
  const params = ctx.params;
  const query = ctx.query;
  const body = ctx.request.body;
  const pageSize = str2num(parseQuery(query, "pageSize"), 10);
  const pageNum = str2num(parseQuery(query, "pageNum"), 1);
});

/**
 * 礼物分页查询
 */
v1Router.get("/gift/list", async (ctx, next) => {
  const params = ctx.params;
  const query = ctx.query;
  const body = ctx.request.body;
  const pageSize = str2num(parseQuery(query, "pageSize"), 10);
  const pageNum = str2num(parseQuery(query, "pageNum"), 1);
    try{
        const [list,count] = await prisma.$transaction([
            prisma.gift.findMany({
                skip: (pageNum - 1) * pageSize,
                take: pageSize,
            }),
            prisma.gift.count()
        ])
        ctx.body={
            code:200,
            msg:"success",
            data:{
                list,
                total:count,
                pageSize,
                pageNum
            }
        }
    }catch(error){
        ctx.body={
            code:500,
            msg:String(error)
        }
    }
});

export default v1Router;
