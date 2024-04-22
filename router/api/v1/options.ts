import type { Context, DefaultState, Next } from "koa";
import * as log4js from "../../../utils/log4js.js"
import prisma from "../../../utils/prisma.js";
import Router from "koa-router";
import type { DefaultOptions } from "../../../env.js";

const optionRouter = new Router<DefaultState,Context>({prefix:'/options'})


const defaultOption = {
    "roomId":"",
    "uid":"",
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
        code:200,
        msg:"ok",
        data:options
    }
})

optionRouter.post('/save',async(ctx,next)=>{
    const body=ctx.request.body as DefaultOptions
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
            log4js.prismaError(e)
        }
    })
    ctx.body={
        code:200,
        msg:"ok",
    }
})

export {optionRouter}