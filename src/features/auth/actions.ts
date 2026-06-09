"use server";

import { redirect } from "next/navigation";
import { LoginSchema, LoginInput } from "./schemas";
import { ServerActionResponse } from "@/types";
import { getUserByUsername } from "./queries";
import { setSessionCookie, deleteSessionCookie } from "@/libs/session";
import { comparePassword } from "@/libs/bcrypt";
import { sendErrorResponse } from "@/utils/response";
import { formatZodError } from "@/libs/zod";

export async function loginAction(prevState: ServerActionResponse<LoginInput> | null, data: LoginInput): Promise<ServerActionResponse<LoginInput>> {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    return sendErrorResponse({
      message: "Gagal melakukan login",
      code: "VALIDATION_ERROR",
      fields: formatZodError(validation.error),
    });
  }

  const { username, password } = validation.data;

  try {
    const user = await getUserByUsername(username);
    if (!user) return sendErrorResponse({ message: "Username atau password salah", code: "INVALID_CREDENTIALS" });

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) return sendErrorResponse({ message: "Username atau password salah", code: "INVALID_CREDENTIALS" });

    await setSessionCookie({ id: user.id, username: user.username, role: user.role });
  } catch (error) {
    return sendErrorResponse({ message: "Terjadi kesalahan pada server", code: "INTERNAL_SERVER_ERROR" });
  }

  redirect("/home");
}

export async function logoutAction() {
  await deleteSessionCookie();
  redirect("/");
}
