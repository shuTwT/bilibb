import type { Context, DefaultState } from "koa";
import Router from "koa-router";
import { getTemplate } from "../../../api/utils";

const shopRouter = new Router<DefaultState, Context>({
    prefix:"/shop"
});

/**
 * 门店
 */
shopRouter.get('/store/index',async(ctx,next)=>{
    await ctx.render('admin/shop/vip.ejs')
})
/**
 * 添加/修改门店
 */
shopRouter.post('/store/upsert',async(ctx,next)=>{
    ctx.body=''
})
/**
 * 删除
 */
shopRouter.post('/store/remove',async(ctx,next)=>{
    ctx.body=''
})

/**
 * 会员管理
 */
shopRouter.get('/vip/index',async(ctx,next)=>{
    await ctx.render('admin/shop/vip.ejs')
})

/**
 * 会员等级管理
 */
shopRouter.get('/vip/grade',async(ctx,next)=>{
    await ctx.render('admin/shop/grade.ejs')
})

/**
 * 会员积分管理
 */
shopRouter.get('/vip/points',async(ctx,next)=>{
    await ctx.render('admin/shop/points.ejs')
})

/**
 * 会员余额管理
 */
shopRouter.get('/vip/balance',async(ctx,next)=>{
    ctx.body=''
})

export {shopRouter}