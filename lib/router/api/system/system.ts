import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import prisma from "../../../utils/prisma";
import { parseQuery, str2num } from "../utils";
import dayjs from "dayjs";

const systemRouter = new Router<DefaultState, Context>({ prefix: "/system" });

/** 获取系统管理-用户管理列表 */
systemRouter.get("/user", async (ctx, next) => {
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
      status: 1,
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
      status: 1,
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
systemRouter.post("/user", async (ctx, next) => {
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
systemRouter.put("/user/:userId", async (ctx, next) => {
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
systemRouter.put('/user/:userId/status', async (ctx, next) => {
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
systemRouter.delete("/user/:userId", async (ctx, next) => {
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

/** 系统管理-用户管理-获取所有角色列表 */
systemRouter.get("/list-all-role", async (ctx, next) => {
  const roles = await prisma.sysRole.findMany({
    select: {
      roleId: true,
      roleName: true,
    },
  });

  ctx.body = {
    success: true,
    msg: "ok",
    data: roles.map((item) => ({ id: item.roleId, name: item.roleName })),
  };

});
/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
systemRouter.post("/list-role-ids", async (ctx, next) => {
  const body = ctx.request.body as any;
  if (body.userId) {
    if (body.userId == 1) {
      ctx.body = {
        success: true,
        data: [1],
      };
    } else if (body.userId == 2) {
      return {
        success: true,
        data: [2],
      };
    }
  } else {
    ctx.body = {
      success: false,
      data: [],
    };
  }
});

/** 获取系统管理-角色管理列表 */
systemRouter.get("/role", async (ctx, next) => {
  const body = ctx.request.body as any;
  const query = ctx.query;
  const roleName = parseQuery(query, "name");
  const status = str2num(parseQuery(query, "name"), void 0, { min: 1 });
  const code = parseQuery(query, "name");
  let list = await prisma.sysRole.findMany({
    where: {
      roleName: {
        contains: roleName,
      },
      status: status,
      roleKey: code,
    },
  });
  list = list.map((item) => ({
    ...item,
    id: item.roleId,
    name: item.roleName,
    code: item.roleKey,
  }));
  ctx.body = {
    msg: "ok",
    data: {
      list,
      total: list.length,
      pageSize: 10,
      currentPage: 1,
    },
  };
});

/** 获取系统管理-菜单管理列表 */
systemRouter.get("/menu", async (ctx, next) => {
  let menus = await prisma.sysMenu.findMany()
  menus = menus.map((item) => ({
    ...item,
    id: item.menuId
  }))
  ctx.body = {
    success: true,
    data: menus
  };
});

/** 新增菜单 */
systemRouter.post("/menu", async (ctx, next) => {
  const body = ctx.request.body as any
  try {
    await prisma.sysMenu.create({
      data: {
        activePath: body.activePath,
        auths: body.auths,
        component: body.component,
        enterTransition: body.enterTransition,
        extraIcon: body.extraIcon,
        frameLoading: body.frameLoading,
        frameSrc: body.frameSrc,
        hiddenTag: body.hiddenTag,
        icon: body.icon,
        keepAlive: body.keepAlive,
        leaveTransition: body.leaveTransition,
        menuType: body.menuType,
        menuName: body.menuName,
        parentId: body.parentId,
        path: body.path,
        rank: body.rank,
        redirect: body.redirect,
        showLink: body.showLink,
        showParent: body.showParent,
        title: body.title
      }
    })
    ctx.body = {
      success: true,
      msg: "新增成功"
    }
  } catch (error) {
    ctx.body = {
      success: false,
      msg: "新增失败"
    }
  }
})

/** 更新菜单 */
systemRouter.put("/menu/:menuId", async (ctx, next) => {
  const menuId = ctx.params['menuId']
  const body = ctx.request.body as any
  try {
    await prisma.sysMenu.update({
      where: {
        menuId: Number(menuId),
      },
      data: {
        activePath: body.activePath,
        auths: body.auths,
        component: body.component,
        enterTransition: body.enterTransition,
        extraIcon: body.extraIcon,
        frameLoading: body.frameLoading,
        frameSrc: body.frameSrc,
        hiddenTag: body.hiddenTag,
        icon: body.icon,
        keepAlive: body.keepAlive,
        leaveTransition: body.leaveTransition,
        menuType: body.menuType,
        menuName: body.menuName,
        parentId: body.parentId,
        path: body.path,
        rank: body.rank,
        redirect: body.redirect,
        showLink: body.showLink,
        showParent: body.showParent,
        title: body.title
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

/** 递归删除子菜单 */
async function deleteMenuChildren(pid: number) {
  const menus = await prisma.sysMenu.findMany(
    {
      where: {
        parentId: pid
      },
    }
  )
  if (menus.length > 0) {
    menus.forEach((item) => {
      deleteMenuChildren(item.menuId)
    })
  }
  await prisma.sysMenu.deleteMany({
    where: {
      menuId:pid
    }
  })
}

/** 删除菜单 */
systemRouter.delete("/menu/:menuId", async (ctx, next) => {
  const menuId = ctx.params['menuId']
  try {
    await prisma.sysMenu.delete({
      where: {
        menuId: Number(menuId)
      }
    })
    await deleteMenuChildren(Number(menuId))
    ctx.body = {
      success: true,
      msg: "删除" + menuId
    }
  } catch (error) {
    ctx.body = {
      success: false,
      msg: "删除失败"
    }
  }

})

/** 获取系统管理-部门管理列表 */
systemRouter.get("/dept", async (ctx, next) => {
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

/** 获取角色管理-权限-菜单权限 */
systemRouter.get("/role-menu", async (ctx, next) => {
  let menus = await prisma.sysMenu.findMany({
    select: {
      parentId: true,
      menuId: true,
      title: true,
      menuType: true
    }
  })
  const data = menus.map(item => ({
    parentId: item.parentId,
    menuType: item.menuType,
    title: item.title,
    id: item.menuId,
  }))
  ctx.body = {
    success: true,
    data: data
  }
});

/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
systemRouter.post("/role-menu-ids", async (ctx, next) => {
  const body = ctx.request.body as any;
  const menus = await prisma.sysRoleMenu.findMany({
    where: {
      roleId: Number(body.id)
    },
    select: {
      menuId: true
    }
  })
  ctx.body = {
    success: true,
    data: menus.map(item => item.menuId)
  }
});
export { systemRouter };
