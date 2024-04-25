import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export function exclude<T, Key extends keyof T>(args: T, keys: Key[]):Omit<T,Key> {
  return Object.fromEntries(
    Object.entries(args as any).filter(
      ([key]) => !(keys as string[]).includes(key)
    )
  ) as unknown as Omit<T,Key>;
}

export default prisma;
