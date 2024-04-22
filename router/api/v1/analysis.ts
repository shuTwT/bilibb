import Router from "koa-router"
import prisma from "../../../utils/prisma.js"
import dayjs from "dayjs"
import type { Context, DefaultState } from "koa"

const analysisRouter=new Router<DefaultState,Context>({
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
                        UserDanmu:true,
                        UserGift:true
                    }
                },
               
            }
        })
        let lives = await prisma.live.groupBy({
            by:['roomId','date','entryNum','likeNum','speakNum','followNum','unfollowNum'],
            where:{
                roomId:roomId.optionValue
            },
            orderBy:{
                date:'desc'
            },
            take:7,
        })
        if(lives.length<7&&lives.length>0){
            const start=lives.length-1
            for (let i = start; i < 6; i++) {
                const elem={
                    date:dayjs(lives[i].date).subtract(1,'day').format("YYYY-MM-DD"),
                    entryNum:0,
                    likeNum:0,
                    roomId:lives[i].roomId,
                    speakNum:0,
                    followNum:0,
                    unfollowNum:0
                }
                lives.unshift(elem)
            }
        }
        const _sum={
            entryNum:0,
            speakNum:0,
            likeNum:0,
            followNum:0,
            unfollowNum:0
        }
        lives.forEach(value=>{
            _sum.entryNum+=value.entryNum
            _sum.speakNum+=value.speakNum
            _sum.likeNum+=value.likeNum
            _sum.followNum+=value.followNum
            _sum.unfollowNum+=value.unfollowNum
        })
        ctx.body={
            code:200,
            msg:"ok",
            data:{
                room,
                lives,
                analysis:_sum
            }
        }
        return
    }

    ctx.body={
            code:500,
            msg:"需要先设置roomId",
    }
})

export {analysisRouter}