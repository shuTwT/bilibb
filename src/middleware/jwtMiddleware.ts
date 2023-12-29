import type { Context, Next } from "koa";
import jwt from "jsonwebtoken"

export default function(whiteList:string[]=[]){
    return async function(ctx:Context,next:Next){
        
        // for (const item of whiteList) {
        //     if(ctx.path ==item){
        //         await next()
        //         break
        //     }
        // }
        // console.log(ctx.path)
        // const token=ctx.cookies.get('pear_ticket')
        // if(!token){
        //     ctx.throw(401,"请先登录")
        // }

        // const decode=jwt.verify(token,'shhhh')
        // if(!decode){
        //     ctx.throw(401,"登录过期")
        // }
        
        // TODO https://juejin.cn/post/7054455089968185380
        await next()
    }
}