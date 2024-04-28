import type { DefaultState, Context } from "koa";
import Router from "koa-router";

const genRouter = new Router<DefaultState, Context>({
    prefix:"/gen"
});

/**
 * 查询代码生成列表
 */
genRouter.get('/',async(ctx,next)=>{

})

/**
 * 查询数据库列表
 */
genRouter.get('/db',async(ctx,next)=>{

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

/**
 * 预览代码
 */
genRouter.delete('/preview/:tableId',async(ctx,next)=>{

})

/**
 * 生成代码(下载)
 */
genRouter.delete('/download/:tableId',async(ctx,next)=>{

})

export {genRouter}