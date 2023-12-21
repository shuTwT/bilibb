import Router from "koa-router"
import prisma from "../../lib/prisma"
import { getTemplate, parseQuery, str2num } from "../utils"
import ejs from "ejs"

const userRouter=new Router({prefix:'/user'})

/**
 * 用户分页查询
 */
userRouter.get('/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
    const page = str2num(parseQuery(query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(query, 'limit'), 1, { min: 1 })
    const uname = parseQuery(query, 'uname')
    const gender = parseQuery(query, 'gender')==''?null:parseQuery(query, 'gender')
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
                        gender
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
                        gender
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

/**
 * 用户信息查询
 */
userRouter.get('/info/:uid', async (ctx, next) => {
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

userRouter.get('/info/:uid/:roomId', async (ctx, next) => {
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
    ctx.body = ejs.render(getTemplate(template, 'ejs'), {
        user: user,
    })
})

/**
 * 用户日志
 */
userRouter.get('/logs',async(ctx,next)=>{
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 10, { min: 10 })
    const logs=await prisma.userLog.findMany({
        skip: (page - 1) * limit,
        take: limit,
    })
    ctx.body={
        code:0,
        msg:'ok',
        data:logs
    }
})

userRouter.get('/logs/:uid',async(ctx,next)=>{
    const page = str2num(parseQuery(ctx.query, 'page'), 1, { min: 1 })
    const limit = str2num(parseQuery(ctx.query, 'limit'), 10, { min: 10 })
    const uid= ctx.params['uid']
    const logs=await prisma.userLog.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where:{
            uid
        }
    })
    ctx.body={
        code:0,
        msg:'ok',
        data:logs
    }
})


export default userRouter