import md5 from 'md5'
import fetch from "node-fetch";
type RequestConfig={
    method:string
}

const mixinKeyEncTab = [
    46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
    33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
    61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
    36, 20, 34, 44, 52
]

const getMixinKey=(orig:any)=>mixinKeyEncTab.map(n=>orig[n]).join('').slice(0,32)

function encWbi(params:any,img_key:string,sub_key:string){
    const mixin_key = getMixinKey(img_key + sub_key),
    curr_time = Math.round(Date.now() / 1000),
    chr_filter = /[!'()*]/g

  Object.assign(params, { wts: curr_time }) // 添加 wts 字段
  // 按照 key 重排参数
  const query = Object
    .keys(params)
    .sort()
    .map(key => {
      // 过滤 value 中的 "!'()*" 字符
      const value = params[key].toString().replace(chr_filter, '')
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')

  const wbi_sign = md5(query + mixin_key) // 计算 w_rid

  return query + '&w_rid=' + wbi_sign
}

const request=(url:string,{method='GET'}:RequestConfig)=>{
    return fetch(url)
}
/**
 *
 * @returns
 */
export const getDanmuConf = async (roomid: number|string, cookie: string) => {
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
export const getRoomInfo=async(roomid:number|string,cookie:string)=>{
  const raw:any=await fetch(`https://api.live.bilibili.com/room/v1/Room/get_info?id=${roomid}`,{
    method:'POST',
    headers:{
      cookie:cookie
    }
  }).then(res=>res.json())
  const {
    data: {
    description,
    parent_area_name,
    title,
    user_cover,
    keyframe,
    tags,
    area_name,
    uid
  }}=raw
  return {
    description:description.slice(0,150),
    parent_area_name,
    title,
    user_cover,
    keyframe,
    tags,
    area_name,
    room_owner_uid:uid
  }
}
/**
 * 获取长房间号
 * @param short 
 * @returns 
 */
export const getRoomid = async (short: number|string,cookie:string) => {
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
    room_id:room_id,
    short_id,
    room_owner_uid:uid
   }
}

export const getWbiKeys=async (cookie:string):Promise<{
    img_key:string,
    sub_key:string
}>=>{
    const {data:{
        wbi_img:{
            img_url,
            sub_url
        }
    }}:any=await fetch(`https://api.bilibili.com/x/web-interface/nav`,{
        headers:{
            cookie:cookie
        }
    }).then(res=>res.json())
    return {
        img_key:img_url.slice(
            img_url.lastIndexOf('/') + 1,
            img_url.lastIndexOf('.')),
        sub_key:img_url.slice(
            img_url.lastIndexOf('/') + 1,
            img_url.lastIndexOf('.'))
    }
}

export const getParsedWbiQuery= async (params:object,cookie:string)=>{
    const web_keys = await getWbiKeys(cookie)
    const img_key=web_keys.img_key
    const sub_key=web_keys.sub_key
    const query = encWbi(params,img_key,sub_key)
    return query
}