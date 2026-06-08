import prisma from "@/libs/prisma";

export async function getUserByUsername(identifier: string) {
  return await prisma.user.findFirst({ where: { username: identifier } });
}
