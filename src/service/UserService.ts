import prisma from "../lib/prisma"



    export async function  existUser(uid: string) {
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
    export async function  createUser(uid: string, data:any) {
        const User = await prisma.user.create({
            data: {
                uid,
                ...data
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
    export async function updateUser(uid: string, data: object) {
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
    export async function processUser(uid: string, data: object) {
        if (await existUser(uid)) {
            //用户存在
            return await updateUser(uid, data)
        } else {
            //用户不存在
            return await createUser(uid, data)
        }

    }

    /**
     * 处理用户发言
     */
    export async function  saveUserSpeak(uid: string, uname: string,roomId:string, content: string, date: string) {
        const ok = await processUser(uid, {uname})
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
    
    export async function entryRoom(uid:string,uname:string,roomId:string){
        if (await existUser(uid)) {
            //用户存在
            return await updateUser(uid, {uname})
        } else {
            //用户不存在
            return await createUser(uid, {uname})
        }
    }


