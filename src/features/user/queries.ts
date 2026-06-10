"use server";

import prisma from "@/libs/prisma";

export async function getAllUsers() {
  try {
    return prisma.user.findMany({
      select: { id: true, name: true, role: true, image: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Gagal mendapatkan data pengguna");
  }
}

export async function getUserById(id: string) {
  try {
    return prisma.user.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
    throw new Error("Gagal mendapatkan data pengguna");
  }
}
