import dayjs from "dayjs"
import { IRoomService, IUserService } from "./interface"
import { myContainer } from "./inversify.config"
import { TYPES } from "./type"

export type Msg={
    cmd:string
    data:any
    info?:any
    msg_common?:any
}
interface Resolver{
    [key:string]:(roomId:string,msg:Msg)=>Promise<void>
}
/**
 * 在线人数
 */
const currentRankNum={value:0}
const userService=myContainer.get<IUserService>(TYPES.UserService)
const roomService=myContainer.get<IRoomService>(TYPES.RoomService)
export const resolver:Resolver= {
    // 'LOG_IN_NOTICE':function(data){
    //     console.log(data)
    // },
    'WATCHED_CHANGE':async function(roomId:string,{data}:Msg){
        //console.log(`看过人数变化:${data.num}`)
    },
    'LIKE_INFO_V3_CLICK':async function(roomId:string,{data}:Msg){
        //console.log(`V3点赞,${data.uname}${data.like_text}`)
    },
    'LIKE_INFO_V3_UPDATE':async function(roomId:string,{data}:Msg){
        //console.log(`v3点赞更新,${data.click_count}`)
    },
    //进入直播间
    'INTERACT_WORD':async function(roomId:string,data:Msg){
        console.log(data)
    },
    /**
     * 停播房间列表
     */
    'STOP_LIVE_ROOM_LIST':async function(roomId:string){
        //console.log('获得停播房间列表')
    },
    /**
     * 在线人数
     * @param param0 
     */
    'ONLINE_RANK_COUNT':async function(roomId:string,{data}:Msg){
        if(data.count!==currentRankNum.value){
            currentRankNum.value=data.count
            //console.log(`在线人数${data.count}`)
        }
        
    },
    'ONLINE_RANK_V2':async function(roomId:string,{data}:Msg){
        //console.log(data.online_list)
    },
    'SEND_GIFT':async function(roomId:string,{data}:Msg){
        console.log(`${data.uname}${data.action}${data.giftName}`)
    },
    'DANMU_MSG':async function(roomId:string,data:Msg){
       // console.log(data)
        if('info' in data){
            const uid=data.info[2][0]
            const uname=data.info[2][1]
            const msg=data.info[1]
            const date=dayjs()
            //console.log(`${data.info[2][1]}说:${data.info[1]}`)
            await userService.saveUserSpeak(uid+"",uname,roomId,msg,date.format("YYYY-MM-DD HH:mm:ss"))
            await roomService.increaseSpeakerNum(roomId,date.format("YYYY-MM-DD"))
        }else{
            console.log(data)
        }
        
    },
    'ANCHOR_HELPER_DANMU':async function(roomId:string,{data}:Msg){
        console.log(`${data.sender}:${data.msg}`)
    },
    /**
     * 公告消息
     */
    'NOTICE_MSG':async function(roomId:string,data:Msg){
        console.log(data.msg_common)
    },
    /**
     * 礼物星球
     */
    'WIDGET_GIFT_STAR_PROCESS':async function(roomId:string,{data}:Msg){
        console.log(data.process_list)
    },
    /**
     * 在线榜
     */
    'ONLINE_RANK_TOP3':async function(roomId:string,{data}:Msg){
        //console.log(data.list)
    },
    /**
     * 热门榜变化
     */
    'AREA_RANK_CHANGED':async function(roomId:string,{data}:Msg){
        //console.log(`热门榜变化：${data.rank_name}`)
    },
    'ROOM_REAL_TIME_MESSAGE_UPDATE':async function(roomId:string,{data}:Msg){
        console.log(data)
        // console.log(`房间真实时间消息更新,roomid:${data.roomid},fans:${data.fans},red_notice:${data.red_notice},fans_club:${data.fans_club}`)
        // const date=dayjs().format("YYYY-MM-DD HH:mm:ss")
        // await roomService.updateLiveFans(roomId,date,data.fans,data.fans_club)
        // if(data.red_notice!=-1){
        //     await roomService.updateRedNotice(roomId,date,data.red_notice)
        // }
    },
    /**
     * 舰长进入直播间
     * @param data 
     */
    'ENTRY_EFFECT':async function(roomId:string,{data}:Msg){
        console.log(data)
    },
    /**
     * 人气排名
     * 
     */
    'POPULAR_RANK_CHANGED':async function(roomId:string,{data}:Msg){

    },
    'WIDGET_BANNER':async function(roomId:string,{data}:Msg){

    },
    /**
     * 连续发送多条弹幕
     */
    "DM_INTERACTION":async function(roomId:string,{data}:Msg){

    },
    "SUPER_CHAT_MESSAGE":async function(roomId:string,{data}:Msg){
        const date=dayjs()
        //console.log(`${data.info[2][1]}说:${data.info[1]}`)
        await userService.saveUserSpeak(
            data.uid+"",
            data.user_info.uname,
            roomId,
            data.message,date.format("YYYY-MM-DD HH:mm:ss"))
        await roomService.increaseSpeakerNum(roomId,date.format("YYYY-MM-DD"))

    }
}