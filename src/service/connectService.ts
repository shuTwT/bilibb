import { LiveTCP } from "bilibili-live-ws";
import prisma from "../lib/prisma";
import { getDanmuConf, getRoomid, getRoomInfo } from "../utils";
import { resolver } from "../resolver";
import type { Msg } from "../resolver";
import * as log4js from "../utils/log4js";

export const connectPool = new Map<string | number, any>();

export async function createConnect(short_room_id: number) {
  const cookies = globalThis.env.cookies;
  const buvid = globalThis.env.buvid;
  const uid = parseInt(globalThis.env.uid + "");

  if (!buvid || buvid == "") {
    log4js.debug("请先在系统设置中设置buvid");
    return;
  }
  if (isNaN(uid)) {
    log4js.debug("请先在系统设置中设置uid");
    return;
  }
  if(isNaN(short_room_id)){
    log4js.debug("请确认roomId正确")
    return
  }

  const { room_id } = await getRoomid(short_room_id, cookies);

  if (connectPool.has(room_id)) {
    console.log("该房间已在连接池中");
    return;
  }
  const {
    description,
    parent_area_name,
    title,
    user_cover,
    keyframe,
    tags,
    area_name,
    room_owner_uid,
  } = await getRoomInfo(room_id, cookies);

  await prisma.room.upsert({
    where: {
      roomId: room_id + "",
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
      roomId: room_id + "",
      roomOwnerUid: room_owner_uid + "",
      description,
      parentAreaName: parent_area_name,
      title,
      userCover: user_cover,
      keyframe,
      tags,
      areaName: area_name,
    },
  });

  const conf = await getDanmuConf(room_id, cookies);

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
  connectPool.set(room_id, live);
}
export async function TCPServer() {
  const short_room_id = globalThis.env.roomId;

  if (!short_room_id || short_room_id == "") {
    log4js.debug("请先在系统设置中设置直播间ID");
    return;
  }


  await createConnect(parseInt(short_room_id));
}
