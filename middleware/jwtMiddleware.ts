import type { Context, Next } from "koa";
import jwt, { JwtPayload } from "jsonwebtoken";
import redis from "../utils/redis";
import { LoginUser } from "../core/model/LoginUser";
import log4js from "../utils/log4js";
import { SysUser } from "@prisma/client";

export default function (whiteList: string[] = [], callback?: () => void) {
  return async function (ctx: Context, next: Next) {
    for (const item of whiteList) {
      if (ctx.path == item) {
        await next();
        return;
      }
    }

    const token = ctx.request.header["authorization"];

    if (token) {
      try {
        const tokenItem = token.split("Bearer ")[1];
        const decodeToken = jwt.verify(tokenItem, "shhhh") as JwtPayload;
        const uuid = decodeToken.uuid;
        const userToken = await redis.get("login_tokens:" + uuid);
        //判断过期
        if (userToken) {
            try{
                const user = JSON.parse(userToken) as SysUser
                if(!ctx.getLoginUser){
                    const loginUser = new LoginUser(token,user,decodeToken.permission,decodeToken.userId,user.deptId)
                    ctx.getLoginUser=()=>{
                        return loginUser
                    }
                }
                await next();
            }catch(error){
                log4js.error(error)
            }
        } else {
          ctx.body = {
            code: 401,
            msg: "登录过期",
          };
        }
      } catch (err) {
        ctx.body = {
          code: 500,
          msg: String(err),
        };
      }
    } else {
      ctx.body = {
        code: 401,
        msg: "请先登录",
      };
    }

    // TODO https://juejin.cn/post/7054455089968185380
    //await next()
  };
}
