"use server";

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types";
import { CategorySchema, CategoryInput } from "./schemas";
import { sendSuccessResponse, sendErrorResponse } from "@/utils/response";
import { redirect } from "next/navigation";

export async function createCategoryAction(prevState: ServerActionResponse<CategoryInput> | null, data: CategoryInput): Promise<ServerActionResponse<CategoryInput>> {
  const validation = CategorySchema.safeParse(data);
  if (!validation.success) return sendErrorResponse({ message: "Gagal menambahkan kategori", code: "VALIDATION_ERROR" });

  const { name, information } = validation.data;

  try {
    const existingCategory = await prisma.category.findUnique({ where: { name } });
    if (existingCategory) return sendErrorResponse({ message: `Kategori dengan nama "${name}" sudah terdaftar.`, code: "DUPLICATE_ENTRY" });

    await prisma.category.create({ data: { name, information } });

    revalidatePath("/dashboard/category");
  } catch (error) {
    console.log(error);
    return sendErrorResponse({ message: `Terjadi kesalahan pada server`, code: "INTERNAL_SERVER_ERROR" });
  }

  redirect("/dashboard/category");
}

export async function editCategoryAction(prevState: ServerActionResponse<CategoryInput> | null, data: CategoryInput): Promise<ServerActionResponse<CategoryInput>> {
  const validation = CategorySchema.safeParse(data);
  if (!validation.success) return sendErrorResponse({ message: "Gagal memperbarui kategori", code: "VALIDATION_ERROR" });

  const { id, name, information } = validation.data;

  if (!id) return sendErrorResponse({ message: "ID Kategori wajib disertakan.", code: "VALIDATION_ERROR" });

  try {
    const categoryExists = await prisma.category.findUnique({ where: { id } });
    if (!categoryExists) return sendErrorResponse({ message: "Kategori tidak ditemukan.", code: "NOT_FOUND" });

    const nameConflict = await prisma.category.findFirst({ where: { name, NOT: { id } } });
    if (nameConflict) return sendErrorResponse({ message: `Kategori dengan nama "${name}" sudah terdaftar.`, code: "DUPLICATE_ENTRY" });

    await prisma.category.update({ where: { id }, data: { name, information } });

    revalidatePath("/dashboard/category");
  } catch (error) {
    console.log(error);
    return sendErrorResponse({ message: `Terjadi kesalahan pada server`, code: "INTERNAL_SERVER_ERROR" });
  }

  redirect("/dashboard/category");
}

export async function deleteCategoryAction(prevState: ServerActionResponse<CategoryInput> | null, data: CategoryInput): Promise<ServerActionResponse<CategoryInput>> {
  const id = data.id;

  if (!id) return sendErrorResponse({ message: "ID Kategori wajib disertakan.", code: "VALIDATION_ERROR" });

  try {
    const categoryExists = await prisma.category.findUnique({ where: { id } });
    if (!categoryExists) return sendErrorResponse({ message: "Kategori tidak ditemukan.", code: "NOT_FOUND" });

    await prisma.category.delete({ where: { id } });

    revalidatePath("/dashboard/category");
    return sendSuccessResponse({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.log(error);
    return sendErrorResponse({ message: `Terjadi kesalahan pada server`, code: "INTERNAL_SERVER_ERROR" });
  }
}
