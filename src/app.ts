/**
 * 参考
 * https://github.com/simon300000/bilibili-live-ws
 * https://github.com/lovelyyoshino/Bilibili-Live-API/blob/master/API.WebSocket.md
 * https://github.com/Minteea/floating-live
 */
import "reflect-metadata"
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

dotenv.config();
const short_room_id = Number.parseInt(process.env.ROOM_ID + "");

const uid = Number.parseInt(process.env.UID + "");
const buvid = process.env.BUVID + "";
const cookie = process.env.COOKIE + "";

@Application()
class App {
  private roomService: RoomService
  constructor() {
    this.roomService = myContainer.get<IRoomService>(TYPES.RoomService)
    this.bootstrap()
  }
  async bootstrap() {

    const liveTcp = (globalThis as unknown as {
      liveTcp: LiveTCP | undefined
    }).liveTcp ?? await this.TCPServer()

    if (process.env.NODE_ENV !== 'production') (globalThis as unknown as {
      liveTcp: LiveTCP | undefined
    }).liveTcp = liveTcp;
  }
  async TCPServer() {
    const { room_id } = await getRoomid(short_room_id, cookie)
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
    live.on("msg", async (data: Msg) => {
      if (data.cmd in resolver) {
        await resolver[data.cmd](room_id+"",data);
      } else {
        console.log(data);
      }

    });
    live.on("error", (e) => {
      console.log(e);
    });
    return live
  }

  async HTTPServer() {

  }
}




