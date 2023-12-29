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
import koaStatic from "./middleware/staticMiddleware.js";
import bodyParser from "koa-bodyparser";
import session from "koa-session";
import koaLogger from "./middleware/koaLogger.js";
import cookiesMiddleware from "./middleware/cookiesMiddleware.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
const { routes } = await import( "./router/routes.js");
const { TCPServer } =await import("./service/connectService.js");
import { loadEnv } from "./env.js";
import * as log4js from "./utils/log4js.js"
import jwtMiddleware from "./middleware/jwtMiddleware.js";

dotenv.config();

await loadEnv()

const allowTCP = process.env.ALLOW_TCP == "true" ? true : false;
const port = Number.parseInt(process.env.PORT ||'3000');

if (allowTCP) TCPServer();

const app = new Koa<Koa.DefaultState,Koa.Context>();

app.keys = ["signedKey"];
app.use(bodyParser());
app.use(koaLogger());
app.use(session(app));
app.use(cookiesMiddleware());
app.use(koaStatic(path.resolve(process.cwd(), "static")));
app.use(koaStatic(path.resolve(process.cwd(), "public")));
routes(app)

const HTTPServer = createServer(app.callback());

// const io = new Server(HTTPServer, {
//   /** options */
// });

// io.on("connection", (socket) => {
//     log4js.info(`⚡: ${socket.id} 用户已连接!`)
//     socket.emit('msg',
//         {
//             type:"hello",
//             msg:"Hello World"
//         }
//     )
//     socket.on('disconnect', () => {
//         log4js.info('🔥: 一个用户已断开连接');
        
//     });
// });
// globalThis.io=io
HTTPServer.listen(port, () =>
  log4js.info(`started server on http://localhost:${port}`)
);
