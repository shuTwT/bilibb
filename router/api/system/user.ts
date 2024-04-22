import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import prisma from "../../../utils/prisma";
import { parseQuery, str2num } from "../utils";
import dayjs from "dayjs";

const userRouter = new Router<DefaultState, Context>({ prefix: "/user" });

/** 获取系统管理-用户管理列表 */
userRouter.get("/", async (ctx, next) => {
  const query = ctx.query as any;
  const username = parseQuery(query, "username");
  const status = parseQuery(query, "status");
  const phone = parseQuery(query, "phone");
  const deptId = str2num(parseQuery(query, "deptId"), void 0);
  const pageSize = str2num(parseQuery(query, "pageSize"), 10);
  const pageNum = str2num(parseQuery(query, "pageNum"), 1);
  try {
    const [list, count] = await prisma.$transaction([
      prisma.sysUser.findMany({
        where: {
          userName: username,
          status: status,
          phonenumber: phone,
          deptId: deptId,
        },
        include: {
          dept: true,
        },
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createTime: "desc",
        },
      }),
      prisma.sysUser.count({
        where: {
          userName: username,
          status: status,
          phonenumber: phone,
          deptId: deptId,
        },
      }),
    ]);
    ctx.body = {
      code: 200,
      msg: "success",
      data: {
        list,
        total: count,
        pageSize: pageSize,
        currentPage: pageNum,
      },
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: String(error),
    };
  }
});

/** 新增用户 */
userRouter.post("/", async (ctx, next) => {
  const body = ctx.request.body as any;
  const date = dayjs()
  const loginUser= ctx.getLoginUser()
  try {
    await prisma.sysUser.create({
      data: {
        userName:body.userName,
        nickName:body.nickName,
        email:body.email,
        deptId:Number(body.parentId),
        password:body.password,
        phonenumber:body.phonenumber,
        createBy:loginUser.getUserName(),
        createTime:date.format('YYYY-MM-DD HH:mm:ss'),
        remark:body.remark
      },
    });
    ctx.body = {
      success: true,
      msg: "新增成功",
    };
  } catch (error) {
    ctx.body = {
      success: false,
      msg: error,
    };
  }
});

/** 修改用户 */
userRouter.put("/:userId", async (ctx, next) => {
  const userId = ctx.params["userId"];
  const body = ctx.request.body as any;
  const date = dayjs()
  const loginUser= ctx.getLoginUser()
  try {
    await prisma.sysUser.update({
      where: {
        userId: Number(userId),
      },
      data: {
        userName:body.userName,
        nickName:body.nickName,
        email:body.email,
        deptId:Number(body.parentId),
        password:body.password,
        phonenumber:body.phonenumber,
        updateBy:loginUser.getUserName(),
        updateTime:date.format('YYYY-MM-DD HH:mm:ss'),
        remark:body.remark
    },
    });
    ctx.body = {
      success: true,
      msg: "修改成功",
    };
  } catch (error) {
    ctx.body = {
      success: false,
      msg: error,
    };
  }
});

/** 修改用户状态 */
userRouter.put("/:userId/status", async (ctx, next) => {
  const userId = ctx.params["userId"];
  const body = ctx.request.body as any;
  try {
    await prisma.sysUser.update({
      where: {
        userId: Number(userId),
      },
      data: {
        status: body.state,
      },
    });
    ctx.body = {
      success: true,
      msg: "修改成功",
    };
  } catch (error) {
    ctx.body = {
      success: false,
      msg: error,
    };
  }
});

/** 删除用户 */
userRouter.delete("/:userId", async (ctx, next) => {
  const userId = ctx.params["userId"];
  const body = ctx.request.body as any;
  try {
    await prisma.sysUser.update({
      where: {
        userId: Number(userId),
      },
      data: {
        delFlag: true,
      },
    });
    ctx.body = {
      success: true,
      msg: "删除成功",
    };
  } catch (error) {
    ctx.body = {
      success: false,
      msg: error,
    };
  }
});

export { userRouter };
