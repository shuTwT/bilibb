/**
 * 参考
 * https://github.com/simon300000/bilibili-live-ws
 * https://github.com/lovelyyoshino/Bilibili-Live-API/blob/master/API.WebSocket.md
 * https://github.com/Minteea/floating-live
 * https://github.com/SocialSisterYi/bilibili-API-collect
 */
import "reflect-metadata"
import Koa from "koa";
import routing from "./api/routes"
import * as dotenv from "dotenv";
import { getDanmuConf, getRoomid, getRoomInfo } from "./utils";
import { LiveTCP } from "bilibili-live-ws";
import { resolver } from "./resolver";
import type { Msg } from "./resolver";
import { RoomService } from "./service/RoomService";
import { Application } from "./decorator";
import { TYPES } from "./type";
import { myContainer } from "./inversify.config";
import { IRoomService } from "./interface";
import { connectPool } from "./pool";

dotenv.config();
const short_room_id = Number.parseInt(process.env.ROOM_ID + "");
const uid = Number.parseInt(process.env.UID + "");
const buvid = process.env.BUVID + "";
const cookie = process.env.COOKIE + "";
const allowHTTP=process.env.ALLOW_HTTP=="true"?true:false;
const allowTCP=process.env.ALLOW_TCP=="true"?true:false;
const port=Number.parseInt(process.env.PORT+"");

@Application()
class App {
  private roomService: RoomService
  constructor() {
    this.roomService = myContainer.get<IRoomService>(TYPES.RoomService)
    this.bootstrap()
  }
  async bootstrap() {
    if(allowTCP) await this.TCPServer()
    await this.HTTPServer()
  }
  async TCPServer() {
    const { room_id } = await getRoomid(short_room_id, cookie)
    if(connectPool.has(room_id)){
        console.log("该房间已在连接池中")
        return
    }
    getRoomInfo(room_id, cookie).then(({
      description,
      parent_area_name,
      title,
      user_cover,
      keyframe,
      tags,
      area_name,
      room_owner_uid
    }) => {
      if(description.length>150) description=(description as string).slice(0,150)
      this.roomService.exsitRoom(room_id+"").then((res:boolean)=>{
        if(!res){
          // 直播间不存在，创建
          this.roomService.createRoom(room_id+"",room_owner_uid+"",{
            description,
            parentAreaName:parent_area_name,
            title,
            userCover:user_cover,
            keyframe,
            tags,
            areaName:area_name,
          })
        }else{
          this.roomService.updateRoom(room_id+"",room_owner_uid+"",{
            description,
            parentAreaName:parent_area_name,
            title,
            userCover:user_cover,
            keyframe,
            tags,
            areaName:area_name,
          })
        }

      })
    })
    
    const conf = await getDanmuConf(room_id, cookie)
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
    live.on("msg", async (data: Msg<any>) => {
      if (data.cmd in resolver) {
        await resolver[data.cmd](room_id+"",data);
      } else {
        console.log(data);
      }

    });
    live.on("error", (e) => {
      console.log(e);
    });
    connectPool.set(room_id,live)
  }

  async HTTPServer() {
    const app=new Koa()
    await routing(app)
    app.listen(port, () => console.log(`started server on http://localhost:${port}`));
  }
}




