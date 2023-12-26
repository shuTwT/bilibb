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

dotenv.config();
await loadEnv()
const allowTCP = process.env.ALLOW_TCP == "true" ? true : false;
const port = Number.parseInt(process.env.PORT + "");

if (allowTCP) TCPServer();

const app = new Koa();

routing(app);

const HTTPServer = createServer(app.callback());

const io = new Server(HTTPServer, {
  /** options */
});

io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} 用户已连接!`)
    socket.emit('msg',
        {
            type:"hello",
            msg:"Hello World"
        }
    )
    const num={value:0}
    const timer=setInterval(()=>{
        num.value++
        const rnd=Math.floor(Math.random()*2)
        if(rnd==1){
            socket.emit('msg',
            {
                type:"entry",
                user:{
                    avatar:"/avatar.webp",
                    username:`测试用户${num.value}`
                },
                msg:`欢迎测试用户${num.value}进入直播间`
                
            })
        }else {
            socket.emit('msg',
            {
                type:"danmu",
                user:{
                    avatar:"/avatar.webp",
                    username:`测试用户${num.value}`
                },
                msg:`测试消息${num.value}`
                
            })
        }
    },2000)
    socket.on('disconnect', () => {
        console.log('🔥: 一个用户已断开连接');
        clearInterval(timer)
    });
});
globalThis.io=io
HTTPServer.listen(port, () =>
  console.log(`started server on http://localhost:${port}`)
);
