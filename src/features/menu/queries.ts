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

export async function getMenusForCashier() {
  try {
    const menus = await prisma.menu.findMany({
      select: { id: true, name: true, price: true, hpp: true, image: true, category: { select: { name: true } } },
    });

    return menus.map((menu) => ({ ...menu, category: menu.category?.name }));
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data menu");
  }
}
