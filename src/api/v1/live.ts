import Router from "koa-router"
import prisma from "../../lib/prisma"
import { parseQuery, str2num } from "../utils"
import type { Context, DefaultState } from "koa"

const liveRouter=new Router<DefaultState,Context>({prefix:'/live'})

liveRouter.get('/list', async (ctx, next) => {
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 10, { min: 1 })
    const date= parseQuery(ctx.query,'date')
    const [rooms, count] = await prisma.$transaction([
        prisma.live.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where:{
                date
            },
            orderBy:{
                date:'desc'
            },
            include:{
                Room:true,
            }
        }),
        prisma.live.count({
            where:{
                date
            }
        })
    ])
    ctx.body = {
        code: 0,
        msg: "ok",
        count,
        data: rooms
    }
})

export {liveRouter}