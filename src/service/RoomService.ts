import prisma from "../lib/prisma"
import dayjs from "dayjs";

export const roomService= {
    /**
     * 房间是否存在于数据库
     */
    async exsitRoom(roomId: string) {
        const room = await prisma.room.findUnique({
            where: {
                roomId
            }
        })
        if (room) {
            return true
        } else {
            return false
        }
    },
    /**
     * 创建房间
     */
    async createRoom(roomId: number | string, roomOwnerUid: string, data: any = {}) {
        const room = await prisma.room.create({
            data: {
                roomId: roomId + "",
                roomOwnerUid,
                ...data
            }
        })
        if (room) {
            return true
        } else {
            return false
        }
    },

    async updateRoom(roomId: string, roomOwnerUid: string, data: any = {}) {
        const room = await prisma.room.update({
            data: {
                roomOwnerUid,
                ...data
            },
            where: {
                roomId
            }
        })
        if (room) {
            return true
        } else {
            return false
        }
    },

    /**
     * 直播情况
     * @param roomId 
     * @returns 
     */
    async exsitLive(roomId: string, date: string) {
        const live = await prisma.live.findFirst({
            where: {
                AND:[
                    {roomId},
                    {date:dayjs(date).format("YYYY-MM-DD")}
                ]   
            }
        })
        if (live) {
            return true
        } else {
            return false
        }
    },

    async createLive(roomId: string, date: string) {
        const live = await prisma.live.create({
            data: {
                roomId,
                date:dayjs(date).format("YYYY-MM-DD")
            }
        })
        if(live){
            return true
        }else{
            return false
        }

    },
    async increaseEnterRoomNum(num = 1) {
        // 当日进房量+1
    },
    async increaseSpeakerNum(roomId:string,date:string) {
        // 当日发言人数+1
        if(await this.exsitLive(roomId,date)){
            const live = await prisma.live.updateMany({
                data:{
                    speakNum:{
                        increment:1
                    }
                },
                where:{
                    AND:[
                        {roomId},
                        {date:dayjs(date).format("YYYY-MM-DD")}
                    ]
                    
                }
            })
            if(live){
                return true
            }else{
                return false
            }
        }else{
            return await this.createLive(roomId,date)
        }
    },
    async increaseDanmakuNum(num = 1) {
        // 当日弹幕数量+1
    },
    async increaseConsumptionNum(num = 1000) {
        // 当日消费金额
    },
    async increaseGiftNum(num = 1) {
        // 当日礼物数量
    },
    async increaseLikeNum(num = 1) {
        // 当日点赞数
    },
    async increaseShareNum(num = 1) {
        // 当日分享数
    },
    async increaseFollowNum(num = 1) {
        // 当日关注数
    },
    async updateLiveFans(roomId:string,date:string,fans:number,fansClub:number){
        if(await this.exsitLive(roomId,date)){
            const live = await prisma.live.updateMany({
                data:{
                    fans,
                    fansClub
                },
                where:{
                    AND:[
                        {roomId},
                        {date:dayjs(date).format("YYYY-MM-DD")}
                    ]
                }
            })
            if(live){
                return true
            }else{
                return false
            }
        }else{
            return await this.createLive(roomId,date)
        }
    },
    async updateRedNotice(roomId:string,date:string,tag:number){
        if(await this.exsitLive(roomId,date)){
            const notice = await prisma.redNotice.create({
                data:{
                    roomId,
                    redNoticeTag:tag,
                    date:dayjs(date).format("YYYY-MM-DD HH:mm:ss")
                },
            })
            const live =await prisma.live.updateMany({
                data:{
                    redNoticeNum:{
                        increment:1
                    }
                },
                where:{
                    AND:[
                        {roomId},
                        {date:dayjs(date).format("YYYY-MM-DD")}
                    ]
                    
                }
            })
            if(notice&&live){
                return true
            }else{
                return false
            }
        }else{
            return await this.createLive(roomId,date)
        }
    }
}