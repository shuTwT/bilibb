import type { DefaultState, Context } from "koa";
import Router from "koa-router";

const systemRouter = new Router<DefaultState, Context>({ prefix: "/system" });

/** 获取系统管理-用户管理列表 */
systemRouter.post("/user", async (ctx, next) => {
  const body = ctx.request.body as any;
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
        name: "研发部门",
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
        id: 105,
        name: "测试部门",
      },
      remark: "普通用户",
      createTime: 1605456000000,
    },
  ];
  list = list.filter((item) => item.username.includes(body.username ?? ""));
  list = list.filter((item) =>
    String(item.status).includes(String(body.status ?? 1))
  );
  if (body.phone) list = list.filter((item) => item.phone === body.phone);
  if (body.deptId) list = list.filter((item) => item.dept.id === body.deptId);
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
/** 系统管理-用户管理-获取所有角色列表 */
systemRouter.get("/list-all-role", async (ctx, next) => {
  ctx.body = {
    success: true,
    code: 0,
    msg: "ok",
    data: [
      { id: 1, name: "超级管理员" },
      { id: 2, name: "普通角色" },
    ],
  };
});
/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
systemRouter.post("/list-role-ids", async (ctx, next) => {
    const body = ctx.request.body as any
    if (body.userId) {
        if (body.userId == 1) {
          ctx.body= {
            success: true,
            data: [1]
          };
        } else if (body.userId == 2) {
          return {
            success: true,
            data: [2]
          };
        }
      } else {
        ctx.body= {
          success: false,
          data: []
        };
      }
});
/** 获取系统管理-角色管理列表 */
systemRouter.post("/role", async (ctx, next) => {
  const body = ctx.request.body as any;
  let list = [
    {
      createTime: 1605456000000, // 时间戳（毫秒ms）
      updateTime: 1684512000000,
      id: 1,
      name: "超级管理员",
      code: "admin",
      status: 1, // 状态 1 启用 0 停用
      remark: "超级管理员拥有最高权限",
    },
    {
      createTime: 1605456000000,
      updateTime: 1684512000000,
      id: 2,
      name: "普通角色",
      code: "common",
      status: 1,
      remark: "普通角色拥有部分权限",
    },
  ];
  list = list.filter((item) => item.name.includes(body?.name));
  list = list.filter((item) =>
    String(item.status).includes(String(body?.status))
  );
  if (body.code) list = list.filter((item) => item.code === body.code);
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
systemRouter.post("/menu", async (ctx, next) => {
  ctx.body = {
    success: true,
    data: [
      // 外部页面
      {
        parentId: 0,
        id: 100,
        menuType: 0, // 菜单类型（0代表菜单、1代表iframe、2代表外链、3代表按钮）
        title: "menus.hsExternalPage",
        name: "PureIframe",
        path: "/iframe",
        component: "",
        rank: 7,
        redirect: "",
        icon: "ri:links-fill",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 100,
        id: 101,
        menuType: 0,
        title: "menus.hsExternalDoc",
        name: "PureIframeExternal",
        path: "/iframe/external",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 101,
        id: 102,
        menuType: 2,
        title: "menus.externalLink",
        name: "https://yiming_chang.gitee.io/pure-admin-doc",
        path: "/external",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 101,
        id: 103,
        menuType: 2,
        title: "menus.pureutilsLink",
        name: "https://pure-admin-utils.netlify.app/",
        path: "/pureutilsLink",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 100,
        id: 104,
        menuType: 1,
        title: "menus.hsEmbeddedDoc",
        name: "PureIframeEmbedded",
        path: "/iframe/embedded",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 104,
        id: 105,
        menuType: 1,
        title: "menus.hsEpDocument",
        name: "FrameEp",
        path: "/iframe/ep",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "https://element-plus.org/zh-CN/",
        frameLoading: true,
        keepAlive: true,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 104,
        id: 106,
        menuType: 1,
        title: "menus.hsTailwindcssDocument",
        name: "FrameTailwindcss",
        path: "/iframe/tailwindcss",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "https://tailwindcss.com/docs/installation",
        frameLoading: true,
        keepAlive: true,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 104,
        id: 107,
        menuType: 1,
        title: "menus.hsVueDocument",
        name: "FrameVue",
        path: "/iframe/vue3",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "https://cn.vuejs.org/",
        frameLoading: true,
        keepAlive: true,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 104,
        id: 108,
        menuType: 1,
        title: "menus.hsViteDocument",
        name: "FrameVite",
        path: "/iframe/vite",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "https://cn.vitejs.dev/",
        frameLoading: true,
        keepAlive: true,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 104,
        id: 109,
        menuType: 1,
        title: "menus.hsPiniaDocument",
        name: "FramePinia",
        path: "/iframe/pinia",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "https://pinia.vuejs.org/zh/index.html",
        frameLoading: true,
        keepAlive: true,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 104,
        id: 110,
        menuType: 1,
        title: "menus.hsRouterDocument",
        name: "FrameRouter",
        path: "/iframe/vue-router",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "https://router.vuejs.org/zh/",
        frameLoading: true,
        keepAlive: true,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      // 权限管理
      {
        parentId: 0,
        id: 200,
        menuType: 0,
        title: "menus.permission",
        name: "PurePermission",
        path: "/permission",
        component: "",
        rank: 9,
        redirect: "",
        icon: "ep:lollipop",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 200,
        id: 201,
        menuType: 0,
        title: "menus.permissionPage",
        name: "PermissionPage",
        path: "/permission/page/index",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 200,
        id: 202,
        menuType: 0,
        title: "menus.permissionButton",
        name: "PermissionButton",
        path: "/permission/button/index",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 202,
        id: 203,
        menuType: 3,
        title: "添加",
        name: "",
        path: "",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "permission:btn:add",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 202,
        id: 204,
        menuType: 3,
        title: "修改",
        name: "",
        path: "",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "permission:btn:edit",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 202,
        id: 205,
        menuType: 3,
        title: "删除",
        name: "",
        path: "",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "permission:btn:delete",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      // 系统管理
      {
        parentId: 0,
        id: 300,
        menuType: 0,
        title: "menus.hssysManagement",
        name: "PureSystem",
        path: "/system",
        component: "",
        rank: 10,
        redirect: "",
        icon: "ri:settings-3-line",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 300,
        id: 301,
        menuType: 0,
        title: "menus.hsUser",
        name: "SystemUser",
        path: "/system/user/index",
        component: "",
        rank: null,
        redirect: "",
        icon: "ri:admin-line",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 300,
        id: 302,
        menuType: 0,
        title: "menus.hsRole",
        name: "SystemRole",
        path: "/system/role/index",
        component: "",
        rank: null,
        redirect: "",
        icon: "ri:admin-fill",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 300,
        id: 303,
        menuType: 0,
        title: "menus.hsSystemMenu",
        name: "SystemMenu",
        path: "/system/menu/index",
        component: "",
        rank: null,
        redirect: "",
        icon: "ep:menu",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 300,
        id: 304,
        menuType: 0,
        title: "menus.hsDept",
        name: "SystemDept",
        path: "/system/dept/index",
        component: "",
        rank: null,
        redirect: "",
        icon: "ri:git-branch-line",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      // 系统监控
      {
        parentId: 0,
        id: 400,
        menuType: 0,
        title: "menus.hssysMonitor",
        name: "PureMonitor",
        path: "/monitor",
        component: "",
        rank: 11,
        redirect: "",
        icon: "ep:monitor",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 400,
        id: 401,
        menuType: 0,
        title: "menus.hsOnlineUser",
        name: "OnlineUser",
        path: "/monitor/online-user",
        component: "monitor/online/index",
        rank: null,
        redirect: "",
        icon: "ri:user-voice-line",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 400,
        id: 402,
        menuType: 0,
        title: "menus.hsLoginLog",
        name: "LoginLog",
        path: "/monitor/login-logs",
        component: "monitor/logs/login/index",
        rank: null,
        redirect: "",
        icon: "ri:window-line",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 400,
        id: 403,
        menuType: 0,
        title: "menus.hsOperationLog",
        name: "OperationLog",
        path: "/monitor/operation-logs",
        component: "monitor/logs/operation/index",
        rank: null,
        redirect: "",
        icon: "ri:history-fill",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 400,
        id: 404,
        menuType: 0,
        title: "menus.hsSystemLog",
        name: "SystemLog",
        path: "/monitor/system-logs",
        component: "monitor/logs/system/index",
        rank: null,
        redirect: "",
        icon: "ri:file-search-line",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      // 标签页操作
      {
        parentId: 0,
        id: 500,
        menuType: 0,
        title: "menus.hstabs",
        name: "PureTabs",
        path: "/tabs",
        component: "",
        rank: 12,
        redirect: "",
        icon: "ri:bookmark-2-line",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 500,
        id: 501,
        menuType: 0,
        title: "menus.hstabs",
        name: "Tabs",
        path: "/tabs/index",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: true,
        showParent: false,
      },
      {
        parentId: 500,
        id: 502,
        menuType: 0,
        title: "query传参模式",
        name: "TabQueryDetail",
        path: "/tabs/query-detail",
        component: "",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "/tabs/index",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: false,
        showParent: false,
      },
      {
        parentId: 500,
        id: 503,
        menuType: 0,
        title: "params传参模式",
        name: "TabParamsDetail",
        path: "/tabs/params-detail/:id",
        component: "params-detail",
        rank: null,
        redirect: "",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "/tabs/index",
        auths: "",
        frameSrc: "",
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        showLink: false,
        showParent: false,
      },
    ],
  };
});
/** 获取系统管理-部门管理列表 */
systemRouter.post("/dept", async (ctx, next) => {
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
      remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息",
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
      remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息",
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
      remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息",
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
      remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息",
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
      remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息",
    },
    {
      name: "市场部门",
      parentId: 101,
      id: 104,
      sort: 2,
      phone: "15888888888",
      principal: "",
      email: "",
      status: 1,
      type: 3,
      createTime: 1605456000000,
      remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息",
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
      remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息",
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
      remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息",
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
      remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息",
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
      remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息",
    },
  ];
  ctx.body = {
    code: 0,
    msg: "ok",
    count: list.length,
    total: list.length,
    success: true,
    data: list,
  };
});
/** 获取系统监控-在线用户列表 */
systemRouter.post("/online-logs", async (ctx, next) => {
    const body = ctx.request.body as any
    let list = [
        {
          id: 1,
          username: "admin",
          ip: "127.0.0.1",
          address: "中国河南省信阳市",
          system: "macOS",
          browser: "Chrome",
          loginTime: new Date()
        },
        {
          id: 2,
          username: "common",
          ip: "127.0.0.1",
          address: "中国广东省深圳市",
          system: "Windows",
          browser: "Firefox",
          loginTime: new Date()
        }
      ];
      list = list.filter(item => item.username.includes(body?.username));
      ctx.body= {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
});
/** 获取系统监控-登录日志列表 */
systemRouter.post("/login-logs", async (ctx, next) => {
    const body=ctx.request.body as any
    let list = [
        {
          id: 1,
          username: "admin",
          ip: "127.0.0.1",
          address: "中国河南省信阳市",
          system: "macOS",
          browser: "Chrome",
          status: 1, // 登录状态 1 成功 0 失败
          behavior: "账号登录",
          loginTime: new Date()
        },
        {
          id: 2,
          username: "common",
          ip: "127.0.0.1",
          address: "中国广东省深圳市",
          system: "Windows",
          browser: "Firefox",
          status: 0,
          behavior: "第三方登录",
          loginTime: new Date()
        }
      ];
      list = list.filter(item => item.username.includes(body?.username));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
      ctx.body= {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
});
/** 获取系统监控-操作日志列表 */
systemRouter.post("/operation-logs", async (ctx, next) => {
    const body= ctx.request.body as any
    let list = [
        {
          id: 1,
          username: "admin",
          ip: "127.0.0.1",
          address: "中国河南省信阳市",
          system: "macOS",
          browser: "Chrome",
          status: 1, // 操作状态 1 成功 0 失败
          summary: "菜单管理-添加菜单", // 操作概要
          module: "系统管理", // 所属模块
          operatingTime: new Date() // 操作时间
        },
        {
          id: 2,
          username: "common",
          ip: "127.0.0.1",
          address: "中国广东省深圳市",
          system: "Windows",
          browser: "Firefox",
          status: 0,
          summary: "列表分页查询",
          module: "在线用户",
          operatingTime: new Date()
        }
      ];
      list = list.filter(item => item.module.includes(body?.module));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
        ctx.body={
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
});
/** 获取系统监控-系统日志列表 */
systemRouter.post("/system-logs", async (ctx, next) => {
    const body = ctx.request.body as any
    let list = [
        {
          id: 1, // 日志ID
          /**
           * 日志级别
           * 0 debug调试（最低级别的日志，用于调试和开发阶段）
           * 1 info信息（默认级别，用于记录一般的信息）
           * 2 warn警告（表示可能出现的问题或潜在的错误，但不会影响系统的正常运行）
           * 3 error错误（表示发生了错误，但不会导致系统崩溃）
           * 4 fatal致命（最高级别的日志，表示发生了严重错误，导致系统无法继续运行）
           */
          level: 1,
          module: "菜单管理", // 所属模块
          url: "/menu", // 请求接口
          method: "post", // 请求方法
          ip: "127.0.0.1",
          address: "中国河南省信阳市",
          system: "macOS",
          browser: "Chrome",
          /**
           * 请求耗时（单位：ms 毫秒）
           * 正常耗时：一般认为在几百毫秒（0.1-0.5秒）范围内的请求耗时较为正常
           * 较慢耗时：在1秒以上的耗时可以被认为是较慢的请求，但具体是否较慢还需要根据具体业务场景和性能要求来判断
           */
          takesTime: 10,
          requestTime: new Date() // 请求时间
        },
        {
          id: 2,
          level: 0,
          module: "地图",
          url: "/get-map-info",
          method: "get",
          ip: "127.0.0.1",
          address: "中国广东省深圳市",
          system: "Windows",
          browser: "Firefox",
          takesTime: 1200,
          requestTime: new Date()
        }
      ];
      list = list.filter(item => item.module.includes(body?.module));
      ctx.body={
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
});
/** 获取系统监控-系统日志-根据 id 查日志详情 */
systemRouter.post("/system-logs-detail", async (ctx, next) => {
    const body=ctx.request.body as any
    if (body.id == 1) {
        return {
          id: 1,
          level: 1,
          module: "菜单管理",
          url: "/menu",
          method: "post",
          ip: "127.0.0.1",
          address: "中国河南省信阳市",
          system: "macOS",
          browser: "Chrome",
          takesTime: 10,
          responseHeaders: {
            traceId: "1495502411171032",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            "Keep-Alive": "timeout=5",
            "Content-Length": 17019
          },
          responseBody: {
            success: true,
            data: [
              {
                parentId: 0,
                id: 400,
                menuType: 0,
                title: "menus.hssysMonitor",
                name: "PureMonitor",
                path: "/monitor",
                component: "",
                rank: 11,
                redirect: "",
                icon: "ep:monitor",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 401,
                menuType: 0,
                title: "menus.hsOnlineUser",
                name: "OnlineUser",
                path: "/monitor/online-user",
                component: "monitor/online/index",
                rank: null,
                redirect: "",
                icon: "ri:user-voice-line",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 402,
                menuType: 0,
                title: "menus.hsLoginLog",
                name: "LoginLog",
                path: "/monitor/login-logs",
                component: "monitor/logs/login/index",
                rank: null,
                redirect: "",
                icon: "ri:window-line",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 403,
                menuType: 0,
                title: "menus.hsOperationLog",
                name: "OperationLog",
                path: "/monitor/operation-logs",
                component: "monitor/logs/operation/index",
                rank: null,
                redirect: "",
                icon: "ri:history-fill",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 404,
                menuType: 0,
                title: "menus.hsSystemLog",
                name: "SystemLog",
                path: "/monitor/system-logs",
                component: "monitor/logs/system/index",
                rank: null,
                redirect: "",
                icon: "ri:file-search-line",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                showLink: true,
                showParent: false
              }
            ]
          },
          requestHeaders: {
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,eo;q=0.7",
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.admin",
            Connection: "keep-alive",
            "Content-Length": 0,
            Cookie:
              "_ga=GA1.1.231800979.1704562367; _ga_M74ZHEQ1M1=GS1.1.1709299375.7.1.1709299476.0.0.0; Hm_lvt_6a7dac00248d3b6ad8479d7249bb29c5=1709032753,1709359575; Hm_lvt_23a157b7d0d9867f7a51e42628f052f5=1708960489,1709485849,1709879672; authorized-token={%22accessToken%22:%22eyJhbGciOiJIUzUxMiJ9.admin%22%2C%22expires%22:1919520000000}; multiple-tabs=true",
            Host: "192.168.2.121:8848",
            Origin: "http://192.168.2.121:8848",
            Referer: "http://192.168.2.121:8848/",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
          },
          requestBody: {
            title: "系统监控"
          },
          traceId: "1495502411171032",
          requestTime: new Date()
        };
      } else if (body.id == 2) {
        return {
          id: 2,
          level: 0,
          module: "地图",
          url: "/get-map-info?plateNumber=豫A59778U",
          method: "get",
          ip: "127.0.0.1",
          address: "中国广东省深圳市",
          system: "Windows",
          browser: "Firefox",
          takesTime: 1200,
          responseHeaders: {
            traceId: "2280443117103208",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            "Keep-Alive": "timeout=5",
            "Content-Length": 28693
          },
          responseBody: {
            plateNumber: "豫A59778U",
            driver: "子骞",
            orientation: 289,
            lng: 113.8564,
            lat: 34.373
          },
          requestHeaders: {
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,eo;q=0.7",
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.admin",
            Connection: "keep-alive",
            "Content-Length": 0,
            Cookie:
              "_ga=GA1.1.231800979.1704562367; _ga_M74ZHEQ1M1=GS1.1.1709299375.7.1.1709299476.0.0.0; Hm_lvt_6a7dac00248d3b6ad8479d7249bb29c5=1709032753,1709359575; Hm_lvt_23a157b7d0d9867f7a51e42628f052f5=1708960489,1709485849,1709879672; authorized-token={%22accessToken%22:%22eyJhbGciOiJIUzUxMiJ9.admin%22%2C%22expires%22:1919520000000}; multiple-tabs=true",
            Host: "192.168.2.121:8848",
            Origin: "http://192.168.2.121:8848",
            Referer: "http://192.168.2.121:8848/",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
          },
          requestBody: null,
          traceId: "2280443117103208",
          requestTime: new Date()
        };
      }
});
/** 获取角色管理-权限-菜单权限 */
systemRouter.post("/role-menu", async (ctx, next) => {
  ctx.body = {
    success: true,
    data: [
      {
        parentId: 0,
        id: 100,
        menuType: 0, // 菜单类型（0代表菜单、1代表iframe、2代表外链、3代表按钮）
        title: "menus.hsExternalPage",
      },
      {
        parentId: 100,
        id: 101,
        menuType: 0,
        title: "menus.hsExternalDoc",
      },
      {
        parentId: 101,
        id: 102,
        menuType: 2,
        title: "menus.externalLink",
      },
      {
        parentId: 101,
        id: 103,
        menuType: 2,
        title: "menus.pureutilsLink",
      },
      {
        parentId: 100,
        id: 104,
        menuType: 1,
        title: "menus.hsEmbeddedDoc",
      },
      {
        parentId: 104,
        id: 105,
        menuType: 1,
        title: "menus.hsEpDocument",
      },
      {
        parentId: 104,
        id: 106,
        menuType: 1,
        title: "menus.hsTailwindcssDocument",
      },
      {
        parentId: 104,
        id: 107,
        menuType: 1,
        title: "menus.hsVueDocument",
      },
      {
        parentId: 104,
        id: 108,
        menuType: 1,
        title: "menus.hsViteDocument",
      },
      {
        parentId: 104,
        id: 109,
        menuType: 1,
        title: "menus.hsPiniaDocument",
      },
      {
        parentId: 104,
        id: 110,
        menuType: 1,
        title: "menus.hsRouterDocument",
      },
      // 权限管理
      {
        parentId: 0,
        id: 200,
        menuType: 0,
        title: "menus.permission",
      },
      {
        parentId: 200,
        id: 201,
        menuType: 0,
        title: "menus.permissionPage",
      },
      {
        parentId: 200,
        id: 202,
        menuType: 0,
        title: "menus.permissionButton",
      },
      {
        parentId: 202,
        id: 203,
        menuType: 3,
        title: "添加",
      },
      {
        parentId: 202,
        id: 204,
        menuType: 3,
        title: "修改",
      },
      {
        parentId: 202,
        id: 205,
        menuType: 3,
        title: "删除",
      },
      // 系统管理
      {
        parentId: 0,
        id: 300,
        menuType: 0,
        title: "menus.hssysManagement",
      },
      {
        parentId: 300,
        id: 301,
        menuType: 0,
        title: "menus.hsUser",
      },
      {
        parentId: 300,
        id: 302,
        menuType: 0,
        title: "menus.hsRole",
      },
      {
        parentId: 300,
        id: 303,
        menuType: 0,
        title: "menus.hsSystemMenu",
      },
      {
        parentId: 300,
        id: 304,
        menuType: 0,
        title: "menus.hsDept",
      },
      // 系统监控
      {
        parentId: 0,
        id: 400,
        menuType: 0,
        title: "menus.hssysMonitor",
      },
      {
        parentId: 400,
        id: 401,
        menuType: 0,
        title: "menus.hsOnlineUser",
      },
      {
        parentId: 400,
        id: 402,
        menuType: 0,
        title: "menus.hsLoginLog",
      },
      {
        parentId: 400,
        id: 403,
        menuType: 0,
        title: "menus.hsOperationLog",
      },
      {
        parentId: 400,
        id: 404,
        menuType: 0,
        title: "menus.hsSystemLog",
      },
      // 标签页操作
      {
        parentId: 0,
        id: 500,
        menuType: 0,
        title: "menus.hstabs",
      },
      {
        parentId: 500,
        id: 501,
        menuType: 0,
        title: "menus.hstabs",
      },
      {
        parentId: 500,
        id: 502,
        menuType: 0,
        title: "query传参模式",
      },
      {
        parentId: 500,
        id: 503,
        menuType: 0,
        title: "params传参模式",
      },
    ],
  };
});
/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
systemRouter.post("/role-menu-ids", async (ctx, next) => {
  const body = ctx.request.body as any;
  if (body.id == 1) {
    ctx.body= {
      success: true,
      data: [
        100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 200, 201, 202,
        203, 204, 205, 300, 301, 302, 303, 304, 400, 401, 402, 403, 404, 500,
        501, 502, 503,
      ],
    };
  } else if (body.id == 2) {
    ctx.body= {
      success: true,
      data: [
        100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 404, 500, 501,
        502, 503,
      ],
    };
  }
});
export { systemRouter };
