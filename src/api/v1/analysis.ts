import Router from "koa-router"
import prisma from "../../lib/prisma"

const analysisRouter=new Router({
    prefix:"/analysis"
})

analysisRouter.get('/analysis',async(ctx,next)=>{
    const roomId=await prisma.options.findUnique({
        where:{
            optionName:"roomId"
        }
    })

    if(roomId&&roomId.optionValue!==""){
        const room=await prisma.room.findUnique({
            where:{
                roomId:roomId.optionValue
            },
            include:{
                Live:{
                    orderBy:{
                        date:'desc'
                    },
                    take:7
                },
                _count:{
                    select:{
                        UserDanmu:true
                    }
                }
            }
        })
        ctx.body={
            code:0,
            msg:"ok",
            data:room
        }
        return
    }

    ctx.body={
            code:-1,
            msg:"需要先设置roomId",
    }
})

export default analysisRouter