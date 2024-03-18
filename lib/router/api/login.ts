import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import jwt, { JwtPayload } from "jsonwebtoken";
import crypto from "node:crypto";
import { Captcha } from "captcha.gif";
import prisma from "../../utils/prisma";
import dayjs from "dayjs";

const loginRouter = new Router<DefaultState, Context>();

const captcha = new Captcha();

type LoginBody = {
    username: string;
    password: string;
    captcha: string;
};

loginRouter.post("/login", async (ctx, next) => {
    const md5 = crypto.createHash("md5");
    const body = ctx.request.body as LoginBody;

    //检查验证码
    if (body.captcha !== ctx.session.captcha) {
        ctx.body = {
            code: -1,
            msg: "验证码错误",
        };
        return;
    }
    let user = await prisma.sysUser.findFirst({
        where: {
            userName: body.username,
        },
        select: {
            userId: true,
            userName: true,
            roles: true,
        },
    });
    if (user == null) {
        ctx.body = {
            code: -1,
            msg: "无此用户",
        };
        return;
    }
    const md5password = md5.update(body.password).digest("hex");
    user = await prisma.sysUser.findFirst({
        where: {
            userName: body.username,
            password: md5password,
        },
        select: {
            userId: true,
            userName: true,
            roles: true,
        },
    });
    if (user == null) {
        ctx.body = {
            code: -1,
            msg: "密码错误",
        };
        return;
    }

    const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60;
    console.log(expiresIn);
    const accessToken = jwt.sign(
        {
            exp: expiresIn,
            data: "foobar",
            userId: user.userId,
            username: user.userName,
            roles: user.roles,
        },
        "shhhh"
    );

    const refreshToken = jwt.sign(
        {
            exp: expiresIn,
            data: "foobar",
            userId: user.userId,
            username: user.userName,
            roles: user.roles,
        },
        "shhhh"
    );

    ctx.cookies.set('pear_ticket',accessToken)
    ctx.body = {
        code: 0,
        data: {
            username: user.userName,
            roles: user.roles,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expires:dayjs(expiresIn).format('YYYY/MM/DD HH:mm:ss')
        },
        msg: "ok",
    };
});

loginRouter.get("/captcha", async (ctx, next) => {
    const { token, buffer } = captcha.generate();
    ctx.session.captcha = token.toLowerCase();
    ctx.log4js.info(JSON.stringify(ctx.session));
    ctx.type = "image/gif";
    ctx.body = buffer;
});

type RefreshTokenBody = {
    refreshToken: string;
};
loginRouter.post("refresh-token", async (ctx, next) => {
    const body = ctx.request.body as RefreshTokenBody;
    if (body.refreshToken == null) {
        ctx.body = {
            code: -1,
            msg: "refreshToken不能为空",
        };
        return;
    }
    let decodeToken;
    try {
        decodeToken = jwt.verify(body.refreshToken, "shhhh") as JwtPayload;
    } catch {
        ctx.body = {
            code: -1,
            msg: "refreshToken错误",
        };
        return;
    }
    if (decodeToken.userId && decodeToken.username&&decodeToken.roles) {
        const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60;
        const accessToken = jwt.sign(
            {
                exp: expiresIn,
                data: "foobar",
                userId: decodeToken.userId,
                username: decodeToken.userName,
                roles: decodeToken.roles,
            },
            "shhhh"
        );
        const refreshToken = jwt.sign(
            {
                exp: expiresIn,
                data: "foobar",
                userId: decodeToken.userId,
                username: decodeToken.userName,
                roles: decodeToken.roles,
            },
            "shhhh"
        );
        ctx.cookies.set('pear_ticket',accessToken)
        ctx.body = {
            code: 0,
            data: {
                username: decodeToken.userName,
                roles: decodeToken.roles,
                accessToken: accessToken,
                refreshToken: refreshToken,
                expires:dayjs(expiresIn).format('YYYY/MM/DD HH:mm:ss')
            },
            msg: "ok",
        };
        return
    }else{
        ctx.body={
            code:-1,
            msg:'refreshToken错误'
        }
        return
    }
});

loginRouter.post('/logout',async(ctx,next)=>{
    ctx.cookies.set('pear_ticket','')
})


export { loginRouter };
