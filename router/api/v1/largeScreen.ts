import Router from "koa-router";
import prisma from "../../../utils/prisma.js";
import dayjs from "dayjs";
import type { Context, DefaultState } from "koa";

const largeScreenRouter = new Router<DefaultState, Context>({
  prefix: "/large-screen",
});

// 轮询刷新大屏数据
largeScreenRouter.get("/data", async (ctx, next) => {
  /**
   * 204表示无新数据或事件
   * 200表示有新数据或事件
   */
  const roomOption = await prisma.options.findUnique({
    where: {
      optionName: "roomId",
    },
  });
  const userOption = await prisma.options.findUnique({
    where: {
      optionName: "uid",
    },
  });
  let room = null;
  let live = null;
  if (roomOption) {
    room = await prisma.room.findUnique({
      where: {
        roomId: roomOption.optionValue,
      },
    });
    live = await prisma.live.findMany({
      where: {
        roomId:roomOption.optionValue
      },
    });
  }
  ctx.body = {
    code: 200,
    msg: "操作成功",
    data: {
      todayData: {
        comment: "今日数据",
        newEntryNum: 228,
        entryNum: 2000,
        spekNum: 2000,
        entryNumfor7day: {
          entryNum: [0, 0, 0, 0, 0, 0, 0],
          newEntryNum: [0, 0, 0, 0, 0, 0, 0],
        },
        speakNumfor7day: {
          speakNum: [0, 0, 0, 0, 0, 0, 0],
          speakPeopleNum: [0, 0, 0, 0, 0, 0, 0],
        },
      },
      Room: room,
      Live: live,
    },
  };
});

export { largeScreenRouter };
