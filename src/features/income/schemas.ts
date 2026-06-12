import { z } from "zod";
import { IncomeCategory } from "@/generated/prisma/enums";

export const IncomeSchema = z.object({
  category: z.enum(IncomeCategory, "Kategori pemasukan wajib diisi"),
  total: z.coerce.number("Total pemasukan wajib berupa angka").int("Total pemasukan harus berupa bilangan bulat").min(0, "Total pemasukan tidak boleh negatif"),
  information: z.string().max(255, "Informasi hanya boleh maksimal 255 karakter").trim().nullable().optional(),
});

export type IncomeInput = z.infer<typeof IncomeSchema>;
export type IncomeFormInput = z.input<typeof IncomeSchema>;
