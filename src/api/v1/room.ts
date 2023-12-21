import Router from "koa-router"
import prisma from "../../lib/prisma"
import { parseQuery, str2num } from "../utils"

const roomRouter=new Router({prefix:'/room'})

roomRouter.get('/list', async (ctx, next) => {
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 10, { min: 1 })
    const [rooms, count] = await prisma.$transaction([
        prisma.room.findMany({
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.room.count()
    ])
    ctx.body = {
        code: 0,
        msg: "ok",
        count,
        data: rooms
    }
 
})

export default roomRouter