import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string("Username wajib diisi"),
  password: z.string("Password wajib diisi"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
