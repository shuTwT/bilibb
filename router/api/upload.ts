import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import path from 'node:path';
import fs from 'node:fs'

const uploadDir = path.resolve(process.cwd(),'public','upload')

const uploadRouter = new Router<DefaultState, Context>();
uploadRouter.post('/upload',async(ctx,next)=>{
    const files = ctx.request.files
    console.log(files)
    ctx.body = {
        code:200,
        msg:'success',
        data:{
            // name:file.originalname,
            // mimetype:file.mimetype,
            // size:file.size,
            // url:'/upload/'+file.filename,
            // filename:file.filename
        }
    }
    
})

export {uploadRouter}