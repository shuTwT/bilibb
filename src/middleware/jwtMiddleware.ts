import type { Context, Next } from "koa";
import jwt from "jsonwebtoken"

const whiteList=["/login"]

export default function(){
    return async function(ctx:Context,next:Next){
        console.log(ctx.path)
        if(ctx.path in whiteList){
            await next()
            return
        }
        // const token=ctx.cookies.get('pear_ticket')
        // if(!token){
        //     ctx.throw(401,"请先登录")
        // }

        // const decode=jwt.verify(token,'shhhh')
        // TODO https://juejin.cn/post/7054455089968185380
        await next()
    }
}