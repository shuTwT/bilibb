import type { DefaultState, Context } from "koa";
import Router from "koa-router";
import { system, monitor, permission, frame, tabs } from "../../utils/enums";
import prisma from "../../utils/prisma";

const asyncRoutesRouter = new Router<DefaultState, Context>();

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const systemManagementRouter = {
  path: "/system",
  meta: {
    icon: "ri:settings-3-line",
    title: "menus.hssysManagement",
    rank: system,
  },
  children: [
    {
      path: "/system/user/index",
      name: "SystemUser",
      meta: {
        icon: "ri:admin-line",
        title: "menus.hsUser",
        roles: ["admin"],
      },
    },
    {
      path: "/system/role/index",
      name: "SystemRole",
      meta: {
        icon: "ri:admin-fill",
        title: "menus.hsRole",
        roles: ["admin"],
      },
    },
    {
      path: "/system/menu/index",
      name: "SystemMenu",
      meta: {
        icon: "ep:menu",
        title: "menus.hsSystemMenu",
        roles: ["admin"],
      },
    },
    {
      path: "/system/dept/index",
      name: "SystemDept",
      meta: {
        icon: "ri:git-branch-line",
        title: "menus.hsDept",
        roles: ["admin"],
      },
    },
  ],
};

const systemMonitorRouter = {
  path: "/monitor",
  meta: {
    icon: "ep:monitor",
    title: "menus.hssysMonitor",
    rank: monitor,
  },
  children: [
    {
      path: "/monitor/online-user",
      component: "monitor/online/index",
      name: "OnlineUser",
      meta: {
        icon: "ri:user-voice-line",
        title: "menus.hsOnlineUser",
        roles: ["admin"],
      },
    },
    {
      path: "/monitor/login-logs",
      component: "monitor/logs/login/index",
      name: "LoginLog",
      meta: {
        icon: "ri:window-line",
        title: "menus.hsLoginLog",
        roles: ["admin"],
      },
    },
    {
      path: "/monitor/operation-logs",
      component: "monitor/logs/operation/index",
      name: "OperationLog",
      meta: {
        icon: "ri:history-fill",
        title: "menus.hsOperationLog",
        roles: ["admin"],
      },
    },
    {
      path: "/monitor/system-logs",
      component: "monitor/logs/system/index",
      name: "SystemLog",
      meta: {
        icon: "ri:file-search-line",
        title: "menus.hsSystemLog",
        roles: ["admin"],
      },
    },
  ],
};

const permissionRouter = {
  path: "/permission",
  meta: {
    title: "menus.permission",
    icon: "ep:lollipop",
    rank: permission,
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "menus.permissionPage",
        roles: ["admin", "common"],
      },
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "menus.permissionButton",
        roles: ["admin", "common"],
        auths: [
          "permission:btn:add",
          "permission:btn:edit",
          "permission:btn:delete",
        ],
      },
    },
  ],
};

const frameRouter = {
  path: "/iframe",
  meta: {
    icon: "ri:links-fill",
    title: "menus.hsExternalPage",
    rank: frame,
  },
  children: [
    {
      path: "/iframe/external",
      meta: {
        title: "menus.hsExternalDoc",
      },
      children: [
        {
          path: "/external",
          name: "https://yiming_chang.gitee.io/pure-admin-doc",
          meta: {
            title: "menus.externalLink",
            roles: ["admin", "common"],
          },
        },
        {
          path: "/pureutilsLink",
          name: "https://pure-admin-utils.netlify.app/",
          meta: {
            title: "menus.pureutilsLink",
            roles: ["admin", "common"],
          },
        },
      ],
    },
    {
      path: "/iframe/embedded",
      meta: {
        title: "menus.hsEmbeddedDoc",
      },
      children: [
        {
          path: "/iframe/ep",
          name: "FrameEp",
          meta: {
            title: "menus.hsEpDocument",
            frameSrc: "https://element-plus.org/zh-CN/",
            keepAlive: true,
            roles: ["admin", "common"],
          },
        },
        {
          path: "/iframe/tailwindcss",
          name: "FrameTailwindcss",
          meta: {
            title: "menus.hsTailwindcssDocument",
            frameSrc: "https://tailwindcss.com/docs/installation",
            keepAlive: true,
            roles: ["admin", "common"],
          },
        },
        {
          path: "/iframe/vue3",
          name: "FrameVue",
          meta: {
            title: "menus.hsVueDocument",
            frameSrc: "https://cn.vuejs.org/",
            keepAlive: true,
            roles: ["admin", "common"],
          },
        },
        {
          path: "/iframe/vite",
          name: "FrameVite",
          meta: {
            title: "menus.hsViteDocument",
            frameSrc: "https://cn.vitejs.dev/",
            keepAlive: true,
            roles: ["admin", "common"],
          },
        },
        {
          path: "/iframe/pinia",
          name: "FramePinia",
          meta: {
            title: "menus.hsPiniaDocument",
            frameSrc: "https://pinia.vuejs.org/zh/index.html",
            keepAlive: true,
            roles: ["admin", "common"],
          },
        },
        {
          path: "/iframe/vue-router",
          name: "FrameRouter",
          meta: {
            title: "menus.hsRouterDocument",
            frameSrc: "https://router.vuejs.org/zh/",
            keepAlive: true,
            roles: ["admin", "common"],
          },
        },
      ],
    },
  ],
};

const tabsRouter = {
  path: "/tabs",
  meta: {
    icon: "ri:bookmark-2-line",
    title: "menus.hstabs",
    rank: tabs,
  },
  children: [
    {
      path: "/tabs/index",
      name: "Tabs",
      meta: {
        title: "menus.hstabs",
        roles: ["admin", "common"],
      },
    },
    // query 传参模式
    {
      path: "/tabs/query-detail",
      name: "TabQueryDetail",
      meta: {
        // 不在menu菜单中显示
        showLink: false,
        activePath: "/tabs/index",
        roles: ["admin", "common"],
      },
    },
    // params 传参模式
    {
      path: "/tabs/params-detail/:id",
      component: "params-detail",
      name: "TabParamsDetail",
      meta: {
        // 不在menu菜单中显示
        showLink: false,
        activePath: "/tabs/index",
        roles: ["admin", "common"],
      },
    },
  ],
};

function arrayToTree(arr:any[], root:number) {
  const result = [] // 用于存放结果
  const map : any= {} // 用于存放 list 下的节点

  // 1. 遍历 arr，将 arr 下的所有节点使用 id 作为索引存入到 map
  for (const item of arr) {
    map[item.menuId] = item // 浅拷贝（存储对 item 的引用）
  }

  // 2. 再次遍历，将根节点放入最外层，子节点放入父节点
  for (const item of arr) {
    // 3. 获取节点的 id 和 父 id
    const { menuId, parentId } = item // ES6 解构赋值
    // 4. 如果是根节点，存入 result
    if (item.parentId === root) {
      result.push(map[menuId])
    } else {
      // 5. 反之，存入到父节点
      map[parentId].children ? map[parentId].children.push(map[menuId]) : (map[parentId].children = [map[menuId]])
    }
  }

  // 将结果返回
  return result
}




asyncRoutesRouter.get("/get-async-routes", async (ctx, next) => {

  const menus = await prisma.sysMenu.findMany()
  const routes=menus.filter(item=>item.menuType!=3).map(item=>{
    if(item.menuType==0){
      return {
        menuId:item.menuId,
        path:item.path,
        component:item.component,
        name:item.menuName,
        parentId:item.parentId,
        meta:{
          icon:item.icon,
          title:item.title,
          showLink:item.showLink,
          rank:item.rank,
          roles:["admin"],
          auths:item.auths
        }
      }
    }else if(item.menuType==1){
      return {
        menuId:item.menuId,
        path:item.path,
        name:item.menuName,
        parentId:item.parentId,
        meta:{
          icon:item.icon,
          title:item.title,
          showLink:item.showLink,
          rank:item.rank,
          roles:["admin"],
          auths:item.auths
        }
      }
    }else if(item.menuType==2){
      return {
        menuId:item.menuId,
        path:item.path,
        name:item.menuName,
        parentId:item.parentId,
        meta:{
          icon:item.icon,
          title:item.title,
          showLink:item.showLink,
          rank:item.rank,
          roles:["admin"],
          auths:item.auths
        }
      }
    }
  }
  )
  const asyncRoutes=arrayToTree(routes,0)
  console.log(asyncRoutes)
  ctx.body = {
    success: true,
    // data: [
    //   systemManagementRouter,
    //   systemMonitorRouter,
    //   permissionRouter,
    //   frameRouter,
    //   tabsRouter,
    // ],
    data:asyncRoutes
    
  };
});

export { asyncRoutesRouter };
