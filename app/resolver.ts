/**
 * 在线人数
 */
const currentRankNum={value:0}
export default {
    // 'LOG_IN_NOTICE':function(data){
    //     console.log(data)
    // },
    'WATCHED_CHANGE':function({data}){
        console.log(`看过人数变化:${data.num}`)
    },
    'LIKE_INFO_V3_CLICK':function({data}){
        console.log(`V3点赞,${data.uname}${data.like_text}`)
    },
    'LIKE_INFO_V3_UPDATE':function({data}){
        console.log(`v3点赞更新,${data.click_count}`)
    },
    //进入直播间
    'INTERACT_WORD':function(data){
        //console.log(data)
    },
    /**
     * 停播房间列表
     */
    'STOP_LIVE_ROOM_LIST':function(){
        //console.log('获得停播房间列表')
    },
    'ONLINE_RANK_COUNT':function({data}){
        if(data.count!==currentRankNum.value){
            currentRankNum.value=data.count
            console.log(`在线人数${data.count}`)
        }
        
    },
    'ONLINE_RANK_V2':function({data}){
        //console.log(data.online_list)
    },
    'SEND_GIFT':function({data}){
        console.log(`${data.uname}${data.action$}${data.giftName}`)
    },
    'DANMU_MSG':function(data){
        if('info' in data){
            console.log(`${data.info[2][1]}说:${data.info[1]}`)
        }else{
            console.log(data)
        }
        //console.log(`${data.info[2][1]}说:${data.info[1]}`)
    },
    'ANCHOR_HELPER_DANMU':function({data}){
        console.log(`${data.sender}:${data.msg}`)
    },
    /**
     * 公告消息
     */
    'NOTICE_MSG':function(data){
        console.log(data.msg_common)
    },
    /**
     * 礼物星球
     */
    'WIDGET_GIFT_STAR_PROCESS':function({data}){
        console.log(data.process_list)
    },
    /**
     * 在线榜
     */
    'ONLINE_RANK_TOP3':function({data}){
        //console.log(data.list)
    },
    /**
     * 热门榜变化
     */
    'AREA_RANK_CHANGED':function({data}){
        console.log(`热门榜变化：${data.rank_name}`)
    },
    'ROOM_REAL_TIME_MESSAGE_UPDATE':function({data}){
        console.log(`房间真实时间消息更新,roomid:${data.roomid},fans:${data.fans},red_notice:${data.red_notice},fans_club:${data.fans_club}`)
    }
}