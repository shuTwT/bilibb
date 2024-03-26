import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { menus } from "./seedData/menus";
import { roleMenus } from "./seedData/roleMenus";
const prisma = new PrismaClient();
async function main() {
  const datetime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  await prisma.sysDept.upsert({
    where: {
      deptId: 100,
    },
    update: {
      parentId: 0,
      ancestors: "0",
      deptName: "若依科技",
      type: 1,
      leader: "若依",
      phone: "15888888888",
      email: "ry@qq.com",
      createBy: "admin",
      createTime: datetime,
    },
    create: {
      deptId: 100,
      parentId: 0,
      ancestors: "0",
      deptName: "若依科技",
      type: 1,
      leader: "若依",
      phone: "15888888888",
      email: "ry@qq.com",
      createBy: "admin",
      createTime: datetime,
    },
  });
  await prisma.sysDept.upsert({
    where: {
      deptId: 101,
    },
    update: {
      parentId: 100,
      ancestors: "0,100",
      deptName: "深圳总公司",
      type: 2,
      leader: "若依",
      phone: "15888888888",
      email: "ry@qq.com",
      createBy: "admin",
      createTime: datetime,
    },
    create: {
      deptId: 101,
      parentId: 100,
      ancestors: "0,100",
      deptName: "深圳总公司",
      type: 2,
      leader: "若依",
      phone: "15888888888",
      email: "ry@qq.com",
      createBy: "admin",
      createTime: datetime,
    },
  });
  await prisma.sysRole.upsert({
    where: {
      roleId: 1,
    },
    update: {
      roleName: "超级管理员",
      roleKey: "admin",
      roleSort: 1,
      status:1,
      dataScope: "1",
      createTime: datetime,
      createBy: "admin",
    },
    create: {
      roleId: 1,
      roleName: "超级管理员",
      roleKey: "admin",
      roleSort: 1,
      status:1,
      dataScope: "1",
      createTime: datetime,
      createBy: "admin",
    },
  });
  await prisma.sysRole.upsert({
    where: {
      roleId: 2,
    },
    update: {
      roleName: "普通角色",
      roleKey: "common",
      roleSort: 2,
      status:1,
      dataScope: "2",
      createTime: datetime,
      createBy: "admin",
    },
    create: {
      roleId: 2,
      roleName: "普通角色",
      roleKey: "common",
      roleSort: 2,
      status:1,
      dataScope: "2",
      createTime: datetime,
      createBy: "admin",
    },
  });

  await prisma.sysUser.upsert({
    where: {
      userId: 1,
    },
    update: {
      deptId: 100,
      avatar: "https://avatars.githubusercontent.com/u/44761321",
      userName: "admin",
      nickName: "若依",
      userType: "00",
      email: "ry@163.com",
      phonenumber: "15888888888",
      password: "0192023a7bbd73250516f069df18b500",
      createTime: datetime,
      createBy: "admin",
    },
    create: {
      userId: 1,
      deptId: 100,
      avatar: "https://avatars.githubusercontent.com/u/44761321",
      userName: "admin",
      nickName: "若依",
      userType: "00",
      email: "ry@163.com",
      phonenumber: "15888888888",
      password: "0192023a7bbd73250516f069df18b500",
      createTime: datetime,
      createBy: "admin",
    },
  });
  await prisma.sysUser.upsert({
    where: {
      userId: 2,
    },
    update: {
      deptId: 100,
      avatar: "https://avatars.githubusercontent.com/u/44761321",
      userName: "common",
      nickName: "普通用户",
      userType: "00",
      email: "ry@163.com",
      phonenumber: "15888888888",
      password: "0192023a7bbd73250516f069df18b500",
      createTime: datetime,
      createBy: "admin",
    },
    create: {
      userId: 2,
      deptId: 100,
      avatar: "https://avatars.githubusercontent.com/u/44761321",
      userName: "common",
      nickName: "普通用户",
      userType: "00",
      email: "ry@163.com",
      phonenumber: "15888888888",
      password: "0192023a7bbd73250516f069df18b500",
      createTime: datetime,
      createBy: "admin",
    },
  });
  await prisma.sysPost.upsert({
    where: {
      postId: 1,
    },
    update: {
      postCode: "ceo",
      postName: "董事长",
      postSort: 1,
      createTime: datetime,
      createBy: "admin",
    },
    create: {
      postId: 1,
      postCode: "ceo",
      postName: "董事长",
      postSort: 1,
      createTime: datetime,
      createBy: "admin",
    },
  });

  
  for (const key in menus) {
    const item = menus[key];
    await prisma.sysMenu.upsert({
      where: {
        menuId: item.id,
      },
      update: {
        parentId: item.parentId,
        menuType: item.menuType,
        title: item.title,
        menuName: item.name,
        component: item.component,
        rank: item.rank,
        path: item.path,
        redirect: item.redirect,
        icon: item.icon,
        extraIcon: item.extraIcon,
        enterTransition: item.enterTransition,
        leaveTransition: item.leaveTransition,
        activePath: item.activePath,
        auths: item.auths,
        frameSrc: item.frameSrc,
        frameLoading: item.frameLoading,
        keepAlive: item.keepAlive,
        hiddenTag: item.hiddenTag,
        showLink: item.showLink,
        showParent: item.showParent,
      },
      create: {
        menuId: item.id,
        parentId: item.parentId,
        menuType: item.menuType,
        title: item.title,
        menuName: item.name,
        component: item.component,
        rank: item.rank,
        path: item.path,
        redirect: item.redirect,
        icon: item.icon,
        extraIcon: item.extraIcon,
        enterTransition: item.enterTransition,
        leaveTransition: item.leaveTransition,
        activePath: item.activePath,
        auths: item.auths,
        frameSrc: item.frameSrc,
        frameLoading: item.frameLoading,
        keepAlive: item.keepAlive,
        hiddenTag: item.hiddenTag,
        showLink: item.showLink,
        showParent: item.showParent,
      },
    });
  }
  for (const key in roleMenus) {
    roleMenus[key].menuIds.forEach(async(item)=>{
      await prisma.sysRoleMenu.upsert({
        where:{
          roleId_menuId:{
            roleId:roleMenus[key].roleId,
            menuId:item
          }
        },
        update:{
        },
        create:{
          roleId:roleMenus[key].roleId,
          menuId:item
        }
      })
    })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
