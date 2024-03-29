import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import jwt, { JwtPayload } from "jsonwebtoken";
import crypto from "node:crypto";
import { Captcha } from "captcha.gif";
import prisma from "../../utils/prisma";
import dayjs from "dayjs";
import redis from "../../utils/redis";

const loginRouter = new Router<DefaultState, Context>();

const captcha = new Captcha();

type LoginBody = {
    username: string;
    password: string;
    uuid:string
};

loginRouter.post("/login", async (ctx, next) => {
    const md5 = crypto.createHash("md5");
    const body = ctx.request.body as LoginBody;
    const uuid = body.uuid
    const ip = ctx.request.ip

    let user = await prisma.sysUser.findFirst({
        where: {
            userName: body.username,
        },
        select: {
            userId: true,
            userName: true,
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
        },
    });
    if (user == null) {
        ctx.body = {
            code: -1,
            msg: "密码错误",
        };
        return;
    }

    const expires = dayjs().add(10,'h');
    const accessToken = jwt.sign(
        {
            data: "foobar",
            userId: user.userId,
            username: user.userName,
            uuid:uuid,
            ip:ip,
            address:"局域网",
            system:"未知的",
            browser:"未知的",
            loginTime:new Date()
        },
        "shhhh",
        {
            expiresIn:"10h"
        }
    );

    redis.setex("login_tokens:"+uuid,60*60*10,accessToken)
    const refreshToken = jwt.sign(
        {
            data: "foobar",
            userId: user.userId,
            username: user.userName,
            uuid:uuid
        },
        "shhhh",
        {
            expiresIn:"10h"
        }
    );

    ctx.body = {
        code: 0,
        success:true,
        data: {
            username: user.userName,
            // roles: user.roles,
            roles:["admin"],
            accessToken: accessToken,
            refreshToken: refreshToken,
            expires:expires
        },
        msg: "ok",
    };
});

loginRouter.get("/captcha", async (ctx, next) => {
    const { token, buffer } = captcha.generate();
    const uuid = ctx.cookies.get("_uuid")
    ctx.session![`${uuid}_captcha`] = token.toLowerCase();
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
        const expires = dayjs().add(10,'h');
        const accessToken = jwt.sign(
            {
                data: "foobar",
                userId: decodeToken.userId,
                username: decodeToken.userName,
                roles: decodeToken.roles,
                uuid:decodeToken.uuid
            },
            "shhhh",
            {
                expiresIn:"10h"
            }
        );
        const refreshToken = jwt.sign(
            {
                data: "foobar",
                userId: decodeToken.userId,
                username: decodeToken.userName,
                roles: decodeToken.roles,
                uuid:decodeToken.uuid
            },
            "shhhh",
            {
                expiresIn:"10h"
            }
        );
        ctx.body = {
            code: 0,
            data: {
                username: decodeToken.userName,
                // roles: decodeToken.roles,
                roles:["admin"],
                accessToken: accessToken,
                refreshToken: refreshToken,
                expires:expires
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
   ctx.session =null
   const token = ctx.request.header["authorization"];
   const tokenItem = token!.split("Bearer ")[1];
   const decode = jwt.verify(tokenItem, "shhhh") as JwtPayload;
   const uuid = decode.uuid;
   try{
    await redis.del("login_tokens:"+uuid)
    ctx.body={
        code:200,
        msg:"登出成功"
    }
   }catch(err){
    ctx.status=500
    ctx.body={
        code:500,
        msg:String(err)
    }
   }
   
})


export { loginRouter };
