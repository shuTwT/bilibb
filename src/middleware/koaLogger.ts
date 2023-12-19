import { Context, Next } from "koa";
import * as log4j from "../utils/log4js"

declare module "koa"{
    interface Context{
        log4j:{
            debug:(content:string)=>void,
            info:(content:string)=>void
            error:(content:string)=>void
        }
    }
}
export default  function(){
    return async function(ctx:Context,next:Next){
        const start=new Date().getTime();
        await next();
        const ms = new Date().getTime() - start;
        if(!ctx.log4j){
            ctx.log4j=log4j
        }
        log4j.info(`==>${ctx.path} use ${ms}ms.`)
    }
}