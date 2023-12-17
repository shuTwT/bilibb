import { injectable } from "inversify"
import prisma from "../../lib/prisma"
import { IUserService } from "../interface"

@injectable()
export class UserService implements IUserService {
    async existUser(uid: string) {
        const user = await prisma.user.findUnique({
            where: {
                uid
            },
        })
        if (user) {
            return true
        } else {
            return false
        }
    }

    /**
     * 创建用户
     */
    async createUser(uid: string, uname: string) {
        const User = await prisma.user.create({
            data: {
                uid,
                uname,
            }
        })
        if (User) {
            return true
        } else {
            return false
        }
    }

    /**
     * 更新用户
     */
    async updateUser(uid: string, data: any) {
        try {
            const user = await prisma.user.update({
                where: {
                    uid
                },
                data
            })
            if (user) {
                return true
            } else {
                return false
            }
        } catch (e) {
            throw e
        }
    }

    /**
     * 是否存在用户，存在则更新，不存在则创建
     */
    async processUser(uid: string, uname: string) {
        if (await this.existUser(uid)) {
            //用户存在
            return await this.updateUser(uid, { uname: uname })
        } else {
            //用户不存在
            return await this.createUser(uid, uname)
        }

    }

    /**
     * 处理用户发言
     */
    async saveUserSpeak(uid: string, uname: string,roomId:string, content: string, date: string) {
        const ok = await this.processUser(uid, uname)
        if (ok) {
            const user = await prisma.speak.create({
                data: {
                    uid,
                    roomId,
                    content,
                    date
                }
            })
            if(user){
                return true
            }else{
                return false
            }
        }
        return false
    }
    
    async entryRoom(uid:string,uname:string,roomId:string){
        if (await this.existUser(uid)) {
            //用户存在
            return await this.updateUser(uid, { uname: uname })
        } else {
            //用户不存在
            return await this.createUser(uid, uname)
        }
    }

}
