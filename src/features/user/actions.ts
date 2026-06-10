"use server";

import prisma from "@/libs/prisma";
import { User } from "@/generated/prisma/client";
import { CreateUserSchema, CreateUserInput, EditUserSchema, EditUserInput } from "./schemas";
import { ServerActionResponse } from "@/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getUserById } from "./queries";
import { hashPassword } from "@/libs/bcrypt";
import { formatZodError } from "@/libs/zod";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/response";
import { deleteFile, uploadFile } from "@/utils/file";

export async function createUserAction(prevState: ServerActionResponse<CreateUserInput> | null, data: CreateUserInput): Promise<ServerActionResponse<CreateUserInput>> {
  const validation = CreateUserSchema.safeParse(data);
  if (!validation.success) {
    return sendErrorResponse({
      message: "Gagal menambahkan pengguna baru",
      code: "VALIDATION_ERROR",
      fields: formatZodError(validation.error),
    });
  }

  const { name, username, password, role, image: uploadedImage } = validation.data;

  try {
    const usernameInUsed = await prisma.user.findUnique({ where: { username } });
    if (usernameInUsed) return sendErrorResponse({ message: "Username sudah digunakan!", code: "USERNAME_ALREADY_EXIST" });

    const image = await uploadFile(uploadedImage);
    const hashedPassword = await hashPassword(password);
    await prisma.user.create({ data: { name, username, password: hashedPassword, role, image } });

    revalidatePath("/user");
  } catch (error) {
    return sendErrorResponse({ message: "Terjadi kesalahan pada server", code: "INTERNAL_SERVER_ERROR" });
  }

  redirect("/user");
}

export async function editUserAction(prevState: ServerActionResponse<EditUserInput> | null, data: EditUserInput): Promise<ServerActionResponse<EditUserInput>> {
  const validation = EditUserSchema.safeParse(data);

  if (!validation.success) {
    return sendErrorResponse({
      message: "Gagal mengubah data pengguna",
      code: "VALIDATION_ERROR",
      fields: formatZodError(validation.error),
    });
  }

  const { id, name, username, password: newPassword, role, image: newImage } = validation.data;

  if (!id) return sendErrorResponse({ message: "ID pengguna wajib disertakan.", code: "VALIDATION_ERROR" });

  try {
    const currentUser = await getUserById(id);
    if (!currentUser) return sendErrorResponse({ message: "Pengguna tidak ditemukan", code: "NOT_FOUND" });

    const usernameInUsed = await prisma.user.findUnique({ where: { username, NOT: { id } } });
    if (usernameInUsed) return sendErrorResponse({ message: `Username sudah terdaftar!`, code: "USERNAME_ALREADY_EXIST" });

    const password = newPassword ? await hashPassword(newPassword) : currentUser.password;

    let image = currentUser.image;

    if (currentUser.image && !newImage) {
      image = null;
      await deleteFile(currentUser.image);
    }

    if (newImage && newImage instanceof File && newImage.size > 0) {
      image = await uploadFile(newImage);
      if (currentUser.image) await deleteFile(currentUser.image);
    }

    await prisma.user.update({ where: { id }, data: { name, username, password, role, image } });

    revalidatePath("/user");
  } catch (error) {
    return sendErrorResponse({ message: "Terjadi kesalahan pada server", code: "INTERNAL_SERVER_ERROR" });
  }

  redirect("/user");
}

export async function deleteUserAction(id: string): Promise<ServerActionResponse<User>> {
  try {
    const user = await getUserById(id);
    if (!user) return sendErrorResponse({ message: "Pengguna tidak ditemukan", code: "NOT_FOUND" });

    if (user.image) await deleteFile(user.image);

    await prisma.user.delete({ where: { id } });

    revalidatePath("/user");

    return sendSuccessResponse({ message: "Pengguna berhasil dihapus" });
  } catch (error) {
    return sendErrorResponse({ message: "Terjadi kesalahan pada server", code: "INTERNAL_SERVER_ERROR" });
  }
}
