import prisma from "../lib/prisma"
import dayjs from "dayjs";


    /**
     * 房间是否存在于数据库
     */
    export async function exsitRoom(roomId: string) {
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
    }
    /**
     * 创建房间
     */
    export async function createRoom(roomId: number | string, roomOwnerUid: string, data: any = {}) {
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
    }

    export async function updateRoom(roomId: string, roomOwnerUid: string, data: any = {}) {
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
    }

    /**
     * 直播情况
     * @param roomId 
     * @returns 
     */
    export async function  exsitLive(roomId: string, date: string) {
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
    }

    export async function  createLive(roomId: string, date: string) {
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

    }
    export async function increaseEnterRoomNum(roomId:string,uid:string,date:string) {
        const today=dayjs(date).format('YYYY-MM-DD')
        // 当日进房量+1
        try{
            await prisma.live.upsert({
                where:{
                    roomId_date:{
                        roomId,
                        date:today
                    }
                },
                update:{
                    entryNum:{
                        increment:1
                    }
                },
                create:{
                    roomId,
                    date:today
                }
            })
            return true
        }catch(e){
            throw e
        }
    }
    export async function increaseSpeakerNum(roomId:string,date:string) {
        // 当日发言人数+1
        if(await exsitLive(roomId,date)){
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
            return await createLive(roomId,date)
        }
    }
    export async function increaseDanmakuNum(num = 1) {
        // 当日弹幕数量+1
    }
    export async function increaseConsumptionNum(num = 1000) {
        // 当日消费金额
    }
    export async function increaseGiftNum(num = 1) {
        // 当日礼物数量
    }
    export async function increaseLikeNum(num = 1) {
        // 当日点赞数
    }
    export async function increaseShareNum(num = 1) {
        // 当日分享数
    }
    export async function increaseFollowNum(num = 1) {
        // 当日关注数
    }
    export async function updateLiveFans(roomId:string,date:string,fans:number,fansClub:number){
        if(await exsitLive(roomId,date)){
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
            return await createLive(roomId,date)
        }
    }
    export async function updateRedNotice(roomId:string,date:string,tag:number){
        if(await exsitLive(roomId,date)){
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
            return await createLive(roomId,date)
        }
    }
