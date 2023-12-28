import Router from "koa-router"
import prisma from "../../lib/prisma"
import dayjs from "dayjs"
import { Captcha } from 'captcha.gif';

const authRouter=new Router({
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
    ctx.type='image/gif'
    ctx.body=captcha.generate().buffer
})

export default authRouter;