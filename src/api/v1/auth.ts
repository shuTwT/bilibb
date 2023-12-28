import type {DefaultState,Context} from "koa"
import Router from "koa-router"
import prisma from "../../lib/prisma"
import dayjs from "dayjs"
import { Captcha } from 'captcha.gif';

const authRouter=new Router<DefaultState,Context>({
    prefix:"/auth"
})

type LoginBody={
    username:string
    password:string
}

const captcha = new Captcha();

authRouter.post('/login', async (ctx,next)=>{
    const body=ctx.request.body as LoginBody
    console.log(body)

    if(body.username=='admin'&&body.password=='123456'){
        ctx.body={
            code:0,
            msg:"ok"
        }
    }else{
        ctx.body={
            code:-1,
            msg:"failed"
        }
    }
})

authRouter.get('/captcha',async (ctx,next)=>{
    const {token,buffer}= captcha.generate()
    ctx.session!.captcha=token.toLowerCase()
    ctx.log4js.info(JSON.stringify(ctx.session))
    ctx.type='image/gif'
    ctx.body=buffer
})

export default authRouter;