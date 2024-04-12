import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import prisma from "../../../utils/prisma";
import { parseQuery, str2num } from "../utils";
import dayjs from "dayjs";

const deptRouter = new Router<DefaultState, Context>({ prefix: "/dept" });

/** 获取系统管理-部门管理列表 */
deptRouter.get("/", async (ctx, next) => {
    let depts = await prisma.sysDept.findMany();
    depts = depts.map((item) => ({
      ...item,
      id: item.deptId,
      name: item.deptName,
      principal: item.leader,
    }));
    ctx.body = {
      code: 0,
      msg: "ok",
      count: depts.length,
      total: depts.length,
      success: true,
      data: depts,
    };
  });

export {deptRouter}