import Router from "koa-router";
import prisma from "../../../utils/prisma.js";
import dayjs from "dayjs";
import type { Context, DefaultState } from "koa";

const largeScreenRouter = new Router<DefaultState, Context>({
  prefix: "/large-screen",
});

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
}

// 轮询刷新大屏数据
largeScreenRouter.get("/data", async (ctx, next) => {
  /**
   * 204表示无新数据或事件
   * 200表示有新数据或事件
   */
  await delay(30000);
  ctx.body = {
    code: 204,
    msg: "操作成功",
    data: {},
  };
});

export { largeScreenRouter };
