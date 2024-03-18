import type { Context, Next } from "koa";
import jwt from "jsonwebtoken"
import ejs from "ejs";
import { str2num, parseQuery, getTemplate } from "../router/api/utils.js";


export default function(whiteList:string[]=[],callback?:()=>void){
    return async function(ctx:Context,next:Next){
        
        for (const item of whiteList) {
            if(ctx.path ==item){
                await next()
                return
            }
        }
        ctx.log4js.debug(ctx.path)
        
        const token=ctx.cookies.get('pear_ticket')
        
        if(!token){
            if(ctx.method=='GET'){
                if(ctx.path=='/admin'||ctx.path=='/dap'){
                    ctx.redirect('/login')
                }else{
                    ctx.body = await getTemplate('admin/exception/404')
                }
                return
            }else {
                ctx.throw(401,"请先登录")
            }
            
        }

       
        try{
           const decode=jwt.verify(token,'shhhh')
        }catch(e){
            ctx.log4js.error(e)
            if(ctx.method=='GET'){
                if(ctx.path=='/admin'||ctx.path=='/dap'){
                    ctx.redirect('/login')
                }else{
                    ctx.body = await getTemplate('admin/exception/404')
                }
                return
            }else {
                ctx.throw(401,"登录过期")
            }
        }
        
        
        // TODO https://juejin.cn/post/7054455089968185380
        await next()
    }
}