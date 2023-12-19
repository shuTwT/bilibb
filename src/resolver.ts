import dayjs from "dayjs"
import { IRoomService, IUserService } from "./interface"
import { myContainer } from "./inversify.config"
import { TYPES } from "./type"

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
const userService = myContainer.get<IUserService>(TYPES.UserService)
const roomService = myContainer.get<IRoomService>(TYPES.RoomService)
export const resolver: Resolver = {
    // 'LOG_IN_NOTICE':function(data){
    //     console.log(data)
    // },
    'WATCHED_CHANGE': async function (roomId: string, { data }: Msg<any>) {
        //console.log(`看过人数变化:${data.num}`)
    },
    'LIKE_INFO_V3_CLICK': async function (roomId: string, { data }: Msg<any>) {
        //console.log(`V3点赞,${data.uname}${data.like_text}`)
    },
    'LIKE_INFO_V3_UPDATE': async function (roomId: string, { data }: Msg<any>) {
        //console.log(`v3点赞更新,${data.click_count}`)
    },
    //进入直播间或关注主播
    'INTERACT_WORD': async function (roomId: string, { data }: Msg<any>) {
        //console.log(data.uinfo.base)
        const msg_type=data.msg_type //1为进场,2为关注
        const fansMedal:FansMedal=data.fans_medal
        const uid=data.uid
        const uinfo=data.uinfo
        const uname=data.uname
        const face=data.uinfo.base.face
        await userService.processUser(uid+"",{
            uname,
            fa:face,
        })
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
        console.log(`${data.uname}${data.action}${data.giftName}`)
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
    }
}