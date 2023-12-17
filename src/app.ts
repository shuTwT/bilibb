/**
 * 参考
 * https://github.com/simon300000/bilibili-live-ws
 * https://github.com/lovelyyoshino/Bilibili-Live-API/blob/master/API.WebSocket.md
 * https://github.com/Minteea/floating-live
 */
import * as dotenv from "dotenv";
import { getDanmuConf, getRoomid } from "./utils";
import { LiveTCP } from "bilibili-live-ws";
import {resolver} from "./resolver";
import type { Msg } from "./resolver";

dotenv.config();
const roomId = Number.parseInt(process.env.ROOM_ID + "");

const uid = Number.parseInt(process.env.UID + "");
const buvid = process.env.BUVID + "";
const cookie = process.env.COOKIE + "";



async function TCPServer() {
  const { room_id } = await getRoomid(roomId, cookie)
  const conf= await getDanmuConf(room_id, cookie)
  const live = new LiveTCP(room_id, {
    uid: uid,
    key: conf.key,
    buvid: buvid,
  });
  live.on("open", (data) => {
    console.log("Connection is established");
  });
  live.on("live", () => {
    live.on("heartbeat", (online) => {
      //console.log('人气值:' + online)
    });
  });
  live.on("msg", (data: Msg) => {
    if (data.cmd in resolver) {
      resolver[data.cmd](data);
    } else {
      console.log(data);
    }

  });
  live.on("error", (e) => {
    console.log(e);
  });
  return live
}

async function HTTPServer(){

}
async function bootstrap() {

  const liveTcp = (globalThis as unknown as {
    liveTcp: LiveTCP | undefined
  }).liveTcp ?? await TCPServer()

  if(process.env.NODE_ENV !== 'production') (globalThis as unknown as {
    liveTcp: LiveTCP | undefined
  }).liveTcp=liveTcp;
}

bootstrap()