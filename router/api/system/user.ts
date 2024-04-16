import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import prisma from "../../../utils/prisma";
import { parseQuery, str2num } from "../utils";
import dayjs from "dayjs";

const userRouter = new Router<DefaultState, Context>({ prefix: "/user" });

/** 获取系统管理-用户管理列表 */
userRouter.get("/", async (ctx, next) => {
    const query = ctx.query as any;
    let list = [
      {
        username: "admin",
        nickname: "admin",
        avatar: "https://avatars.githubusercontent.com/u/44761321",
        phone: "15888886789",
        email: "",
        sex: 0,
        id: 1,
        status: "0",
        dept: {
          // 部门id
          id: 100,
          // 部门名称
          name: "若依科技",
        },
        remark: "管理员",
        createTime: 1605456000000,
      },
      {
        username: "common",
        nickname: "common",
        avatar: "https://avatars.githubusercontent.com/u/52823142",
        phone: "18288882345",
        email: "",
        sex: 1,
        id: 2,
        status: "0",
        dept: {
          id: 101,
          name: "深圳总公司",
        },
        remark: "普通用户",
        createTime: 1605456000000,
      },
    ];
    list = list.filter((item) => item.username.includes(query.username ?? ""));
    list = list.filter((item) =>
      String(item.status).includes(String(query.status ?? 1))
    );
    if (query.phone) list = list.filter((item) => item.phone === query.phone);
    if (query.deptId) list = list.filter((item) => item.dept.id === query.deptId);
    ctx.body = {
      msg: "success",
      success: true,
      data: {
        list,
        total: list.length,
        pageSize: 10,
        currentPage: 1,
      },
    };
  });
  
  /** 新增用户 */
  userRouter.post("/", async (ctx, next) => {
    const body = ctx.request.body as any
    try {
      await prisma.sysUser.create({
        data: body
      })
      ctx.body = {
        success: true,
        msg: "新增成功"
      }
    } catch (error) {
      ctx.body = {
        success: false,
        msg: error
      }
    }
  })
  
  /** 修改用户 */
  userRouter.put("/:userId", async (ctx, next) => {
    const userId = ctx.params['userId']
    const body = ctx.request.body as any
    try {
      await prisma.sysUser.update({
        where: {
          userId: Number(userId),
        },
        data: body
      })
      ctx.body = {
        success: true,
        msg: "修改成功"
      }
    } catch (error) {
      ctx.body = {
        success: false,
        msg: error
      }
    }
  })
  
  /** 修改用户状态 */
  userRouter.put('/:userId/status', async (ctx, next) => {
    const userId = ctx.params['userId']
    const body = ctx.request.body as any
    try {
      await prisma.sysUser.update({
        where: {
          userId: Number(userId),
        },
        data: {
          status: body.state
        }
      })
      ctx.body = {
        success: true,
        msg: "修改成功"
      }
    } catch (error) {
      ctx.body = {
        success: false,
        msg: error
      }
    }
  })
  
  /** 删除用户 */
  userRouter.delete("/:userId", async (ctx, next) => {
    const userId = ctx.params['userId']
    const body = ctx.request.body as any
    try {
      await prisma.sysUser.update({
        where: {
          userId: Number(userId),
        },
        data: {
          delFlag: true
        }
      })
      ctx.body = {
        success: true,
        msg: "删除成功"
      }
    } catch (error) {
      ctx.body = {
        success: false,
        msg: error
      }
    }
  })

export {userRouter}