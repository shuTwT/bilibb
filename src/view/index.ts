import Router from "koa-router";
import prisma from "../lib/prisma";
import ejs from "ejs";
import { str2num, parseQuery, getTemplate } from "../api/utils";
const viewRouter = new Router({
    prefix: "/view",
});

viewRouter.get("/room/my",async (ctx,next)=>{
    let template='my-live-info'
    const roomId=30743142
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

export default viewRouter;
