import type { Context, DefaultState } from "koa";
import prisma from "../../../lib/prisma.js";
import ejs from "ejs";
import Router from "koa-router";
import { str2num, parseQuery, getTemplate } from "../../api/utils.js";

const viewRouter = new Router<DefaultState, Context>({
    prefix:"/view"
});

viewRouter.get('/analysis',async(ctx,next)=>{
    const template='admin/analysis'
    ctx.body = ejs.render(getTemplate(template, "ejs"));
})

viewRouter.get("/profile",async(ctx,next)=>{
    const template='admin/profile'
    ctx.body=ejs.render(getTemplate(template,'ejs'))
})


viewRouter.get("/room/my",async (ctx,next)=>{
    let template='my-live-info'
    let roomId=30743142
    const option=await prisma.options.findUnique({
        where:{
            optionName:"roomId"
        }
    })
    if(option){
        roomId=parseInt(option.optionValue)
    }
    ctx.body = ejs.render(getTemplate(template, "ejs"), {
        roomId
    });
})
viewRouter.get('/danmuji',async (ctx,next)=>{
    let template = 'danmuji'
    ctx.body = ejs.render(getTemplate(template,'ejs'))
})

viewRouter.get("/danmu/list/:roomId", async (ctx, next) => {
    let template = "user-list";
    const roomId=ctx.params['roomId']
    
    ctx.body = ejs.render(getTemplate(template, "ejs"), {
        roomId
    });
});

viewRouter.get('/user/info/:uid/:roomId', async (ctx, next) => {
    let template = "user-info-room";
    const uid=ctx.params['uid']
    const roomId=ctx.params['roomId']

    const user= await prisma.user.findUnique({
        where:{
            uid
        },
        include:{
            UserDanmu:{
                where:{
                    roomId
                }
            },
            UserEntry:{
                where:{
                    roomId
                }
            }
        }
    })
    if(!user) return
    ctx.body = ejs.render(getTemplate(template, "ejs"), {
        uid,
        roomId,
        user
    });
})

viewRouter.get('/analysis',async(ctx,next)=>{
    const template='analysis'

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
        ctx.body=ejs.render(getTemplate(template, "ejs"),{room});
        return
    }


    ctx.body = "请先去系统设置设置基本信息";
})

export {viewRouter}