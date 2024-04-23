import Router from "koa-router"
import prisma from "../../../utils/prisma.js"
import { parseQuery, str2num } from "../utils.js"
import type { Context, DefaultState } from "koa"

const roomRouter=new Router<DefaultState,Context>({prefix:'/room'})

roomRouter.get('/list', async (ctx, next) => {
    const pageNum = str2num(parseQuery(ctx.query, 'pageNum'), 1, { min: 1 })
    const pageSize = str2num(parseQuery(ctx.query, 'pageSize'), 10, { min: 1 })
    const [rooms, count] = await prisma.$transaction([
        prisma.room.findMany({
            skip: (pageNum - 1) * pageSize,
            take: pageSize,
        }),
        prisma.room.count()
    ])
    ctx.body = {
        code: 200,
        msg: "ok",
        data:{
            list:rooms,
            total:count,
            pageNum,
            pageSize
        }
    }
 
})

export {roomRouter}