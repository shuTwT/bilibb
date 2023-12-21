import { LiveTCP } from "bilibili-live-ws";
import prisma from "../lib/prisma";
import { getDanmuConf, getRoomid, getRoomInfo } from "../utils";
import { resolver } from "../resolver";
import type { Msg } from "../resolver";

const short_room_id = Number.parseInt(process.env.ROOM_ID + "");
const uid = Number.parseInt(process.env.UID + "");
const buvid = process.env.BUVID + "";
const cookie = process.env.COOKIE + "";

export const connectPool=new Map<string|number,any>()

export async function TCPServer() {
    const { room_id } = await getRoomid(short_room_id, cookie)
    if (connectPool.has(room_id)) {
      console.log("该房间已在连接池中")
      return
    }
    const {
      description,
      parent_area_name,
      title,
      user_cover,
      keyframe,
      tags,
      area_name,
      room_owner_uid
    } = await getRoomInfo(room_id, cookie)
  
    await prisma.room.upsert({
      where: {
        roomId: room_id+""
      },
      update: {
        roomOwnerUid: room_owner_uid + "",
        description,
        parentAreaName: parent_area_name,
        title,
        userCover: user_cover,
        keyframe,
        tags,
        areaName: area_name,
      },
      create: {
        roomId: room_id+"",
        roomOwnerUid: room_owner_uid + "",
        description,
        parentAreaName: parent_area_name,
        title,
        userCover: user_cover,
        keyframe,
        tags,
        areaName: area_name,
      }
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
        await resolver[data.cmd](room_id + "", data);
      } else {
        //console.log(data);
      }
  
    });
    live.on("error", (e) => {
      console.log(e);
    });
    connectPool.set(room_id, live)
  }