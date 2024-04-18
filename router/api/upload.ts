import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import path from 'node:path';
import fs from 'node:fs'
import multer from '@koa/multer'

const uploadDir = path.resolve(process.cwd(),'public','upload')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDir)
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()} ${path.extname(file.originalname)}`)
    }
})

const uploadRouter = new Router<DefaultState, Context>();
uploadRouter.post('/upload',multer({storage}).single('file'),async(ctx,next)=>{
    const file = ctx.file

    ctx.body = {
        code:500,
        msg:'success',
        data:{
            name:'',
            url:''
        }
    }
    
})

export {uploadRouter}