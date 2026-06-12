import { z } from "zod";
import { OutcomeCategory } from "@/generated/prisma/enums";

export const OutcomeSchema = z.object({
  category: z.enum(OutcomeCategory, "Kategori pengeluaram wajib diisi"),
  total: z.coerce.number("Total pengeluaran wajib berupa angka").int("Total pengeluaran harus berupa bilangan bulat").min(0, "Total pengeluaran tidak boleh negatif"),
  information: z.string().max(255, "Informasi hanya boleh maksimal 255 karakter").trim().nullable().optional(),
});

export type OutcomeInput = z.infer<typeof OutcomeSchema>;
export type OutcomeFormInput = z.input<typeof OutcomeSchema>;
