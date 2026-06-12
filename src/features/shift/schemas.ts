import { z } from "zod";

export const OpenShiftSchema = z.object({
  initialCapital: z.coerce.number("Modal awal wajib berupa angka").int("Modal harus berupa bilangan bulat").min(0, "Modal awal tidak boleh negatif"),
});

export const CloseShiftSchema = z.object({
  actualCash: z.coerce.number("Jumlah uang wajib berupa angka").int("Uang harus berupa bilangan bulat").min(0, "Uang tidak boleh negatif"),
});

export type OpenShiftInput = z.infer<typeof OpenShiftSchema>;
export type OpenShiftFormInput = z.input<typeof OpenShiftSchema>;

export type CloseShiftInput = z.infer<typeof CloseShiftSchema>;
export type CloseShiftFormInput = z.input<typeof CloseShiftSchema>;
