import prisma from "@/libs/prisma";

export async function getUserByUsername(username: string) {
  try {
    return await prisma.user.findFirst({ where: { username } });
  } catch (error) {
    throw new Error("Gagal mendapatkan data pengguna");
  }
}
