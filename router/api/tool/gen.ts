import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import prisma from "../../../utils/prisma";
import { parseQuery, str2num } from "../utils";

const genRouter = new Router<DefaultState, Context>({
    prefix:"/gen"
});

/**
 * 查询代码生成列表
 */
genRouter.get('/',async(ctx,next)=>{
    const pageSize = str2num(parseQuery(ctx.query, "pageSize"), 10);
    const pageNum = str2num(parseQuery(ctx.query, "pageNum"), 1);
    const [list,count] = await prisma.$transaction([prisma.genTable.findMany({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
    }),prisma.genTable.count()]) 
    ctx.body={
        code:200,
        msg:"success",
        data:{
            list,
            total:count,
            pageSize,
            pageNum
        }
    }
})

/**
 * 查询数据库列表
 */
genRouter.get('/db',async(ctx,next)=>{
    const tableName = parseQuery(ctx.query, "tableName")??"";
    const tableComment = parseQuery(ctx.query, "tableComment")??"";
    try{
    const dbTables =await prisma.$queryRaw`
    SELECT table_name,table_comment,update_time FROM information_schema.tableNames
    WHERE table_schema = (select database())
    AND table_name NOT LIKE 'qrtz_%' AND table_name NOT LIKE 'gen_%' AND 'table_name' NOT LIKE '_prisma_%'
    AND table_name NOT IN (select table_name from gen_table)
    AND table_name LIKE ${tableName}
    AND table_comment LIKE ${tableComment};
    `
    ctx.body={
        code:200,
        msg:"success",
        data:{
            list:dbTables
        }
    }
    }catch(error){
        ctx.log4js.error(error)
        ctx.body={
            code:500,
            msg:String(error)
        }
    }
})

/**
 * 查询数据表字段列表
 */
genRouter.get('/column/:tableId',async(ctx,next)=>{

})

/**
 * 导入表结构
 */
genRouter.post('/import/table',async(ctx,next)=>{
    

})

/**
 * 创建表结构
 */
genRouter.post('/create/table',async(ctx,next)=>{
    const body=ctx.request.body
    const sql:string=body.sql
    
    const tableNames:string[] = []
})

/**
 * 预览代码
 */
genRouter.get('/preview/:tableId',async(ctx,next)=>{

})

/**
 * 生成代码(下载)
 */
genRouter.get('/download/:tableName',async(ctx,next)=>{

})

/**
 * 生成代码(自定义路径)
 */
genRouter.get('/gen-code/:tableName',async(ctx,next)=>{

})

/**
 * 同步数据库
 */
genRouter.get('/synch-db/:tableName',async(ctx,next)=>{

})

/**
 * 批量生成代码
 */
genRouter.get('/batch-gen-code',async(ctx,next)=>{

})

/**
 * 修改代码生成业务
 */
genRouter.put('/:tableId',async(ctx,next)=>{

})

/**
 * 删除代码生成
 */
genRouter.delete('/:tableId',async(ctx,next)=>{

})

export {genRouter}