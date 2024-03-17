import type { DefaultState, Context } from "koa"
import Router from "koa-router"
import jwt from "jsonwebtoken"
import crypto from "node:crypto"
import { Captcha } from 'captcha.gif';
import prisma from "../../utils/prisma"

const loginRouter = new Router<DefaultState, Context>()


const captcha = new Captcha();
const md5 = crypto.createHash('md5')

type LoginBody = {
    username: string
    password: string
    captcha: string
}

loginRouter.post('/login', async (ctx, next) => {
    const body = ctx.request.body as LoginBody

    //检查验证码
    if (body.captcha !== ctx.session.captcha) {
        ctx.body = {
            code: -1,
            msg: "验证码错误"
        }
        return
    }
    let user = await prisma.sysUser.findFirst({
        where: {
            userName: body.username
        },
        select: {
            userId: true,
            userName: true
        }
    })
    if (user == null) {
        ctx.body = {
            code: -1,
            msg: "无此用户"
        }
        return
    }
    const md5password = md5.update(body.password).digest('hex')
    user = await prisma.sysUser.findFirst({
        where: {
            userName: body.username,
            password: md5password
        },
        select: {
            userId: true,
            userName: true
        }
    })
    if (user == null) {
        ctx.body = {
            code: -1,
            msg: "密码错误"
        }
        return
    }

    const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60)
    console.log(expiresIn)
    const token = jwt.sign({
        exp: expiresIn,
        data: 'foobar'
    }, 'shhhh')


    ctx.body = {
        code: 0,
        data: {
            token
        },
        msg: "ok",
    }
})

loginRouter.get('/captcha',async (ctx,next)=>{
    const {token,buffer}= captcha.generate()
    ctx.session.captcha=token.toLowerCase()
    ctx.log4js.info(JSON.stringify(ctx.session))
    ctx.type='image/gif'
    ctx.body=buffer
})

export { loginRouter }