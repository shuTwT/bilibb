import Router from "koa-router"
import { connectPool } from "../../pool"
import prisma from "../../lib/prisma"
import { ParsedUrlQuery } from "querystring"
const v1Router = new Router()

v1Router.get('/v1/connect/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
    ctx.body = {
        code: 0,
        msg: "ok",
        data: Object.keys(connectPool)
    }
})

/**
 * 进房量分页查询
 */
v1Router.get('/v1/entry/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})

/**
 * 弹幕量分页查询
 */
v1Router.get('/v1/danmu/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})

/**
 * 点赞量分页查询
 */
v1Router.get('/v1/like/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})

/**
 * 分享量分页查询
 */
v1Router.get('/v1/share/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})

/**
 * 关注量分页查询
 */
v1Router.get('/v1/follow/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})

/**
 * 礼物分页查询
 */
v1Router.get('/v1/gift/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})

/**
 * 用户分页查询
 */
v1Router.get('/v1/:roomid/user/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
    const roomid=ctx.params["roomid"]
    const pageNum = str2num(parseQuery(query, 'pageNum'), 1, { min: 1 })
    const limit = str2num(parseQuery(query, 'limit'), 1, { min: 1 })

    const [users, count] = await prisma.$transaction([
        prisma.user.findMany({
            skip: (pageNum - 1)*limit,
            take: limit,
        }),
        prisma.user.count()
    ])
    ctx.body={
        code:0,
        msg:"ok",
        count,
        data:users
    }

})

/**
 * 用户信息查询
 */
v1Router.get('/v1/user/info/:uid', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})

function parseQuery(query: ParsedUrlQuery, key: string): string {
    const value = query[key]
    if (typeof value !== 'undefined') {
        if (Array.isArray(value)) {
            return value.join(',')
        } else {
            return value
        }
    } else {
        return 'undefined'
    }
}
function str2num(str: string, defaultValue: number): number
function str2num(str: string, defaultValue: number, options?: {
    min?: number,
    max?: number
}): number
function str2num(str: string, defaultValue: number, options?: {
    min?: number,
    max?: number
}): number {
    let num = isNaN(Number.parseInt(str)) ? defaultValue : Number.parseInt(str)
    if (options) {
        if (options.min && options.max) {
            if (options.max <= options.min) throw "max必须大于min"
            if (num > options.max) {
                num = options.max
            } else if (num < options.min) {
                num = options.min
            }
        } else if (options.max && num > options.max) {
            num = options.max
        } else if (options.min && num < options.min) {
            num = options.min
        }
    }
    return num
}
export default v1Router