import { SysMenu } from "@prisma/client";

export function seedMenus(datetime: string) {
  const menus = [
    // 系统管理
    {
      parentId: 0,
      menuId: 300,
      menuType: 0,
      title: "系统管理",
      menuName: "PureSystem",
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
      createBy: "admin",
      createTime: datetime,
    },
    {
      parentId: 300,
      menuId: 301,
      menuType: 0,
      title: "用户管理",
      menuName: "SystemUser",
      path: "/system/user/index",
      component: "system/user/index",
      rank: 99,
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
      createBy: "admin",
      createTime: datetime,
    },
    {
      parentId: 300,
      menuId: 302,
      menuType: 0,
      title: "角色管理",
      menuName: "SystemRole",
      path: "/system/role/index",
      component: "system/role/index",
      rank: 99,
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
      createBy: "admin",
      createTime: datetime,
    },
    {
      parentId: 300,
      menuId: 303,
      menuType: 0,
      title: "菜单管理",
      menuName: "SystemMenu",
      path: "/system/menu/index",
      component: "system/menu/index",
      rank: 99,
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
      createBy: "admin",
      createTime: datetime,
    },
    {
      parentId: 300,
      menuId: 304,
      menuType: 0,
      title: "部门管理",
      menuName: "SystemDept",
      path: "/system/dept/index",
      component: "system/dept/index",
      rank: 99,
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
      createBy: "admin",
      createTime: datetime,
    },
    // 系统监控
    {
      parentId: 0,
      menuId: 400,
      menuType: 0,
      title: "系统监控",
      menuName: "PureMonitor",
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
      createBy: "admin",
      createTime: datetime,
    },
    {
      parentId: 400,
      menuId: 401,
      menuType: 0,
      title: "在线用户",
      menuName: "OnlineUser",
      path: "/monitor/online-user",
      component: "monitor/online/index",
      rank: 99,
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
      createBy: "admin",
      createTime: datetime,
    },
    {
      parentId: 400,
      menuId: 402,
      menuType: 0,
      title: "登陆日志",
      menuName: "LoginLog",
      path: "/monitor/login-logs",
      component: "monitor/logs/login/index",
      rank: 99,
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
      createBy: "admin",
      createTime: datetime,
    },
    {
      parentId: 400,
      menuId: 403,
      menuType: 0,
      title: "操作日志",
      menuName: "OperationLog",
      path: "/monitor/operation-logs",
      component: "monitor/logs/operation/index",
      rank: 99,
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
      createBy: "admin",
      createTime: datetime,
    },
    {
      parentId: 400,
      menuId: 404,
      menuType: 0,
      title: "系统日志",
      menuName: "SystemLog",
      path: "/monitor/system-logs",
      component: "monitor/logs/system/index",
      rank: 99,
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
      createBy: "admin",
      createTime: datetime,
    },
    {
      menuId: 405,
      parentId: 300,
      menuType: 0,
      title: "通知公告",
      menuName: "SystemNotice",
      path: "/system/notice/index",
      component: "system/notice/index",
      rank: 99,
      redirect: "",
      icon: "ep:postcard",
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
      status: "0",
      createBy: "admin",
      createTime: datetime,
    },
    {
      menuId: 406,
      parentId: 300,
      menuType: 0,
      title: "字典管理",
      menuName: "SystemDict",
      path: "/system/dict/index",
      component: "system/dict/index",
      rank: 99,
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
      status: "0",
      createBy: "admin",
      createTime: datetime,
    },
    {
      menuId: 407,
      parentId: 300,
      menuType: 0,
      title: "字典数据",
      menuName: "SystemDictData",
      path: "/system/dict-data/index/:dictType",
      component: "system/dictData/index",
      rank: 99,
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
      showLink: false,
      showParent: false,
      status: "0",
      createBy: "admin",
      createTime: datetime,
    },
    {
      menuId: 408,
      parentId: 300,
      menuType: 0,
      title: "参数配置",
      menuName: "SystemConfig",
      path: "/system/config/index",
      component: "system/config/index",
      rank: 99,
      redirect: "",
      icon: "ep:setting",
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
      status: "1",
      createBy: "admin",
      createTime: datetime,
    },
  ] as SysMenu[];
  return menus;
}
