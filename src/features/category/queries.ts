import prisma from "@/libs/prisma";

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        information: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { menus: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return categories.map(({ _count, ...categoryData }) => ({ ...categoryData, totalMenu: _count.menus }));
  } catch (error) {
    console.log(error);
    throw new Error("Gagal mendapatkan data kategori");
  }
}

export async function getCategoryById(id: string) {
  try {
    return prisma.category.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
    throw new Error("Gagal mendapatkan data kategori");
  }
}

export async function getCategoriesForCashier() {
  try {
    return await prisma.category.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data kategori");
  }
}
