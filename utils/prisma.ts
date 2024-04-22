import { PrismaClient } from "@prisma/client";
import {resolvers} from "@generated/type-graphql"
import { buildSchema } from "type-graphql";

const prismaClientSingleton = ()=>{
    return new PrismaClient()
}

type PrismaClientSingleton=ReturnType<typeof prismaClientSingleton>

const globalForPrisma=globalThis as unknown as {
    prisma:PrismaClientSingleton|undefined
}

const prisma=globalForPrisma.prisma ??prismaClientSingleton()

if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma=prisma;

export const schema = await buildSchema({
    resolvers,
    validate:false
})

export default prisma