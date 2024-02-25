import dayjs from "dayjs"
import * as log4js from "./utils/log4js.js"
const userService =await import ("./service/UserService.js")
const roomService = await import("./service/RoomService.js")

type FansMedal = {
    anchor_roomid: number,
    guard_level: number,
    icon_id: number,
    is_lighted: number,
    medal_color: number,
    medal_color_border: number,
    medal_color_end: number,
    medal_color_start: number,
    medal_level: number,
    medal_name: string,
    score: number,
    special: string,
    target_id: number
}
type InteractiveGameData={
    type: number,
    uid: number,
    uname: string,
    uface: string,
    gift_id: number,
    gift_name: string,
    gift_num: number,
    price: number,
    paid: false,
    msg: string,
    fans_medal_level: number,
    guard_level: number,
    timestamp: number,
    anchor_lottery: any,
    pk_info: any,
    anchor_info: any,
    combo_info: any
}
export type Msg<T> = {
    cmd: string
    data: T
    info?: any
    msg_common?: any
}
interface Resolver {
    [key: string]: (roomId: string, msg: Msg<any>) => Promise<void>
}
/**
 * 在线人数
 */
const currentRankNum = { value: 0 }

export const resolver: Resolver = {
    // 'LOG_IN_NOTICE':function(data){
    //     console.log(data)
    // },
    'WATCHED_CHANGE': async function (roomId: string, { data }: Msg<any>) {
        //console.log(`看过人数变化:${data.num}`)
    },
    'LIKE_INFO_V3_CLICK': async function (roomId: string, { data }: Msg<any>) {
        //console.log(`V3点赞,${data.uname}${data.like_text}`)
        const date=dayjs().format("YYYY-MM-DD HH:mm:ss")
        userService.userLike(data.uid,roomId,date,data.uname)
    },
    'LIKE_INFO_V3_UPDATE': async function (roomId: string, { data }: Msg<any>) {
        const date=dayjs().format("YYYY-MM-DD HH:mm:ss")
        roomService.updateLikeNum(roomId,data.click_count,date)
    },
    //进入直播间或关注主播
    'INTERACT_WORD': async function (roomId: string, { data }: Msg<any>) {
        //console.log(data.uinfo.base)
        const msg_type=data.msg_type //1为进场,2为关注
        const fansMedal:FansMedal=data.fans_medal
        const uid=data.uid+""
        const uinfo=data.uinfo
        const uname=data.uname
        let face=''
        const date=dayjs().format('YYYY-MM-DD HH:mm:ss')
        if(data.uinfo){
            // face='/api/proxy/bfs/face/'+data.uinfo.base.face.slice(
            //     data.uinfo.base.face.lastIndexOf('/') + 1);
            face=data.uinfo.base.face
        }
        await userService.processUser(uid,{
            uname,
            fa:face,
        })
        if(msg_type==1){
            await roomService.increaseEnterRoomNum(roomId,uid,date)
        }else if(msg_type==2){
            await roomService.increaseFollowNum(roomId,date)
        }
    },
    /**
     * 停播房间列表
     */
    'STOP_LIVE_ROOM_LIST': async function (roomId: string) {
        //console.log('获得停播房间列表')
    },
    /**
     * 在线人数
     * @param param0 
     */
    'ONLINE_RANK_COUNT': async function (roomId: string, { data }: Msg<any>) {
        if (data.count !== currentRankNum.value) {
            currentRankNum.value = data.count
            //console.log(`在线人数${data.count}`)
        }

    },
    'ONLINE_RANK_V2': async function (roomId: string, { data }: Msg<any>) {
        //console.log(data.online_list)
    },
    'SEND_GIFT': async function (roomId: string, { data }: Msg<any>) {
        log4js.info(`${data.uname}${data.action}${data.giftName}`)
        const uid=data.uid+""
        const uname=data.uname
        const date=dayjs().format("YYYY-MM-DD HH:mm:ss")
        const face=data.face
        const giftId=data.giftId
        const giftName=data.giftName
        const medal_info=data.medal_info
        const giftNum=data.num
        const coinType=data.coin_type //礼物是否付费
        const price=data.price //礼物价值
        const totalCoin=data.total_coin
        await roomService.updateGift(roomId,uid,uname,date,face,giftId,giftName,medal_info,giftNum)
        await userService.userLog(uid,uname,roomId,`在${roomId}直播间赠送礼物${giftName}`,date)
    },
    'DANMU_MSG': async function (roomId: string, data: Msg<any>) {
        if ('info' in data) {
            const uid = data.info[2][0]
            const uname = data.info[2][1]
            const msg = data.info[1]
            const date = dayjs()
            //console.log(`${data.info[2][1]}说:${data.info[1]}`)
            await userService.saveUserSpeak(uid + "", uname, roomId, msg, date.format("YYYY-MM-DD HH:mm:ss"))
            await roomService.increaseSpeakerNum(roomId, date.format("YYYY-MM-DD"))
        } else {
            console.log(data)
        }

    },
    'ANCHOR_HELPER_DANMU': async function (roomId: string, { data }: Msg<any>) {
        console.log(`${data.sender}:${data.msg}`)
    },
    /**
     * 公告消息
     */
    'NOTICE_MSG': async function (roomId: string, data: Msg<any>) {
        //console.log(data.msg_common)
    },
    /**
     * 礼物星球
     */
    'WIDGET_GIFT_STAR_PROCESS': async function (roomId: string, { data }: Msg<any>) {
        //console.log(data.process_list)
    },
    /**
     * 在线榜
     */
    'ONLINE_RANK_TOP3': async function (roomId: string, { data }: Msg<any>) {
        //console.log(data.list)
    },
    /**
     * 热门榜变化
     */
    'AREA_RANK_CHANGED': async function (roomId: string, { data }: Msg<any>) {
        //console.log(`热门榜变化：${data.rank_name}`)
    },
    'ROOM_REAL_TIME_MESSAGE_UPDATE': async function (roomId: string, { data }: Msg<any>) {
        //console.log(data)
        console.log(`房间真实时间消息更新,roomid:${data.roomid},fans:${data.fans},red_notice:${data.red_notice},fans_club:${data.fans_club}`)
        const date=dayjs().format("YYYY-MM-DD HH:mm:ss")
        await roomService.updateLiveFans(roomId,date,data.fans,data.fans_club)
        if(data.red_notice!=-1){
            await roomService.updateRedNotice(roomId,date,data.red_notice)
        }
    },
    /**
     * 舰长(不是),有进场特效的用户进入直播间
     * 
     */
    'ENTRY_EFFECT': async function (roomId: string, { data }: Msg<any>) {
        const uid=data.uid
        const face=data.face //头像
        const copy_writing=data.copy_writing //进场欢迎文本
        const copy_color=data.copy_color //进场欢迎文本颜色
        //console.log(data)
    },
    /**
     * 人气排名
     * 
     */
    'POPULAR_RANK_CHANGED': async function (roomId: string, { data }: Msg<any>) {

    },
    'WIDGET_BANNER': async function (roomId: string, { data }: Msg<any>) {

    },
    /**
     * 连续发送多条弹幕
     */
    "DM_INTERACTION": async function (roomId: string, { data }: Msg<any>) {

    },
    "SUPER_CHAT_MESSAGE": async function (roomId: string, { data }: Msg<any>) {
        const date = dayjs()
        //console.log(`${data.info[2][1]}说:${data.info[1]}`)
        await userService.saveUserSpeak(
            data.uid + "",
            data.user_info.uname,
            roomId,
            data.message, date.format("YYYY-MM-DD HH:mm:ss"))
        await roomService.increaseSpeakerNum(roomId, date.format("YYYY-MM-DD"))
    },
    "LIVE_INTERACTIVE_GAME":async function(roomId:string,{data}:Msg<InteractiveGameData>){
        const uid=data.uid
        const uname=data.uname
        const msg=data.msg
    },
    // 购买大航海
    "GUARD_BUY":async function(roomId:string,{data}:Msg<any>){
        const price=data.price //金瓜子标价，即rmb*1000
        const giftId=data.gift_id
        const giftName=data.gift_name
        const uid=data.uid
        const uname=data.username
        const guardLevel=data.guard_level
        console.log(uname+"购买了大航海")
    },
    "USER_TOAST_MSG":async function(roomId:string,{data}:Msg<any>){
        const toastMsg=data.toast_msg
        const price=data.price
        const uid=data.uid
        const uname=data.username
        const unit=data.unit
        const num=data.num
        const targetGuardCount=data.target_guard_count
        console.log(toastMsg)
    },
    "PREPARING":async function(roomId:string,{data}:Msg<any>){
        console.log("直播终止")
    },
    "LIVE":async function(roomId:string,{data}:Msg<any>){
        //console.log('直播开始')
    },
    "WARNING":async function(roomId:string,{data}:Msg<any>){
        console.log(data.msg)
    },
    "CUT_OFF":async function(roomId:string,{data}:Msg<any>){
        console.log(data.msg)
    },
    "WATCHED_CHANG":async function(roomId:string,{data}:Msg<any>){
        const num=data.num
        const text_small=data.text_small
        console.log(data.text_large)
    }
}