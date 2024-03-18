import type { DefaultState, Context } from "koa";
import Router from "koa-router";

const systemRouter = new Router<DefaultState, Context>({prefix:'/system'});

/** 获取系统管理-用户管理列表 */
systemRouter.post('/user',async(ctx,next)=>{
    const body = ctx.request.body as any
    let list = [
        {
          username: "admin",
          nickname: "admin",
          avatar: "https://avatars.githubusercontent.com/u/44761321",
          phone: "15888886789",
          email: "",
          sex: 0,
          id: 1,
          status: 1,
          dept: {
            // 部门id
            id: 103,
            // 部门名称
            name: "研发部门"
          },
          remark: "管理员",
          createTime: 1605456000000
        },
        {
          username: "common",
          nickname: "common",
          avatar: "https://avatars.githubusercontent.com/u/52823142",
          phone: "18288882345",
          email: "",
          sex: 1,
          id: 2,
          status: 1,
          dept: {
            id: 105,
            name: "测试部门"
          },
          remark: "普通用户",
          createTime: 1605456000000
        }
      ];
      list = list.filter(item => item.username.includes(body.username??''));
      list = list.filter(item =>
        String(item.status).includes(String(body.status??1))
      );
      if (body.phone) list = list.filter(item => item.phone === body.phone);
      if (body.deptId) list = list.filter(item => item.dept.id === body.deptId);
      ctx.body={
        code:0,
        msg:"success",
        success: true,
        count:list.length,
        total: list.length, // 总条目数
        currentPage: 1 ,// 当前页数
        data: list,
      }

})
/** 系统管理-用户管理-获取所有角色列表 */
systemRouter.post('/list-all-role',async(ctx,next)=>{
    ctx.body={
        code:0,
        msg:'ok',
        data:[
            { id: 1, name: "超级管理员" },
            { id: 2, name: "普通角色" }
        ]
    }
})
/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
systemRouter.post('/list-role-ids',async(ctx,next)=>{
    
})
/** 获取系统管理-角色管理列表 */
systemRouter.post('/role',async(ctx,next)=>{
    const body = ctx.request.body as any
    let list = [
        {
            createTime: 1605456000000, // 时间戳（毫秒ms）
            updateTime: 1684512000000,
            id: 1,
            name: "超级管理员",
            code: "admin",
            status: 1, // 状态 1 启用 0 停用
            remark: "超级管理员拥有最高权限"
          },
          {
            createTime: 1605456000000,
            updateTime: 1684512000000,
            id: 2,
            name: "普通角色",
            code: "common",
            status: 1,
            remark: "普通角色拥有部分权限"
          }
    ]
    list = list.filter(item => item.name.includes(body.name??""));
    list = list.filter(item =>
      String(item.status).includes(String(body.status??1))
    );
    if (body.code) list = list.filter(item => item.code === body.code);
    ctx.body={
        code:0,
        msg:"ok",
        count:list.length,
        data:list
    }
})
/** 获取系统管理-菜单管理列表 */
systemRouter.post('/menu',async(ctx,next)=>{
    
})
/** 获取系统管理-部门管理列表 */
systemRouter.post('/dept',async(ctx,next)=>{
    const list = [
        {
          name: "杭州总公司",
          parentId: 0,
          id: 100,
          sort: 0,
          phone: "15888888888",
          principal: "",
          email: "",
          status: 1, // 状态 1 启用 0 停用
          type: 1, // 1 公司 2 分公司 3 部门
          createTime: 1605456000000,
          remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
        },
        {
          name: "郑州分公司",
          parentId: 100,
          id: 101,
          sort: 1,
          phone: "15888888888",
          principal: "",
          email: "",
          status: 1,
          type: 2,
          createTime: 1605456000000,
          remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
        },
        {
          name: "研发部门",
          parentId: 101,
          id: 103,
          sort: 1,
          phone: "15888888888",
          principal: "",
          email: "",
          status: 1,
          type: 3,
          createTime: 1605456000000,
          remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
        },
        {
          name: "市场部门",
          parentId: 102,
          id: 108,
          sort: 1,
          phone: "15888888888",
          principal: "",
          email: "",
          status: 1,
          type: 3,
          createTime: 1605456000000,
          remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
        },
        {
          name: "深圳分公司",
          parentId: 100,
          id: 102,
          sort: 2,
          phone: "15888888888",
          principal: "",
          email: "",
          status: 1,
          type: 2,
          createTime: 1605456000000,
          remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
        },
        {
          name: "市场部门",
          parentId: 101,
          id: 104,
          sort: 2,
          phone: "15888888888",
          principal:"",
          email: "",
          status: 1,
          type: 3,
          createTime: 1605456000000,
          remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
        },
        {
          name: "财务部门",
          parentId: 102,
          id: 109,
          sort: 2,
          phone: "15888888888",
          principal: "",
          email: "",
          status: 1,
          type: 3,
          createTime: 1605456000000,
          remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
        },
        {
          name: "测试部门",
          parentId: 101,
          id: 105,
          sort: 3,
          phone: "15888888888",
          principal: "",
          email: "",
          status: 0,
          type: 3,
          createTime: 1605456000000,
          remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
        },
        {
          name: "财务部门",
          parentId: 101,
          id: 106,
          sort: 4,
          phone: "15888888888",
          principal: "",
          email: "",
          status: 1,
          type: 3,
          createTime: 1605456000000,
          remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
        },
        {
          name: "运维部门",
          parentId: 101,
          id: 107,
          sort: 5,
          phone: "15888888888",
          principal: "",
          email: "",
          status: 0,
          type: 3,
          createTime: 1605456000000,
          remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
        }
      ]
      ctx.body={
        code:0,
        msg:'ok',
        count:list.length,
        total:list.length,
        success:true,
        data:list
      }
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