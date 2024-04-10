import UAParser from "ua-parser-js";
import log4js from "./utils/log4js.js"
import prisma from "./utils/prisma.js";
import { Options, SysUser } from "@prisma/client";
import type session from "koa-session";
import { LoginUser } from "./core/model/LoginUser.js";
// import { createRequire } from "node:module";

// const require=createRequire(import.meta.url)
// const native= require('../native') 
// global.native=native
//const nati=require('')
declare global{
    namespace globalThis{
        var env:Env
        var native:unknown
    }

    interface Window{

    }
} 





declare module "koa"{
    interface DefaultState{
        [key:string]:any
    }
    interface Context {
        log4js:typeof log4js
        session: session.Session | null;
        render:(relPath: string, locals ?:object)=>Promise<string>
        ua:UAParser.UAParserInstance,
        getLoginUser:()=>LoginUser
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