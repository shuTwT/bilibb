import type { DefaultState, Context } from "koa";
import Router from "koa-router";

const systemRouter = new Router<DefaultState, Context>();

/** 获取系统管理-用户管理列表 */
systemRouter.post('/user',async(ctx,next)=>{

})
/** 系统管理-用户管理-获取所有角色列表 */
systemRouter.post('/list-all-role',async(ctx,next)=>{
    
})
/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
systemRouter.post('/list-role-ids',async(ctx,next)=>{
    
})
/** 获取系统管理-角色管理列表 */
systemRouter.post('/role',async(ctx,next)=>{
    
})
/** 获取系统管理-菜单管理列表 */
systemRouter.post('/menu',async(ctx,next)=>{
    
})
/** 获取系统管理-部门管理列表 */
systemRouter.post('/dept',async(ctx,next)=>{
    
})
/** 获取系统监控-在线用户列表 */
systemRouter.post('/oneline-logs',async(ctx,next)=>{
    
})
/** 获取系统监控-登录日志列表 */
systemRouter.post('/login-logs',async(ctx,next)=>{
    
})
/** 获取系统监控-操作日志列表 */
systemRouter.post('/operation-logs',async(ctx,next)=>{
    
})
/** 获取系统监控-系统日志列表 */
systemRouter.post('/system-logs',async(ctx,next)=>{
    
})
/** 获取系统监控-系统日志-根据 id 查日志详情 */
systemRouter.post('/system-logs-detail',async(ctx,next)=>{
    
})
/** 获取角色管理-权限-菜单权限 */
systemRouter.post('/role-menu',async(ctx,next)=>{
    
})
/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
systemRouter.post('/role-menu-ids',async(ctx,next)=>{
    
})
export {systemRouter}