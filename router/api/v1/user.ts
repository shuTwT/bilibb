import Router from "koa-router"
import prisma from "../../../utils/prisma.js"
import { parseQuery, str2num } from "../utils.js"
import type { Context, DefaultState } from "koa"

const userRouter=new Router<DefaultState,Context>({prefix:'/user'})

/**
 * 用户分页查询
 */
userRouter.get('/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const pageNum = str2num(parseQuery(query, 'pageNum'), 1, { min: 1 })
    const pageSize = str2num(parseQuery(query, 'pageSize'), 1, { min: 1 })
    const uname = parseQuery(query, 'uname')
    const gender = parseQuery(query, 'gender')==''?null:parseQuery(query, 'gender')
    const isFilterZero = parseQuery(query, 'isFilterZero')==='1'? true:false
    const [users, count] = await prisma.$transaction([
        prisma.user.findMany({
            skip: (pageNum - 1) * pageSize,
            take: pageSize,
            where: {
                AND: [
                    {
                        uname: {
                            contains: uname
                        }
                    },
                    {
                        gender
                    },
                    {
                        speakNum:{
                            gt:isFilterZero?0:void 0
                        }
                    }
                ]
            },
            orderBy:{
                id:'desc'
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
        code: 200,
        msg: "ok",
        data:{
            list:users,
            total:count,
            pageNum,
            pageSize
        }
    }

})

/**
 * 用户信息查询
 */
userRouter.get('/info/:uid', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const pageNum = str2num(parseQuery(query, 'pageNum'), 1, { min: 1 })
    const pageSize = str2num(parseQuery(query, 'pageSize'), 10, { min: 10 })

    const user = await prisma.user.findUnique({
        where: {
            uid: params['uid']
        },
        include:{
            Speak:{
                orderBy:{
                    date:'desc'
                }
            },
            UserLog:{
                orderBy:{
                    date:'desc'
                }
            },
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

    ctx.body = {
        code:200,
        msg:"ok"
    }
})

userRouter.get('/info/:uid/:roomId', async (ctx, next) => {
    const params = ctx.params
    const pageNum = str2num(parseQuery(ctx.query, 'pageNum'), 1, { min: 1 })
    const pageSize = str2num(parseQuery(ctx.query, 'pageSize'), 10, { min: 10 })
    let template = 'user-info'

    const user = await prisma.user.findUnique({
        where: {
            uid: params['uid']
        },
        include:{
            Speak:{
                where:{
                    roomId:params['roomId']
                },
                orderBy:{
                    date:'desc'
                }
            },
            UserLog:{
                orderBy:{
                    date:'desc'
                }
            },
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
            UserEntry:{
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
    ctx.body = {
        code:200,
        msg:"success",
        data:user
    }
})

/**
 * 用户日志
 */
userRouter.get('/logs',async(ctx,next)=>{
    const pageNum = str2num(parseQuery(ctx.query, 'pageNum'), 1, { min: 1 })
    const pageSize = str2num(parseQuery(ctx.query, 'pageSize'), 10, { min: 10 })
    const roomId = parseQuery(ctx.query,'roomId')
    const [list,count]=await prisma.$transaction([prisma.userLog.findMany({
        where:{
            roomId
        },
        include:{
            User:true
        },
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        orderBy:{
            date:'desc'
        }
    }),prisma.userLog.count({
        where:{
            roomId
        }
    })])
    ctx.body={
        code:200,
        msg:'ok',
        data:{
            list,
            pageNum,
            pageSize,
            total:count,
        }
    }
})

userRouter.get('/logs/:uid',async(ctx,next)=>{
    const pageNum = str2num(parseQuery(ctx.query, 'pageNum'), 1, { min: 1 })
    const pageSize = str2num(parseQuery(ctx.query, 'pageSize'), 10, { min: 10 })
    const uid= ctx.params['uid']
    const [list,count]=await prisma.$transaction([prisma.userLog.findMany({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        orderBy:{
            date:"desc"
        },
        where:{
            uid
        }
    }),prisma.userLog.count({
        where:{
            uid
        }
    })])
    ctx.body={
        code:200,
        msg:'ok',
        data:{
            list,
            pageNum,
            pageSize,
            total:count,
        }
    }
})


export {userRouter}