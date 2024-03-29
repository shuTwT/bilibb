import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import prisma from "../../../utils/prisma";
import { parseQuery, str2num } from "../utils";
import dayjs from "dayjs";
import { createContext } from "vm";
import { PassThrough } from "stream";

const noticeRouter = new Router<DefaultState, Context>({ prefix: "/notice" });

/**
 * 通知公告列表
 */
noticeRouter.get('/',async(ctx,next)=>{
    ctx.body={
        code:200,
        msg:"success",
        data:{
            list:[],
            total:0,
        }
    }
})

/**
 * 通知公告新增
 */
noticeRouter.post('/',async(ctx,next)=>{
    ctx.body={
        code:200,
        msg:"success",
    }
})

/**
 * 通知公告修改
 */
noticeRouter.put('/',async(ctx,next)=>{
    ctx.body={
        code:200,
        msg:"success",
    }
})
/**
 * 通知公告删除
 */
noticeRouter.delete('/:ids',async(ctx,next)=>{
    ctx.body={
        code:200,
        msg:"success",
    }
})

// noticeRouter.post('/msg',async(ctx,next)=>{
//     ctx.req.socket.setTimeout(0)
//     ctx.req.socket.setNoDelay(true)
//     ctx.req.socket.setKeepAlive(true)
//     ctx.set({
//         "Content-Type":"text/event-stream",
//         "Cache-Control":"no-cache",
//         "Connection":"keep-alive"
//     })

//     const steam = new PassThrough()
//     ctx.status=200
//     ctx.body=steam
// })

export {noticeRouter}