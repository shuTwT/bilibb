import fs from "node:fs"
import Router from "koa-router"
import { connectPool } from "../../pool"
import prisma from "../../lib/prisma"
import { ParsedUrlQuery } from "querystring"
import path from "node:path"
import ejs from "ejs"

function getTemplate(name:string,ext:string='html'){
    const buffer=fs.readFileSync(path.resolve(process.cwd(),'template',`${name}.${ext}`))
    return buffer.toString()
}

const v1Router = new Router({
    prefix:'/api/v1'
})

v1Router.get('/connect/list', async (ctx, next) => {
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
v1Router.get('/room/list',async(ctx,next)=>{
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 1, { min: 1 })
    const [rooms,count]=await prisma.$transaction([
        prisma.room.findMany({
            skip: (page - 1)*limit,
            take: limit,
        }),
        prisma.room.count()
    ])
    ctx.body={
        code:0,
        msg:"ok",
        count,
        data:rooms
    }
})

/**
 * 进房量分页查询
 */
v1Router.get('/entry/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
})

/**
 * 弹幕分页查询
 */
v1Router.get('/danmu/list', async (ctx, next) => {
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 1, { min: 1 })
    const [speaks,count]=await prisma.$transaction([
        prisma.speak.findMany({
            skip: (page - 1)*limit,
            take: limit,
        }),
        prisma.speak.count()
    ])
    ctx.body={
        code:0,
        msg:"ok",
        count,
        data:speaks
    }
})
/**
 * 某个直播间的弹幕
 */
v1Router.get('/danmu/list/:roomId', async (ctx, next) => {
    const roomId=ctx.params['roomId']
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 1, { min: 1 })
    const [speaks,count]=await prisma.$transaction([
        prisma.speak.findMany({
            skip: (page - 1)*limit,
            take: limit,
            where:{
                roomId
            }
        }),
        prisma.speak.count({
            where:{
                roomId
            }
        })
    ])
    ctx.body={
        code:0,
        msg:"ok",
        count,
        data:speaks
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
    const uname= parseQuery(query,'uname')
    const [users, count] = await prisma.$transaction([
        prisma.user.findMany({
            skip: (page - 1)*limit,
            take: limit,
            where:{
                uname:{
                    contains:uname
                }
            }
        }),
        prisma.user.count({
            where:{
                uname:{
                    contains:uname
                }
            }
        })
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
v1Router.get('/user/info/:uid', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
    const page = str2num(parseQuery(query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(query, 'limit'), 10, { min: 10 })
    let template='user-info'

    const user=await prisma.user.findUnique({
        where:{
            uid:params['uid']
        },
    })
    if(!user){
        return
    }
    const [speaks,speakCount] = await prisma.$transaction([
        prisma.speak.findMany({
            where:{
                uid:params['uid']
            },
            skip: (page - 1)*limit,
            take: limit,
        }),
        prisma.speak.count()
    ])
    const [userLogs,userLogsCount] = await prisma.$transaction([
        prisma.userLog.findMany({
            where:{
                uid:params['uid']
            },
            skip: (page - 1)*limit,
            take: limit,
        }),
        prisma.userLog.count()
    ])
    
    ctx.body=ejs.render(getTemplate(template,'ejs'),{
        user:user,
        speak:{
            count:speakCount,
            data:speaks
        },
        logs:{
            count:userLogsCount,
            data:userLogs
        },
    })
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
        return ''
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
    
    let num = Number.parseInt(str)
    if(isNaN(num)){
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