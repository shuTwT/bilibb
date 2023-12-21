import { Context, Next } from "koa";
import * as log4js from "../../utils/log4js"
import prisma from "../../lib/prisma";
import Router from "koa-router";

const optionRouter=new Router({prefix:'/options'})

const defaultOption = {
     "cookie": "" ,
     "buvid3":"",
     "uid":"",
     "sessData":"",
     "bili_ticket":"",
     "bili_ticket_expires":"",
     "DedeUserID":"",
     "bili_jct":"",
     "installed":"true"
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

export default optionRouter