import fetch from "node-fetch";
/**
 *
 * @returns
 */
export const getDanmuConf = async (roomid: number, cookie: string) => {
  const raw: any = await fetch(
    `https://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo?id=${roomid}`,
    {
      headers: {
        cookie: cookie,
      },
      //credentials:'include'
    }
  ).then((w) => w.json());
  const {
    data: {
      token: key,
      host_list: [{ host }],
    },
  } = raw;
  const address = `wss://${host}/sub`;
  return { key, host, address, raw };
};
/**
 * 获取主播信息
 * @param roomid 
 * @param cookie 
 * @returns 
 */
export const getRoomInfo=async(roomid:number,cookie:string)=>{
  const raw=await fetch(`https://api.live.bilibili.com/room/v1/Room/get_info?id=${roomid}`,{
    method:'POST',
    headers:{
      cookie:cookie
    }
  }).then(res=>res.json())

  return raw
}
/**
 * 获取长房间号
 * @param short 
 * @returns 
 */
export const getRoomid = async (short: number,cookie:string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { 
    data: { 
      room_id,
      short_id,
      uid
     } }:any = await fetch(`https://api.live.bilibili.com/room/v1/Room/mobileRoomInit?id=${short}`,{
      headers:{
        cookie:cookie
      }
     }).then(w => w.json())
  return { 
    room_id,
    short_id,
    room_owner_uid:uid
   }
}