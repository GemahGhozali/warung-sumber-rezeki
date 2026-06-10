import * as z from "zod";
import { Role } from "@/generated/prisma/enums";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const UserSchema = z.object({
  id: z.string().uuid("Format ID tidak valid").optional(),
  name: z.string().min(3, "Nama minimal harus 3 karakter"),
  username: z.string().min(3, "Username minimal harus 3 karakter").toLowerCase(),
  role: z.enum(Role, "Role wajib dipilih antara ADMIN atau KASIR"),
  image: z.union([z.file().max(MAX_FILE_SIZE, "Ukuran maksimal foto adalah 2 MB").mime(ACCEPTED_IMAGE_TYPES, "Format foto harus JPEG, JPG, PNG, atau WEBP"), z.string(), z.null()]),
});

export const CreateUserSchema = UserSchema.extend({
  password: z.string().min(8, "Password minimal harus 8 karakter"),
});

export const EditUserSchema = UserSchema.extend({
  password: z.string().refine((value) => value === "" || value.length >= 8, "Password baru minimal harus 8 karakter"),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type EditUserInput = z.infer<typeof EditUserSchema>;
