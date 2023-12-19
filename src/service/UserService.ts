import { Prisma } from "@prisma/client"
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
        try{
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
        }catch(e){
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (e.code === 'P2002') {
                  console.log(uid)
                  console.log(data)
                }
              }
              throw e
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
    export async function processUser(uid: string, data: {uname:string,fa?:string}&object) {
        try{
            await prisma.user.upsert({
                where:{
                    uid
                },
                create:{
                    uid,
                    ...data
                },
                update:{
                    ...data
                }
            })
            return true
        }catch{
            return false
        }

    }

    /**
     * 处理用户发言
     */
    export async function  saveUserSpeak(uid: string, uname: string,roomId:string, content: string, date: string) {
        try{
            await prisma.user.upsert({
                where:{
                    uid
                },
                create:{
                    uid,uname
                },
                update:{
                    uname
                }
            })
            await prisma.speak.create({
                data: {
                    uid,
                    roomId,
                    content,
                    date
                }
            })
            return true
        }catch{
            return false
        }
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


