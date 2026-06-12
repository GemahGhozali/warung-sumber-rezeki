"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import { getSession } from "@/libs/session";
import { getActiveShiftId } from "@/features/shift/queries";
import { IncomeSchema, IncomeInput } from "./schemas";
import { ServerActionResponse } from "@/types";
import { formatZodError } from "@/libs/zod";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/response";

export async function createIncomeAction(prevState: ServerActionResponse<IncomeInput> | null, data: IncomeInput): Promise<ServerActionResponse<IncomeInput>> {
  const validation = IncomeSchema.safeParse(data);
  if (!validation.success) {
    return sendErrorResponse({
      message: "Gagal mencatat pemasukan",
      code: "VALIDATION_ERROR",
      fields: formatZodError(validation.error),
    });
  }

  const { category, total, information } = validation.data;

  const user = await getSession();
  if (!user) return redirect("/");

  try {
    const activeShiftId = await getActiveShiftId();
    if (!activeShiftId) return sendErrorResponse({ message: "Gagal mencatat pemasukan. Anda harus membuka shift toko terlebih dahulu", code: "NOT_FOUND" });

    await prisma.income.create({ data: { category, total, information, userId: user.id, shiftId: activeShiftId } });

    revalidatePath("/", "layout");

    return sendSuccessResponse({ message: "Berhasil mencatat pemasukan kas" });
  } catch (error) {
    console.error(error);
    return sendErrorResponse({ message: "Terjadi kesalahan pada server saat mencatat pemasukan", code: "INTERNAL_SERVER_ERROR" });
  }
}
