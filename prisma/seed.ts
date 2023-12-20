import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await prisma.user.upsert({
        where:{
            uid:'0'
        },
        update:{},
        create:{
            uid:'uid',
            uname:'游客'
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