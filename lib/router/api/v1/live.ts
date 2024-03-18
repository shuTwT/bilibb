import Router from "koa-router"
import prisma from "../../../utils/prisma.js"
import { parseQuery, str2num } from "../utils.js"
import type { Context, DefaultState } from "koa"

const liveRouter=new Router<DefaultState,Context>({prefix:'/live'})

liveRouter.get('/list', async (ctx, next) => {
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 10, { min: 1 })
    const date= parseQuery(ctx.query,'date')
    const roomId=parseQuery(ctx.query,'roomId')
    const title = parseQuery(ctx.query,'title')
    const [rooms, count] = await prisma.$transaction([
        prisma.live.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where:{
                date,
                roomId:{
                    contains:roomId
                },
                title:{
                    contains:title
                }
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
                date,
                roomId:{
                    contains:roomId
                }
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