/**
 * 参考
 * https://github.com/simon300000/bilibili-live-ws
 * https://github.com/lovelyyoshino/Bilibili-Live-API/blob/master/API.WebSocket.md
 * https://github.com/Minteea/floating-live
 * https://github.com/SocialSisterYi/bilibili-API-collect
 */
import Koa from "koa";
import * as dotenv from "dotenv";
import path from "node:path";
// import koaStatic from "./middleware/staticMiddleware.js";
import bodyParser from "koa-bodyparser";
import session from "koa-session";
import koaLogger from "./middleware/koaLogger.js";
import cookiesMiddleware from "./middleware/cookiesMiddleware.js";

import { createServer } from "node:http";
const { createRoutes } = await import( "./router/routes.js");
const { TCPServer } =await import("./service/connectService.js");
import { loadEnv } from "./env.js";
import * as log4js from "./utils/log4js.js"
import viewMiddleware from "./middleware/viewMiddleware.js";
import RedisSessionStore from "./utils/redisSessionStore.js";
import redis from "./utils/redis.js";
import jwtMiddleware from "./middleware/jwtMiddleware.js";


dotenv.config();

await loadEnv()

const allowTCP = process.env.ALLOW_TCP == "true" ? true : false;
const port = Number.parseInt(process.env.APP_PORT ||'3000');

if (allowTCP) TCPServer();

const app = new Koa<Koa.DefaultState,Koa.Context>();

app.keys = ["signedKey"];
app.use(async(ctx,next)=>{
    ctx.state.adminPath='/'
    await next()
})
app.use(bodyParser());
app.use(koaLogger());
app.use(session({
    store:new RedisSessionStore(redis)
},app));
app.use(cookiesMiddleware());
app.use(jwtMiddleware([
    "/api/login",
    "/api/swagger/index.html",
    "/api/swagger/api-docs",
  ])
)
// app.use(koaStatic(path.resolve(process.cwd(), "static")));
// app.use(koaStatic(path.resolve(process.cwd(), "public")));
app.use(viewMiddleware(path.resolve(process.cwd(),'template')))
createRoutes(app)

const HTTPServer = createServer(app.callback());

HTTPServer.listen(port, () =>{
  log4js.info(`NODE_ENV ${process.env.NODE_ENV}`)
  log4js.info(`started server on http://localhost:${port}`)
});
