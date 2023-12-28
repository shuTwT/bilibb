import type { Context, Next } from "koa";
import {nanoid} from "nanoid"

export default function(){
    return async function(ctx:Context,next:Next){
        if(!ctx.cookies.get('_uuid')){
            ctx.cookies.set('_uuid',nanoid())
        }
        await next()
    }
}