import { Context, Next } from "koa";
import * as log4js from "../../utils/log4js"
import prisma from "../../lib/prisma";
import Router from "koa-router";

const optionRouter=new Router({prefix:'/options'})

type DefaultOption = {
    "roomId":string
    "uid":string
    "cookies":string
    "buvid":string
    "sessData":string
    "bili_ticket":string
    "bili_ticket_expires":string
    "DedeUserID":string
    "bili_jct":string
    "installed":string
    "host":string
    [key:string]:string
}
const defaultOption = {
    "roomId":"",
    "uid":"",
    "cookies": "" ,
    "buvid":"",
    "sessData":"",
    "bili_ticket":"",
    "bili_ticket_expires":"",
    "DedeUserID":"",
    "bili_jct":"",
    "installed":"true",
    "host":""
}
export async function initializeOptions(ctx:Context,next:Next) {
    try{
        Object.keys(defaultOption).forEach((item)=>{
            prisma.options.upsert({
                where:{
                    optionName:item
                },
                update:{},
                create:{
                    optionName:item,
                    optionValue:""
                }
            })
        })
    }catch(e){
        log4js.prismaError(e)
    }
}

optionRouter.get('/all',async(ctx,next)=>{
    const options=await prisma.options.findMany()
    ctx.body={
        code:0,
        msg:"ok",
        data:options
    }
})

optionRouter.post('/save',async(ctx,next)=>{
    const body=ctx.request.body as DefaultOption
    Object.keys(body).forEach(async(item)=>{
        const value=body[item]
        try{
            await prisma.options.upsert({
                where:{
                    optionName:item
                },
                update:{
                    optionValue:value
                },
                create:{
                    optionName:item,
                    optionValue:value
                }
            })
        }catch(e){
            console.log(e)
        }
    })
    ctx.body={
        code:0,
        msg:"ok",
    }
})

export default optionRouter