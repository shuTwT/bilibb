import type {Resolver,Msg,InteractiveGameData} from "./resolver"
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
    },
    //进入直播间或关注主播
    'INTERACT_WORD': async function (roomId: string, { data }: Msg<any>) {
        //console.log(data.uinfo.base)
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
    },
    'ONLINE_RANK_V2': async function (roomId: string, { data }: Msg<any>) {
        //console.log(data.online_list)
    },
    'SEND_GIFT': async function (roomId: string, { data }: Msg<any>) {
    
    },
    'DANMU_MSG': async function (roomId: string, data: Msg<any>) {

    },
    'ANCHOR_HELPER_DANMU': async function (roomId: string, { data }: Msg<any>) {
    },
    /**
     * 公告消息
     */
    'NOTICE_MSG': async function (roomId: string, data: Msg<any>) {
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
    },
    /**
     * 舰长(不是),有进场特效的用户进入直播间
     * 
     */
    'ENTRY_EFFECT': async function (roomId: string, { data }: Msg<any>) {
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
       
    },
    "LIVE_INTERACTIVE_GAME":async function(roomId:string,{data}:Msg<InteractiveGameData>){
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
        console.log('直播开始')
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