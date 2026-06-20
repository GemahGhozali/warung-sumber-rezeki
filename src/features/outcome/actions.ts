"use server";

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { formatZodError } from "@/libs/zod";
import { ServerActionResponse } from "@/types";
import { getCurrentUserAndShiftId } from "@/features/shift/queries";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/response";
import { OutcomeSchema, OutcomeInput } from "./schemas";

export async function createOutcomeAction(prevState: ServerActionResponse<OutcomeInput> | null, data: OutcomeInput): Promise<ServerActionResponse<OutcomeInput>> {
  const validation = OutcomeSchema.safeParse(data);
  if (!validation.success) {
    return sendErrorResponse({
      message: "Gagal mencatat pengeluaran",
      code: "VALIDATION_ERROR",
      fields: formatZodError(validation.error),
    });
  }

  const { category, total, information } = validation.data;

  try {
    const { user, shiftId } = await getCurrentUserAndShiftId();
    if (!shiftId) return sendErrorResponse({ message: "Gagal mencatat pengeluaran. Anda harus membuka shift toko terlebih dahulu", code: "NOT_FOUND" });

    await prisma.outcome.create({ data: { category, total, information, userId: user.id, shiftId } });

    revalidatePath("/", "layout");

    return sendSuccessResponse({ message: "Berhasil mencatat pengeluaran kas" });
  } catch (error) {
    console.error(error);
    return sendErrorResponse({ message: "Terjadi kesalahan pada server saat mencatat pengeluaran", code: "INTERNAL_SERVER_ERROR" });
  }
}
