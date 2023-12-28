/**
 * 参考
 * https://github.com/simon300000/bilibili-live-ws
 * https://github.com/lovelyyoshino/Bilibili-Live-API/blob/master/API.WebSocket.md
 * https://github.com/Minteea/floating-live
 * https://github.com/SocialSisterYi/bilibili-API-collect
 */
import Koa from "koa";
import * as dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import routing from "./api/routes";
import { TCPServer } from "./service/connectService";
import { loadEnv } from "./env";
import * as log4js from "./utils/log4js"

dotenv.config();
await loadEnv()
const allowTCP = process.env.ALLOW_TCP == "true" ? true : false;
const port = Number.parseInt(process.env.PORT + "");

if (allowTCP) TCPServer();

const app = new Koa<Koa.DefaultState,Koa.Context>();

routing(app);

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
