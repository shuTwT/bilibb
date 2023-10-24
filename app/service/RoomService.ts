import prisma from "../../lib/prisma"
import { UserService } from "./UserService"

export class RoomService{
    userService:UserService;
    constructor(userService:UserService){
        this.userService=userService
    }
    /**
     * 房间是否存在于数据库
     */
    async exsitRoom(roomId:string){
        const room=await prisma.room.findUnique({
            where:{
                roomId
            }
        })
        if(room){
            return true
        }else{
            return false
        }
    }
    /**
     * 创建房间
     */
    async createRoom(roomId:string,roomOwnerUid:string){
        const room=await prisma.room.create({
            data:{
                roomId,
                roomOwnerUid
            }
        })
    }
    increaseEnterRoomNum(num=1){
        // 当日进房量+1
    }
    increaseSpeakerNum(num=1){
        // 当日发言人数+1
    }
    increaseDanmakuNum(num=1){
        // 当日弹幕数量+1
    }
    increaseConsumptionNum(num=1000){
        // 当日消费金额
    }
    increaseGiftNum(num=1){
        // 当日礼物数量
    }
    increaseLikeNum(num=1){
        // 当日点赞数
    }
    increaseShareNum(num=1){
        // 当日分享数
    }
    increaseFollowNum(num=1){
        // 当日关注数
    }
}