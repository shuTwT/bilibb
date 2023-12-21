import Router from "koa-router"
import prisma from "../../lib/prisma"
import { parseQuery, str2num } from "../utils"

const danmuRouter=new Router({prefix:'/danmu'})

/**
 * 弹幕分页查询
 */
danmuRouter.get('/list', async (ctx, next) => {
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 1, { min: 1 })
    const [speaks, count] = await prisma.$transaction([
        prisma.speak.findMany({
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.speak.count()
    ])
    ctx.body = {
        code: 0,
        msg: "ok",
        count,
        data: speaks
    }
})

/**
 * 某个直播间的弹幕
 */
danmuRouter.get('/list/:roomId', async (ctx, next) => {
    const roomId = ctx.params['roomId']
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 1, { min: 1 })
    const uid=parseQuery(ctx.query, 'uname')
    const uname = parseQuery(ctx.query, 'uname')
    const content = parseQuery(ctx.query, 'content')
    const [speaks, count] = await prisma.$transaction([
        prisma.speak.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
                uid,
                roomId,
                User: {
                    uname: {
                        contains: uname,
                    },
                },
                content: {
                    contains: content,
                },
            },
            include:{
                User:true
            }
        }),
        prisma.speak.count({
            where: {
                uid,
                roomId,
                User: {
                    uname: {
                        contains: uname,
                    },
                },
                content: {
                    contains: content,
                },
            }
        })
    ])
    ctx.body = {
        code: 0,
        msg: "ok",
        count,
        data: speaks
    }
})

export default danmuRouter