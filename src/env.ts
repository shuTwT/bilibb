import type { Server } from "socket.io";
import * as log4js from "./utils/log4js.js"
import prisma from "./utils/prisma.js";
import { Options } from "@prisma/client";
import type session from "koa-session";

declare global{
    
    namespace globalThis{
        var io: Server
        var env:Env
    }

    interface Window{

    }
} 



declare module "koa"{
    interface DefaultState{
        page?:number
        limit?:number
        [key:string]:any
    }
    interface Context {
        log4js:{
            debug:(content:string)=>void,
            info:(content:string)=>void
            error:(content:string)=>void
        }
        session: session.Session
    }
}

export interface DefaultOptions {
    roomId:string
    uid:string
    buvid:string
    sessData:string
    bili_ticket:string
    bili_ticket_expires:string
    DedeUserID:string
    bili_jct:string
    installed:string
    host:string
    [key:string]:string
    
}
type EnvArray=Array<[string,string]>
interface Env extends Partial<DefaultOptions>{
    readonly cookies:string
}

/**
 * 从数据库中加载变量到global上
 */
export async function loadEnv(){
    try{
        const options:Options[]=await prisma.options.findMany()
        const envArray:EnvArray=options.map(value=>{
            return [value.optionName,value.optionValue]
        })
        const env:Partial<DefaultOptions>=Object.fromEntries<string>(envArray)
        Object.defineProperty(env,'cookies',{
            get() {
                return `SESSDATA=${this.sessData};bili_jct=${this.bili_jct};bili_ticket=${this.bili_ticket};bili_ticket_expires=${this.bili_ticket_expires};DedeUserID=${this.DedeUserID};buvid3=${this.buvid};`
            },
        })
        globalThis.env=env as Env
    }catch(e){
        log4js.prismaError(e)
    }
    
}
export {}