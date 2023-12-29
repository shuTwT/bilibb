import type { Context, Next } from "koa";
import jwt from "jsonwebtoken"
import ejs from "ejs";
import { str2num, parseQuery, getTemplate } from "../router/api/utils.js";

const template=ejs.compile(getTemplate('admin/exception/404'))
export default function(whiteList:string[]=[],callback?:()=>void){
    return async function(ctx:Context,next:Next){
        
        for (const item of whiteList) {
            if(ctx.path ==item){
                await next()
                return
            }
        }
        console.log(ctx.path)
        const token=ctx.cookies.get('pear_ticket')
        
        if(!token){
            if(ctx.method=='GET'){
                ctx.body=template()
                return
            }else {
                ctx.throw(401,"请先登录")
            }
            
        }

        const decode=jwt.verify(token,'shhhh')
        if(!decode){
            if(ctx.method=='GET'){
                ctx.body=template()
                return
            }else {
                ctx.throw(401,"登录过期")
            }
            
        }
        
        // TODO https://juejin.cn/post/7054455089968185380
        await next()
    }
}