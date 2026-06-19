import * as z from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const MenuSchema = z
  .object({
    id: z.string().uuid("Format ID tidak valid").optional(),
    name: z.string().min(3, "Nama menu minimal harus 3 karakter").max(100, "Nama menu maksimal 100 karakter"),
    price: z.coerce.number("Harga jual wajib berupa angka").int("Harga jual harus berupa bilangan bulat").min(0, "Harga jual tidak boleh negatif"),
    hpp: z.coerce.number("HPP wajib berupa angka").int("HPP harus berupa bilangan bulat").min(0, "HPP tidak boleh negatif"),
    image: z.union([z.file().max(MAX_FILE_SIZE, "Ukuran maksimal foto adalah 2 MB").mime(ACCEPTED_IMAGE_TYPES, "Format foto harus JPEG, JPG, PNG, atau WEBP"), z.string(), z.null()]),
    categoryId: z.string().nullable().optional(),
  })
  .refine((data) => data.price >= data.hpp, { message: "Harga jual tidak boleh lebih kecil dari HPP", path: ["price"] });

export type MenuInput = z.infer<typeof MenuSchema>;
export type MenuFormInput = z.input<typeof MenuSchema>;
