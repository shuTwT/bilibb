import type { Context, Next } from "koa";

export interface paramState{
    page?:number
    limit?:number

    [key:string]:any
}

export default function(){
    return async function(ctx:Context,next:Next){
        const page=ctx.query.page
        const limit=ctx.query.limit
        if(typeof page=='string'&&!Number.isNaN(parseInt(page))){
            ctx.state.page=parseInt(page)
        }else{
            ctx.state.page=void 0
        }
        if(typeof limit=='string'&&!Number.isNaN(parseInt(limit))){
            ctx.state.limit=parseInt(limit)
        }else{
            ctx.state.limit=void 0
        }
        

    }
}