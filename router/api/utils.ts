import { Context } from "koa"
import fs from "node:fs"
import path from "node:path"
import ejs from "ejs";
import type {Options,Data} from "ejs"
import { ParsedUrlQuery } from "node:querystring"

export async function getTemplate(name: string,data?:Data,options?:Options,ext: string = 'ejs') {
    if(ext=='html'){
        const html= fs.readFileSync(path.resolve(process.cwd(),'template',`${name}.${ext}`)).toString()
        return html
    }
    if(data&&options){
        return await ejs.renderFile(path.resolve(process.cwd(),'template',`${name}.${ext}`),data,options)
    }else if(data){
        return await ejs.renderFile(path.resolve(process.cwd(),'template',`${name}.${ext}`),data)
    }else{
        return await ejs.renderFile(path.resolve(process.cwd(),'template',`${name}.${ext}`))
    }
    
}

export function parseQuery(query: ParsedUrlQuery, key: string): string |undefined{
    const value = query[key]
    if (typeof value !== 'undefined') {
        if (Array.isArray(value)) {
            return value.join(',')
        } else if (value==='') {
            return void 0
        }else{
            return value
        }
    } else {
        return void 0
    }
}
export function str2num(str: string|undefined, defaultValue: any): number
export function str2num(str: string|undefined, defaultValue: any, options?: {
    min?: number,
    max?: number
}): number
export function str2num(str: string|undefined, defaultValue: any, options?: {
    min?: number,
    max?: number
}): number {

    let num = Number.parseInt(str+"")
    if (isNaN(num)) {
        return defaultValue
    }
    if (options) {
        if (options.min && options.max) {
            if (options.max <= options.min) throw "max必须大于min"
            if (num > options.max) {
                num = options.max
            } else if (num < options.min) {
                num = options.min
            }
        } else if (options.max && num > options.max) {
            num = options.max
        } else if (options.min && num < options.min) {
            num = options.min
        }
    }
    return num
}