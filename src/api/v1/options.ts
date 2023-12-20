import { Context, Next } from "koa";
import * as log4js from "../../utils/log4js"
import prisma from "../../lib/prisma";

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