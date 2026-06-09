import * as z from "zod";

export const CategorySchema = z.object({
  id: z.string().uuid("Format ID tidak valid").optional(),
  name: z.string().min(1, "Nama kategori wajib diisi").max(100, "Nama kategori maksimal 100 karakter").trim(),
  information: z.string().trim().nullable().optional(),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
