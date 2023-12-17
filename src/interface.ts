export interface IUserService{
    existUser(uid:string):Promise<boolean>
    createUser (uid:string, uname:string):Promise<boolean>
    updateUser (uid:string, data:any):Promise<boolean>
    processUser (uid:string, uname:string):Promise<boolean>
    saveUserSpeak(uid:string,uname:string,roomId:string,content:string,date:string):Promise<boolean>
    entryRoom(uid:string,uname:string,roomId:string):Promise<boolean>
}
export interface IRoomService{
    userService:IUserService
    exsitRoom(roomId:string):Promise<boolean>
    createRoom(roomId:string,roomOwnerUid:string,data?:any):Promise<boolean>
    updateRoom(roomId:string,roomOwnerUid:string,data?:any):Promise<boolean>
    increaseEnterRoomNum(num:number):Promise<void>
    increaseSpeakerNum(roomId:string,date:string):Promise<boolean>
    increaseDanmakuNum(num:number):Promise<void>
    increaseConsumptionNum(num:number):Promise<void>
    increaseGiftNum(num:number):Promise<void>
    increaseLikeNum(num:number):Promise<void>
    increaseShareNum(num:number):Promise<void>
    increaseFollowNum(num:number):Promise<void>
    exsitLive(roomId: string, date: string):Promise<boolean>
    createLive(roomId: string, date: string):Promise<boolean>
    updateLiveFans(roomId:string,date:string,fans:number,fansClub:number):Promise<boolean>
    updateRedNotice(roomId:string,date:string,tag:number):Promise<boolean>
}
export interface ILogService{
    
}