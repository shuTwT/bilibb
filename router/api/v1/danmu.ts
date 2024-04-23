import Router from "koa-router"
import prisma from "../../../utils/prisma.js"
import { parseQuery, str2num } from "../utils.js"
import type { Context, DefaultState, Next } from "koa"

const danmuRouter=new Router<DefaultState,Context>({prefix:'/danmu'})

/**
 * 弹幕分页查询
 */
danmuRouter.get('/list', async (ctx, next) => {
    const pageNum = str2num(parseQuery(ctx.query, 'pageNum'), 1, { min: 1 })
    const pageSize = str2num(parseQuery(ctx.query, 'pageSize'), 1, { min: 1 })
    const [speaks, count] = await prisma.$transaction([
        prisma.speak.findMany({
            skip: (pageNum - 1) * pageSize,
            take: pageSize,
            orderBy:{
                date:'desc'
            }
        }),
        prisma.speak.count()
    ])
    ctx.body = {
        code: 200,
        msg: "ok",
        count,
        data:{
            list:speaks,
            total:count,
            pageNum,
            pageSize,
        }
    }
})

/**
 * 某个直播间的弹幕
 */
danmuRouter.get('/list/:roomId', async (ctx, next) => {
    const roomId = ctx.params['roomId']
    const pageNum = str2num(parseQuery(ctx.query, 'pageNum'), 1, { min: 1 })
    const pageSize = str2num(parseQuery(ctx.query, 'pageSize'), 1, { min: 1 })
    const uid=parseQuery(ctx.query, 'uid')
    const uname = parseQuery(ctx.query, 'uname')
    const content = parseQuery(ctx.query, 'content')
    const [speaks, count] = await prisma.$transaction([
        prisma.speak.findMany({
            skip: (pageNum - 1) * pageSize,
            take: pageSize,
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
            orderBy:{
                date:'desc'
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
        code: 200,
        msg: "ok",
        data:{
            list:speaks,
            total:count,
            pageSize,
            pageNum,
        }
    }
})

export {danmuRouter}