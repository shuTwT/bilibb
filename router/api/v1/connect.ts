import Router from "koa-router"
import prisma from "../../../utils/prisma.js"
import { closeConnect, connectPool } from "../../../service/connectService.js"
import { createConnect } from "../../../service/connectService.js"
import * as log4js from "../../../utils/log4js.js"
import type { Context, DefaultState } from "koa"
import { parseQuery, str2num } from "../utils.js"

const connectRouter=new Router<DefaultState,Context>({prefix:'/connect'})

connectRouter.get('/list', async (ctx, next) => {
    const pageNum = str2num(parseQuery(ctx.query, 'pageNum'), 1, { min: 1 })
    const pageSize = str2num(parseQuery(ctx.query, 'pageSize'), 10, { min: 1 })
    const roomIds=Array.from(connectPool.keys())
    const slicedRoomIds = roomIds.slice((pageNum-1)*pageSize,pageNum*pageSize)
    const rooms=await Promise.all(slicedRoomIds.map(async(item)=>{
        return await prisma.room.findUnique({
            where:{
                roomId:item+""
            }
        })
    }))

    ctx.body = {
        code: 200,
        msg: "ok",
        data:{
            list:rooms,
            total:roomIds.length,
            pageNum,
            pageSize
        }
    }
})

connectRouter.post('/add', async (ctx, next) => {
    const body= ctx.request.body as any
    const roomId = Number(body.roomId)
    if(isNaN(roomId)){
        ctx.body={
            code:500,
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
        code:200,
        msg:'ok'
    }
})

connectRouter.post('/remove/:roomId', async (ctx, next) => {
    const roomId=Number(ctx.params['roomId'])
    if(isNaN(roomId)){
        ctx.body={
            code:500,
            msg:"类型错误"
        }
        return
    }
    await closeConnect(roomId)
    ctx.body={
        code:200,
        msg:"ok"
    }
})

export {connectRouter}