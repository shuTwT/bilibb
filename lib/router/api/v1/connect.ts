import Router from "koa-router"
import prisma from "../../../utils/prisma.js"
import { closeConnect, connectPool } from "../../../service/connectService.js"
import { createConnect } from "../../../service/connectService.js"
import * as log4js from "../../../utils/log4js.js"
import type { Context, DefaultState } from "koa"

const connectRouter=new Router<DefaultState,Context>({prefix:'/connect'})

connectRouter.get('/list', async (ctx, next) => {
    const params = ctx.params
    const query = ctx.query
    const headers = ctx.headers
    const body = ctx.request.body
    const roomIds=Array.from(connectPool.keys())
    
    const rooms=await Promise.all(roomIds.map(async(item)=>{
        return await prisma.room.findUnique({
            where:{
                roomId:item+""
            }
        })
    }))

    ctx.body = {
        code: 0,
        msg: "ok",
        data: rooms
    }
})

connectRouter.post('/add', async (ctx, next) => {
    const body= ctx.request.body as any
    const roomId = parseInt(body.roomId)
    if(isNaN(roomId)){
        ctx.body={
            code:-1,
            msg:"类型错误"
        }
        return
    }
    try{
        await createConnect(roomId)
    }catch(e){
        log4js.error(e)
    }
    
    ctx.body={
        code:0,
        msg:'ok'
    }
})

connectRouter.post('/remove/:roomId', async (ctx, next) => {
    const roomId=parseInt(ctx.params['roomId'])
    if(isNaN(roomId)){
        ctx.body={
            code:-1,
            msg:"类型错误"
        }
        return
    }
    await closeConnect(roomId)
    ctx.body={
        code:0,
        msg:"ok"
    }
})

export {connectRouter}