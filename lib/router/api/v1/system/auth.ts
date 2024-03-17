import type {DefaultState,Context} from "koa"
import Router from "koa-router"
import dayjs from "dayjs"
import jwt from "jsonwebtoken"
import prisma from "../../../../utils/prisma.js"
import { Captcha } from 'captcha.gif';
import crypto from "node:crypto"

const md5 = crypto.createHash('md5')

const authRouter=new Router<DefaultState,Context>({
    prefix:"/auth"
})

type LoginBody={
    username:string
    password:string
    captcha:string
}

const captcha = new Captcha();

authRouter.post('/login', async (ctx,next)=>{
    const body=ctx.request.body as LoginBody
    console.log(body)
    console.log(ctx.session.captcha)
    //检查验证码
    if(body.captcha!==ctx.session.captcha){
        ctx.body={
            code:-1,
            msg:"验证码错误"
        }
        return
    }
    if(body.username!=='admin'){
        ctx.body={
            code:-1,
            msg:"无此用户"
        }
        return
    }
    const md5password = md5.update(body.password).digest('hex')
    if(body.password!=='123456'){
        ctx.body={
            code:-1,
            msg:"密码错误"
        }
        return 
    }

    const expiresIn= Math.floor(Date.now() / 1000) + (60 * 60)
    console.log(expiresIn)
    const token=jwt.sign({
        exp:expiresIn,
        data: 'foobar'
    },'shhhh')
    

    ctx.cookies.set('pear_ticket',token)
    
    ctx.body={
        code:0,
        msg:"ok",
    }

})

authRouter.get('/captcha',async (ctx,next)=>{
    const {token,buffer}= captcha.generate()
    ctx.session.captcha=token.toLowerCase()
    ctx.log4js.info(JSON.stringify(ctx.session))
    ctx.type='image/gif'
    ctx.body=buffer
})

authRouter.post('/logout',async(ctx,next)=>{
    ctx.cookies.set('pear_ticket','')
})

export  {authRouter};