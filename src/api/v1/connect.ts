import Router from "koa-router"
import prisma from "../../lib/prisma"
import { connectPool } from "../../service/connectService"

const connectRouter=new Router({prefix:'/connect'})

connectRouter.get('/list', async (ctx, next) => {
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

connectRouter.post('/add', async (ctx, next) => {
    const body = ctx.request.body
})

export default connectRouter