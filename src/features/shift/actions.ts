"use server";

import prisma from "@/libs/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "@/libs/session";
import { formatZodError } from "@/libs/zod";
import { getActiveShift, getActiveShiftId } from "./queries";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/response";
import { ShiftStatus } from "@/generated/prisma/enums";
import { ServerActionResponse } from "@/types";
import { OpenShiftSchema, CloseShiftSchema, OpenShiftInput, CloseShiftInput } from "./schemas";

export async function openShiftAction(prevState: ServerActionResponse<OpenShiftInput> | null, data: OpenShiftInput): Promise<ServerActionResponse<OpenShiftInput>> {
  const validation = OpenShiftSchema.safeParse(data);
  if (!validation.success) {
    return sendErrorResponse({
      message: "Gagal membuka shift",
      code: "VALIDATION_ERROR",
      fields: formatZodError(validation.error),
    });
  }

  const { initialCapital } = validation.data;

  const user = await getSession();
  if (!user) return redirect("/");

  try {
    const hasActiveShift = await getActiveShiftId();
    if (hasActiveShift) return sendErrorResponse({ message: "Shift anda masih berstatus aktif", code: "SHIFT_ALREADY_OPEN" });

    await prisma.shift.create({ data: { userId: user.id, initialCapital, status: ShiftStatus.OPEN, openingTime: new Date() } });

    revalidatePath("/", "layout");

    return sendSuccessResponse({ message: "Berhasil memulai sesi shift" });
  } catch (error) {
    console.error(error);
    return sendErrorResponse({ message: "Terjadi kesalahan pada server", code: "INTERNAL_SERVER_ERROR" });
  }
}

export async function closeShiftAction(prevState: ServerActionResponse<CloseShiftInput> | null, data: CloseShiftInput): Promise<ServerActionResponse<CloseShiftInput>> {
  const validation = CloseShiftSchema.safeParse(data);
  if (!validation.success) {
    return sendErrorResponse({
      message: "Gagal menutup shift",
      code: "VALIDATION_ERROR",
      fields: formatZodError(validation.error),
    });
  }

  const { actualCash } = validation.data;

  try {
    const activeShift = await getActiveShift();
    if (!activeShift) return sendErrorResponse({ message: "Tidak ada sesi shift aktif yang bisa ditutup", code: "SHIFT_CLOSED" });

    const cashDifference = actualCash - activeShift.expectedCash;

    await prisma.shift.update({ where: { id: activeShift.id }, data: { status: ShiftStatus.CLOSED, actualCash, cashDifference, closingTime: new Date() } });

    revalidatePath("/", "layout");

    return sendSuccessResponse({ message: "Berhasil menutup sesi shift" });
  } catch (error) {
    console.error(error);
    return sendErrorResponse({ message: "Terjadi kesalahan pada server", code: "INTERNAL_SERVER_ERROR" });
  }
}
