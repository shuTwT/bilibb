import { createServer } from "node:http";
import { LiveTCP } from "bilibili-live-ws";
import { getDanmuConf, getRoomid, getRoomInfo } from "./utils.js";
import { loadEnv } from "./env.js";
import * as log4js from "./utils/log4js.js";
import type { Msg } from "./core/resolver.js";
import { resolver } from "./core/resolver.spec.js";

import * as dotenv from "dotenv";

dotenv.config();
await loadEnv();

const short_room_id = 3157015;
const uid = 156908996
const buvid = "42E257E0-440F-153D-09E6-6D01E9EA33E165361infoc"
const sessData = "d9706084,1727417187,bc193*32CjCo8j31LNfMe54jwtrLZ2h2N9_itfEiXfuTZUghYTYqAAbuOnq91mGacazUMvCC6N0SVlVpQ0h5MS1PU3Ntc0VXQnFpZVVWN1hXbGx6Tnc5M01XTU5waHVFaENDTjRxRE9GX0pCaWlNLUcwdm1SeVRPck5FbDI0NnNNMmJIdU8zaHFOSjhBLUx3IIEC"
const bili_jct = "607912b867385df1fa09846a8ae44291"
const bili_ticket = "eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTIxMjQzOTYsImlhdCI6MTcxMTg2NTEzNiwicGx0IjotMX0.LkhkBiQPxJwLsjKZxXFV8arkSZyzUB3BolENfNmQsr8"
const bili_ticket_expires="1712124336"
const DedeUserID = "156908996"

const cookies = `SESSDATA=${sessData};bili_jct=${bili_jct};bili_ticket=${bili_ticket};bili_ticket_expires=${bili_ticket_expires};DedeUserID=${DedeUserID};buvid3=${buvid};`
async function test() {

  try {
    if (isNaN(uid)) {
      throw "请先在系统设置中设置uid";
    }
    const { room_id } = await getRoomid(short_room_id, cookies);
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
    const conf = await getDanmuConf(room_id, cookies);
    const live = new LiveTCP(room_id, {
      uid: uid,
      key: conf.key,
      buvid: buvid,
    });
    live.on("open", (data) => {
      log4js.info("Connection is established");
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
        console.log(data);
      }
    });
    live.on("error", (e) => {
      log4js.error(e);
    });
  } catch (e) {
    log4js.error(e);
  }
}


await test()