"use server";

import prisma from "@/libs/prisma";
import { Menu } from "@/generated/prisma/client";
import { MenuSchema, MenuInput } from "./schemas";
import { ServerActionResponse } from "@/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getMenuById } from "./queries";
import { formatZodError } from "@/libs/zod";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/response";
import { deleteFile, uploadFile } from "@/utils/file";

export async function createMenuAction(prevState: ServerActionResponse<MenuInput> | null, data: MenuInput): Promise<ServerActionResponse<MenuInput>> {
  const validation = MenuSchema.safeParse(data);
  if (!validation.success) {
    return sendErrorResponse({
      message: "Gagal menambahkan menu baru",
      code: "VALIDATION_ERROR",
      fields: formatZodError(validation.error),
    });
  }

  const { name, price, hpp, categoryId, image: uploadedImage } = validation.data;

  try {
    if (categoryId) {
      const categoryExists = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!categoryExists) {
        return sendErrorResponse({ message: "Kategori tidak ditemukan", code: "NOT_FOUND", fields: { categoryId: "ID Kategori tidak valid" } });
      }
    }

    const finalCategoryId = categoryId || null;
    const image = await uploadFile(uploadedImage);
    await prisma.menu.create({ data: { name, price, hpp, categoryId: finalCategoryId, image } });

    revalidatePath("/dashboard/menu");
  } catch (error) {
    return sendErrorResponse({ message: "Terjadi kesalahan pada server", code: "INTERNAL_SERVER_ERROR" });
  }

  redirect("/dashboard/menu");
}

export async function editMenuAction(prevState: ServerActionResponse<MenuInput> | null, data: MenuInput): Promise<ServerActionResponse<MenuInput>> {
  const validation = MenuSchema.safeParse(data);
  if (!validation.success) {
    return sendErrorResponse({
      message: "Gagal mengubah data menu",
      code: "VALIDATION_ERROR",
      fields: formatZodError(validation.error),
    });
  }

  const { id, name, price, hpp, categoryId, image: newImage } = validation.data;

  if (!id) return sendErrorResponse({ message: "ID menu wajib disertakan.", code: "VALIDATION_ERROR" });

  try {
    const currentMenu = await getMenuById(id);
    if (!currentMenu) return sendErrorResponse({ message: "Menu tidak ditemukan", code: "NOT_FOUND" });

    if (categoryId) {
      const categoryExists = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!categoryExists) {
        return sendErrorResponse({ message: "Kategori tidak ditemukan", code: "NOT_FOUND", fields: { categoryId: "ID Kategori tidak valid" } });
      }
    }

    let image = currentMenu.image;

    if (currentMenu.image && !newImage) {
      image = null;
      await deleteFile(currentMenu.image);
    }

    if (newImage && newImage instanceof File && newImage.size > 0) {
      image = await uploadFile(newImage);
      if (currentMenu.image) await deleteFile(currentMenu.image);
    }

    const finalCategoryId = categoryId || null;

    await prisma.menu.update({ where: { id }, data: { name, price, hpp, categoryId: finalCategoryId, image } });

    revalidatePath("/dashboard/menu");
  } catch (error) {
    return sendErrorResponse({ message: "Terjadi kesalahan pada server", code: "INTERNAL_SERVER_ERROR" });
  }

  redirect("/dashboard/menu");
}

export async function deleteMenuAction(id: string): Promise<ServerActionResponse<Menu>> {
  try {
    const menu = await getMenuById(id);
    if (!menu) return sendErrorResponse({ message: "Menu tidak ditemukan", code: "NOT_FOUND" });

    if (menu.image) await deleteFile(menu.image);

    await prisma.menu.delete({ where: { id } });

    revalidatePath("/dashboard/menu");

    return sendSuccessResponse({ message: "Menu berhasil dihapus" });
  } catch (error) {
    return sendErrorResponse({ message: "Terjadi kesalahan pada server", code: "INTERNAL_SERVER_ERROR" });
  }
}
