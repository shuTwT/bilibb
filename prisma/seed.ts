import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
const prisma = new PrismaClient()
async function main() {
  const datetime = dayjs().format("YYYY-MM-DD HH:mm:ss")
  await prisma.sysDept.upsert({
    where: {
      deptId: 100
    },
    update: {},
    create: {
      parentId: 0,
      ancestors: '0',
      deptName: '若依科技',
      orderNum: 0,
      leader: '若依',
      phone:"15888888888",
      email:"ry@qq.com",
      createBy: "admin",
      createTime: datetime,
    }
  })
  await prisma.sysDept.upsert({
    where: {
      deptId: 101
    },
    update: {},
    create: {
      parentId: 100,
      ancestors: '0,100',
      deptName: '深圳总公司',
      orderNum: 1,
      leader: '若依',
      phone:"15888888888",
      email:"ry@qq.com",
      createBy: "admin",
      createTime: datetime,
    }
  })
  await prisma.sysUser.upsert({
    where:{
      userId:1,
    },
    update:{},
    create:{
      deptId:100,
      userName:'admin',
      nickName:'若依',
      userType:'00',
      email:"ry@163.com",
      phonenumber:"15888888888",
      password:"123456",
      createBy:'admin'
    }
  })
  await prisma.sysUser.upsert({
    where:{
      userId:2,
    },
    update:{},
    create:{
      deptId:100,
      userName:'common',
      nickName:'普通用户',
      userType:'00',
      email:"ry@163.com",
      phonenumber:"15888888888",
      password:"123456",
      createBy:'admin'
    }
  })
  await prisma.sysPost.upsert({
    where:{
      postId:1
    },
    update:{},
    create:{
      postCode:"ceo",
      postName:"董事长",
      postSort:1,
      createBy:'admin'
    }
  })
  await prisma.sysRole.upsert({
    where:{
      roleId:1
    },
    update:{},
    create:{
      roleName:'超级管理员',
      roleKey:'admin',
      roleSort:1,
      dataScope:'1'
    }
  })
  await prisma.sysRole.upsert({
    where:{
      roleId:2
    },
    update:{},
    create:{
      roleName:'普通角色',
      roleKey:'common',
      roleSort:2,
      dataScope:'2'
    }
  })

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })