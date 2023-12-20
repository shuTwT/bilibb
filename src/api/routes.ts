import path from "node:path";
import type{ default as Koa,Context,Next } from "koa";
import koaStatic from "koa-static";
import bodyParser from "koa-bodyparser"
import k2c from "koa2-connect"
import {createProxyMiddleware} from "http-proxy-middleware"
import koaLogger from "../middleware/koaLogger";
import v1Router from "./v1";

export default (app: Koa) => {
  app.use(async(ctx,next)=>{
    if(ctx.url.startsWith('/api/proxy/bfs/face')){
      ctx.respond=false
      await k2c(createProxyMiddleware({
        target:'https://i2.hdslb.com/bfs/face',
        changeOrigin:true,
        secure:false,
        pathRewrite:{
          '^/api/proxy/bfs/face':""
        }
      }))(ctx,next)
    }
    await next()
  })
  app.use(bodyParser());
  app.use(koaLogger())
  app.use(koaStatic(path.resolve(process.cwd(), "static")));
  app.use(koaStatic(path.resolve(process.cwd(), "public")));

  app.use(v1Router.routes());
  app.use(v1Router.allowedMethods());
};
