"use server";

import prisma from "@/libs/prisma";

export async function getAllMenus() {
  try {
    return prisma.menu.findMany({
      select: { id: true, name: true, price: true, image: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Gagal mendapatkan data menu");
  }
}

export async function getMenuById(id: string) {
  try {
    return prisma.menu.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
    throw new Error("Gagal mendapatkan data menu");
  }
}
