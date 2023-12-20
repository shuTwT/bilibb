import fs from "node:fs"
import Router from "koa-router"
import { connectPool } from "../../pool"
import prisma from "../../lib/prisma"
import { ParsedUrlQuery } from "querystring"
import path from "node:path"
import ejs from "ejs"


function getTemplate(name: string, ext: string = 'html') {
    const buffer = fs.readFileSync(path.resolve(process.cwd(), 'template', `${name}.${ext}`))
    return buffer.toString()
}

const v1Router = new Router({
    prefix: '/api/v1'
})
v1Router.get('/options/all',async(ctx,next)=>{
    const options=await prisma.options.findMany()
    ctx.body={
        code:0,
        msg:"ok",
        data:options
    }
})
/**
 * 头像代理
 */
// v1Router.get('/bfs/face/:path',async(ctx,next)=>{
//     const path=ctx.params['path']
   
// })

v1Router.get('/connect/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
    const roomIds=Object.keys(connectPool) 
    const rooms=await Promise.all(roomIds.map(async(item)=>{
        return await prisma.room.findUnique({
            where:{
                roomId:item
            }
        })
    }))

    ctx.body = {
        code: 0,
        msg: "ok",
        data: rooms
    }
})
v1Router.get('/room/list', async (ctx, next) => {
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
v1Router.get('/live/list', async (ctx, next) => {
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
 * 弹幕分页查询
 */
v1Router.get('/danmu/list', async (ctx, next) => {
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
v1Router.get('/danmu/list/:roomId', async (ctx, next) => {
    const roomId = ctx.params['roomId']
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 1, { min: 1 })
    const [speaks, count] = await prisma.$transaction([
        prisma.speak.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
                roomId
            },
            include:{
                User:true
            }
        }),
        prisma.speak.count({
            where: {
                roomId
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

/**
 * 用户分页查询
 */
v1Router.get('/user/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
    const page = str2num(parseQuery(query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(query, 'limit'), 1, { min: 1 })
    const uname = parseQuery(query, 'uname')
    const sex = parseQuery(query, 'sex')==''?null:parseQuery(query, 'sex')
    const [users, count] = await prisma.$transaction([
        prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
                AND: [
                    {
                        uname: {
                            contains: uname
                        }
                    },
                    {
                        sex: sex
                    }
                ]
            },
            include:{
                _count:{
                    select:{
                        Speak:true
                    }
                }
            }
        }),
        prisma.user.count({
            where: {
                AND: [
                    {
                        uname: {
                            contains: uname
                        }
                    },
                    {
                        sex: sex
                    }
                ]
            }
        })
    ])
    ctx.body = {
        code: 0,
        msg: "ok",
        count,
        data: users
    }

})

v1Router.get('/user/list/:roomId', async (ctx, next) => {
    let template = 'user-list'
    ctx.body = ejs.render(getTemplate(template, 'ejs'))
})

/**
 * 用户信息查询
 */
v1Router.get('/user/info/:uid', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
    const page = str2num(parseQuery(query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(query, 'limit'), 10, { min: 10 })
    let template = 'user-info'

    const user = await prisma.user.findUnique({
        where: {
            uid: params['uid']
        },
        include:{
            Speak:true,
            UserLog:true,
            UserCaptain:true,
            UserDanmu:true,
            _count:{
                select:{
                    Speak:true,
                    UserLog:true,
                    UserCaptain:true,
                    UserDanmu:true,
                }
            }
        }
    })
    if (!user) {
        return
    }

    ctx.body = ejs.render(getTemplate(template, 'ejs'), {
        user: user,
    })
})

v1Router.get('/user/info/:uid/:roomId', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
    const page = str2num(parseQuery(query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(query, 'limit'), 10, { min: 10 })
    let template = 'user-info'

    const user = await prisma.user.findUnique({
        where: {
            uid: params['uid']
        },
        include:{
            Speak:{
                where:{
                    roomId:params['roomId']
                }
            },
            UserLog:true,
            UserCaptain:{
                where:{
                    roomId:params['roomId']
                }
            },
            UserDanmu:{
                where:{
                    roomId:params['roomId']
                }
            },
            _count:{
                select:{
                    Speak:{
                        where:{
                            roomId:params['roomId']
                        }
                    },
                    UserLog:true,
                    UserCaptain:{
                        where:{
                            roomId:params['roomId']
                        }
                    },
                    UserDanmu:{
                        where:{
                            roomId:params['roomId']
                        }
                    },
                }
            }
        }
    })
    if (!user) {
        return
    }

})

function parseQuery(query: ParsedUrlQuery, key: string): string |undefined{
    const value = query[key]
    if (typeof value !== 'undefined') {
        if (Array.isArray(value)) {
            return value.join(',')
        } else {
            return value
        }
    } else {
        return void 0
    }
}
function str2num(str: string|undefined, defaultValue: number): number
function str2num(str: string|undefined, defaultValue: number, options?: {
    min?: number,
    max?: number
}): number
function str2num(str: string|undefined, defaultValue: number, options?: {
    min?: number,
    max?: number
}): number {

    let num = Number.parseInt(str+"")
    if (isNaN(num)) {
        return defaultValue
    }
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