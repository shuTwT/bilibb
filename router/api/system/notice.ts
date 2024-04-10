import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import prisma from "../../../utils/prisma";
import dayjs from "dayjs";
import type { TransformCallback } from "stream";
import { Transform } from "stream";
import EventEmitter from "events";

class SSEStream extends Transform {
  constructor() {
    super({
      writableObjectMode: true,
    });
  }
  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.push(`data:${JSON.stringify(chunk)}\n\n`);
    callback();
  }
}

const noticeRouter = new Router<DefaultState, Context>({ prefix: "/notice" });
const events = new EventEmitter();
events.setMaxListeners(0);

//向所有客户端推送数据
const interval = setInterval(() => {
  try {
    // prisma.sysNotice.findMany({
    //     where:{

    //     }
    // })
    events.emit("data", {
      code: 200,
      msg: "success",
      timestamp: new Date(),
    });
  } catch (error) {
    events.emit("data", {
      code: 500,
      msg: String(error),
      timestamp: new Date(),
    });
  }
}, 2000);

/**
 * 通知公告列表
 */
noticeRouter.get("/", async (ctx, next) => {
  const noticeTitle = ctx.params.noticeTitle;
  const noticeType = ctx.params.noticeType;
  const noticeReaded = ctx.params.noticeReaded;
  const pageSize = Number(ctx.params.pageSize);
  const pageNum = Number(ctx.params.pageNum);
  const [noticeList, count] = await prisma.$transaction([
    prisma.sysNotice.findMany({
      where: {
        noticeTitle: {
          contains: noticeTitle,
        },
        noticeType,
        noticeReaded
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createTime: "desc",
      },
    }),
    prisma.sysNotice.count({
      where: {
        noticeTitle: {
          contains: noticeTitle,
        },
        noticeType,
        noticeReaded
      },
    }),
  ]);
  ctx.body = {
    code: 200,
    msg: "success",
    data: {
      list: noticeList,
      total: count,
    },
  };
});

/**
 * 通知公告新增
 */
noticeRouter.post("/", async (ctx, next) => {
    const body:any = ctx.request.body
    try{
        await prisma.sysNotice.create({
            data:{
                noticeTitle:body.noticeTitle,
                noticeType:body.noticeType,
                noticeContent:body.noticeContent,
            }
        })
    }catch{}
  ctx.body = {
    code: 200,
    msg: "success",
  };
});

/**
 * 通知公告修改
 */
noticeRouter.put("/", async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: "success",
  };
});
/**
 * 通知公告删除
 */
noticeRouter.delete("/:ids", async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: "success",
  };
});

noticeRouter.post("/msg", async (ctx, next) => {
  ctx.req.socket.setTimeout(0);
  ctx.req.socket.setNoDelay(true);
  ctx.req.socket.setKeepAlive(true);
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const stream = new SSEStream();
  ctx.status = 200;
  ctx.body = stream;

  const listener = (data: object) => {
    stream.write(data);
  };

  events.on("data", listener);

  stream.on("close", () => {
    events.off("data", listener);
  });
});

export { noticeRouter };
