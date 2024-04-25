import dayjs from 'dayjs'
import md5 from '../common/utils/md5'

const web_keys={
    img_key:"",
    sub_key:"",
    expires:0
}

const mixinKeyEncTab = [
    46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
    33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
    61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
    36, 20, 34, 44, 52
]

const getMixinKey=(orig:any)=>mixinKeyEncTab.map(n=>orig[n]).join('').slice(0,32)

export const getWbiKeys=async (cookie:string)=>{
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

    web_keys.img_key=img_url.slice(
        img_url.lastIndexOf('/') + 1,
        img_url.lastIndexOf('.'))
    web_keys.sub_key=img_url.slice(
        img_url.lastIndexOf('/') + 1,
        img_url.lastIndexOf('.'))
    web_keys.expires=dayjs().add(1,'day').valueOf()

}


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

export const getParsedWbiQuery= async (params:object,cookie:string)=>{
    if(dayjs(web_keys.expires).isBefore(dayjs())) await getWbiKeys(cookie)
    const img_key=web_keys.img_key
    const sub_key=web_keys.sub_key
    const query = encWbi(params,img_key,sub_key)
    return query
}