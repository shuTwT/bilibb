import Router from "koa-router"
import prisma from "../../lib/prisma"
import {parseQuery,str2num}from "../utils"
import roomRouter from "./room"
import optionRouter from "./options"
import connectRouter from "./connect"
import liveRouter from "./live"
import userRouter from "./user"
import danmuRouter from "./danmu"
import analysisRouter from "./analysis"


const v1Router = new Router({
    prefix: '/v1'
})

v1Router.use(roomRouter.routes())
v1Router.use(optionRouter.routes())
v1Router.use(connectRouter.routes())
v1Router.use(liveRouter.routes())
v1Router.use(userRouter.routes())
v1Router.use(danmuRouter.routes())
v1Router.use(analysisRouter.routes())

/**
 * 进房量分页查询
 */
v1Router.get('/entry/list', async (ctx, next) => {
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 10, { min: 1 })
    const [entry,count] = await prisma.$transaction([
        prisma.userEntry.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include:{
                User:true,
                Room:true
            }
        }),
        prisma.userEntry.count()
    ])
    ctx.body = {
        code: 0,
        msg: "ok",
        count,
        data: entry
    }
})





/**
 * 点赞量分页查询
 */
v1Router.get('/like/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})

/**
 * 分享量分页查询
 */
v1Router.get('/share/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})

/**
 * 关注量分页查询
 */
v1Router.get('/follow/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})

/**
 * 礼物分页查询
 */
v1Router.get('/gift/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})





export default v1Router